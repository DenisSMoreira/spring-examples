package com.poc.spring.restfeign;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class RestFeignApplication {

    public static void main(String[] args) {
        SpringApplication.run(RestFeignApplication.class, args);
    }
}
