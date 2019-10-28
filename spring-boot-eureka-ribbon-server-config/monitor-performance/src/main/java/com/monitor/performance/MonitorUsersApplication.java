package com.monitor.performance;

import de.codecentric.boot.admin.config.EnableAdminServer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableAdminServer
@SpringBootApplication
public class MonitorUsersApplication {

    public static void main(String[] args) {
        SpringApplication.run(MonitorUsersApplication.class, args);
    }
   
}
