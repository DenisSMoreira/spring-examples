package com.lab.arq.dsm.api;

import com.lab.arq.dsm.core.entity.Message;
import com.lab.arq.dsm.service.MessageService;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "Message", description = "Gestão das mensagens entre os usuários")
@RestController
@RequestMapping("/message")
public class MessageController {

    @Autowired
    private MessageService service;

    @ApiOperation(value = "index", notes = "Get all messages")
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @HystrixCommand()
    public @ResponseBody
    List<Message> index() {
        return service.findAll();
    }

    @ApiOperation(value = "show", notes = "show a message")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @HystrixCommand()
    public ResponseEntity<Message> show(@PathVariable(name = "id", required = true) String id) {

        final Message messageFound = service.findOne(id);

        if (messageFound != null) {
            return new ResponseEntity<>(messageFound, HttpStatus.FOUND);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @HystrixCommand()
    @ApiOperation(value = "update", notes = "update message")
    @RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH}, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Message> update(Message messageRequest) {

        Message messageSaved = service.insert(messageRequest);

        if (messageSaved != null) {
            return new ResponseEntity<>(messageSaved, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(messageSaved, HttpStatus.BAD_REQUEST);
        }

    }


    @HystrixCommand()
    @ApiOperation(value = "create", notes = "create message")
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Message> create(Message messageRequest) {

        Message messageSaved = service.insert(messageRequest);

        if (messageSaved != null) {
            return new ResponseEntity<>(messageSaved, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(messageSaved, HttpStatus.BAD_REQUEST);
        }

    }

    @HystrixCommand()
    @ApiOperation(value = "delete", notes = "Delete message")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable(name = "id", required = true) String id) {

        service.delete(id);
    }

}