package com.monitor.mail;

import de.codecentric.boot.admin.config.EnableAdminServer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableAdminServer
@SpringBootApplication
@EnableDiscoveryClient
@EnableEurekaClient
public class MonitorMailApplication {

    public static void main(String[] args) {
        SpringApplication.run(MonitorMailApplication.class, args);
    }
   
}
