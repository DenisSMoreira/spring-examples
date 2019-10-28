/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitor.tasks.controller;

import com.monitor.core.entity.Task;
import com.monitor.tasks.service.TaskService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "Task", description = "Gestão das Tarefas")
@RestController
@RequestMapping(
        path = "/task")
public class TaskController {

    @Autowired
    private TaskService service;

    @ApiOperation(value = "index", notes = "Get all category")
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Task> index(@RequestParam(required = false) String userId) {

        return service.findAll();
    }

    @ApiOperation(value = "filter", notes = "Get all task by filter")
    @RequestMapping(path = "/filter", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public @ResponseBody
    List<Task> filter(@RequestParam(required = false) String userId) {

        final List<Task> tasks = service.filter(userId);

        return tasks;
    }

    @ApiOperation(value = "show", notes = "show a task")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Task> show(@PathVariable(name = "id") String id) {

        final Task taskFound = service.findOne(id);

        if (taskFound != null) {
            return new ResponseEntity<>(taskFound, HttpStatus.FOUND);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "update", notes = "update task")
    @RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH}, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Task> update(@RequestBody(required = true) Task task) {

        final Task taskUpdated = service.insert(task);

        if (taskUpdated != null) {
            return new ResponseEntity<>(taskUpdated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(taskUpdated, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "create", notes = "create Task")
    @RequestMapping(value = "/create", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public @ResponseBody
    Task create(@RequestBody Task task) {

        return service.insert(task);
    }

    @ApiOperation(value = "status", notes = "Change Status Task")
    @RequestMapping(value = "/{id}/change-status", method = RequestMethod.PUT)
    public void changeStatus(
            @PathVariable(name = "id") String id,
            @RequestParam String change,
            @RequestParam String status,
            @RequestParam Date active,
            @RequestParam Date done,
            @RequestParam Date timeStatus) {

        service.changeStatus(id, change, status, active, done, timeStatus);
    }

    @ApiOperation(value = "delete", notes = "Delete Task")
    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void delete(@RequestParam(required = true) String id) {

        service.delete(id);
    }

}
