package com.monitor.performance.config;

import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    @Value("${monitor.performance.config.rabbitmq.routingkey}")
    private String routingkey;

    @Value("${monitor.performance.config.rabbitmq.dlq}")
    private String dlq;

    @Value("${monitor.performance.config.rabbitmq.exchange}")
    private String exchange;

    @Value("${monitor.performance.config.rabbitmq.queue}")
    private String queue;

    @Bean
    DirectExchange exchange() {
        return new DirectExchange(exchange);
    }

    @Bean
    Queue incomingQueue() {
        return QueueBuilder.durable(queue)
                .withArgument("x-dead-letter-exchange", "")
                .withArgument("x-dead-letter-routing-key", dlq)
                .build();
    }

    @Bean
    Binding binding() {
        return BindingBuilder.bind(incomingQueue()).to(exchange()).with(routingkey);
    }

    @Bean
    Queue deadLetterQueue() {
        return QueueBuilder.durable(dlq).build();
    }

}
