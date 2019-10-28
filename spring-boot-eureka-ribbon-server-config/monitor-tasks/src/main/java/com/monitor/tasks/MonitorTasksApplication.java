package com.monitor.tasks;

import de.codecentric.boot.admin.config.EnableAdminServer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableAdminServer
@SpringBootApplication
public class MonitorTasksApplication {

    public static void main(String[] args) {
        SpringApplication.run(MonitorTasksApplication.class, args);
    }
   
}
