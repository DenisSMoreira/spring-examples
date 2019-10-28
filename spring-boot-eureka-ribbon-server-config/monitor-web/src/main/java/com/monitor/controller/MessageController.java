/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitor.controller;

import com.monitor.core.entity.Message;
import com.monitor.service.MessageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "Message", description = "Gestão das mensagens entre os usuários")
@RestController
@RequestMapping("/message")
public class MessageController {

    @Autowired
    private MessageService service;

    @ApiOperation(value = "index", notes = "Get all messages")
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    List<Message> index() {
        return service.findAll();
    }

    @ApiOperation(value = "show", notes = "show a message")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Message> show(@PathVariable(name = "id", required = true) String id) {

        final Message messageFound = service.findOne(id);

        if (messageFound != null) {
            return new ResponseEntity<>(messageFound, HttpStatus.FOUND);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
    
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

    @ApiOperation(value = "delete", notes = "Delete message")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable(name = "id", required = true) String id) {

        service.delete(id);
    }

}
