package com.monitor.tasks.controller;

import com.monitor.core.entity.SubTask;
import com.monitor.tasks.service.SubTaskService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "subTasks", description = "Sub tarefas")
@RestController
@RequestMapping("/subTasks")
public class SubTaskController {

    @Autowired
    private SubTaskService service;

    @ApiOperation(value = "findAll", notes = "Retorna todas as tasks cadastradas")
    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    public @ResponseBody
    List<SubTask> findAll() {

        return service.findAll();
    }

    @ApiOperation(value = "find", notes = "Retorna a SubTask")
    @RequestMapping(value = "/find", method = RequestMethod.GET)
    public @ResponseBody
    SubTask find(@RequestParam(required = true) String id) {

        return service.findOne(id);
    }

    @ApiOperation(value = "update", notes = "Update SubTask")
    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public @ResponseBody
    SubTask update(@RequestBody SubTask task) {

        return service.insert(task);
    }

    @ApiOperation(value = "create", notes = "Create SubTask")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody
    SubTask create(@RequestBody SubTask task) {

        return service.insert(task);
    }

    @ApiOperation(value = "changeStatus", notes = "Change Status")
    @RequestMapping(value = "/changeStatus", method = RequestMethod.GET)
    public void changeStatus(@RequestParam(required = true) String id) {

    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public void delete(@RequestParam(required = true) String id) {

        service.delete(id);
    }

}
