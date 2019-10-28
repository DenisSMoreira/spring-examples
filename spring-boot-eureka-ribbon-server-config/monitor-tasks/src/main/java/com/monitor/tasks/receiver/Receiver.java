package com.monitor.tasks.receiver;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class Receiver {

    private static final Logger LOG = LoggerFactory.getLogger(Receiver.class);

    @RabbitListener(queues = "${monitor.tasks.config.rabbitmq.queue}")
    public void receiveMessage(Message message) {
        LOG.info(String.format("Received message <%s>", new String(message.getBody())));
    }
}
