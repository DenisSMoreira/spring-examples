package com.poc.spring.restfeign.endpoint;

import com.poc.spring.restfeign.client.MessageClientFeign;
import com.poc.spring.restfeign.dto.Message;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MessageProxyRestController {

    private MessageClientFeign client = MessageClientFeign.connect();

    @RequestMapping("/")
    public @ResponseBody List<Message> index() {
       return client.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Message show(@PathVariable(name = "id", required = true) String id) {
       return client.show(id);
    }

    @RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH}, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Message update(Message messageRequest) {
        return client.update(messageRequest);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Message create(Message messageRequest) {
        return client.create(messageRequest);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable(name = "id", required = true) String id) {
        client.delete(id);
    }

}