package com.lab.arq.dsm;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/")
public class RestServer {

    @RequestMapping(value = "/recommended")
    @HystrixCommand(fallbackMethod = "reliable")
    public String readingList(){
        return "Spring in Action (Manning), Cloud Native Java (O'Reilly), Learning Spring Boot (Packt)";
    }


    public String reliable() {
        return "Cloud Native Java (O'Reilly)";
    }

}
