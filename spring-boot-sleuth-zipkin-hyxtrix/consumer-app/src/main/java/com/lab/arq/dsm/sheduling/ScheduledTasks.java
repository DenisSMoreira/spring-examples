package com.lab.arq.dsm.sheduling;

import com.lab.arq.dsm.client.MessageClientFeign;
import com.lab.arq.dsm.dto.Message;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Component
public class ScheduledTasks {
    private static final Logger LOG = LoggerFactory.getLogger(ScheduledTasks.class);

    private MessageClientFeign client = MessageClientFeign.connect();

    @Scheduled(fixedRate = 3000)
    @HystrixCommand()
    public void reportCurrentTimeInfo() {
        try {
            Thread.sleep(new Random().nextInt(1000));
            List<Message> messageList = client.findAll();
            LOG.info("{info: 'The time is now={}' }", new SimpleDateFormat("HH:mm:ss").format(new Date()), messageList);

        } catch (InterruptedException ex) {
            LOG.error(ex.getMessage());
        }
    }

    @Scheduled(fixedRate = 4000)
    @HystrixCommand()
    public void sendMessageTest() {
        LOG.info("{info: 'Sending new custom message..={}' }");
    }

}
