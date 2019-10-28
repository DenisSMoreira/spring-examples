package com.monitor.config;

import com.monitor.consumer.CustomMessage;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    private static final Logger LOG = LoggerFactory.getLogger(ScheduledTasks.class);
    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("HH:mm:ss");

    @Scheduled(fixedRate = 3000)
    @HystrixCommand()
//    @HystrixCommand(, commandProperties = {
//        @HystrixProperty(name = "execution.isolation.strategy", value = "SEMAPHORE")
//        ,@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "10")
//        ,@HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "1000")})
    public void reportCurrentTimeInfo() {
        try {
            Thread.sleep(new Random().nextInt(1000));
            LOG.info("{info: 'The time is now={}' }", DATE_FORMAT.format(new Date()));

        } catch (InterruptedException ex) {
            LOG.error(ex.getMessage());
        }
    }

    @Scheduled(fixedRate = 3200)
    @HystrixCommand()
    public void reportCurrentTimeWarn() {
        try {
            Thread.sleep(new Random().nextInt(1000));
            LOG.warn("{warn: 'The time is now={}' }", DATE_FORMAT.format(new Date()));

        } catch (InterruptedException ex) {
            LOG.error(ex.getMessage());
        }
    }

    @Scheduled(fixedRate = 3500)
    @HystrixCommand()
    public void reportCurrentTimeWarnDebug() {
        try {
            Thread.sleep(new Random().nextInt(1000));
            LOG.info("{debug: 'The time is now={}' }", DATE_FORMAT.format(new Date()));
            LOG.debug("{debug: 'The time is now={}' }", DATE_FORMAT.format(new Date()));

        } catch (InterruptedException ex) {
            LOG.error(ex.getMessage());
        }
    }

    @Scheduled(fixedRate = 4000)
    @HystrixCommand()
    public void sendMessageTest() {

        final AtomicInteger counter = new AtomicInteger();
        for (int i = 0; i < 5; i++) {
            final CustomMessage customMessage = new CustomMessage(String.valueOf(counter.incrementAndGet()), "denis.soares.moreira@gmail.com");
            LOG.info("{info: 'Sending new custom message..={}' }", customMessage);
            rabbitTemplate.setExchange("monitor.mail.exchange");
            rabbitTemplate.setRoutingKey("monitor.mail.key.default");
            rabbitTemplate.convertAndSend(customMessage);
        }

    }
}
