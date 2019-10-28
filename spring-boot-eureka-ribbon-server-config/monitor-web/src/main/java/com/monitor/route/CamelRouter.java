package com.monitor.route;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

/**
 *
 * @author denis
 */
@Component
public class CamelRouter extends RouteBuilder {

    @Override
    public void configure() throws Exception {

//        from("rabbitmq://localhost:15672?queue=monitor.async.process.queue")
//                .recipientList(header("operation"));
    }

}
