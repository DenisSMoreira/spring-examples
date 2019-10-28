package com.monitor.users;

import de.codecentric.boot.admin.config.EnableAdminServer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;

@EnableAdminServer
@EnableCircuitBreaker
@SpringBootApplication
public class MonitorUsersApplication {

    public static void main(String[] args) {
        SpringApplication.run(MonitorUsersApplication.class, args);
    }
   
}
