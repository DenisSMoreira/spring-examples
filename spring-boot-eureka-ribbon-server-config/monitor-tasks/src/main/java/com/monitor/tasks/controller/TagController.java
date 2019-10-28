/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitor.tasks.controller;

import com.monitor.core.entity.Tag;
import com.monitor.tasks.service.TagService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "Tag", description = "Tags das tarefas")
@RestController
@RequestMapping("/tag")
public class TagController {

    @Autowired
    private TagService service;

    @ApiOperation(value = "findAll", notes = "Retorna todas as tasks cadastradas", responseContainer = "List")
    @RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    public @ResponseBody
    List<Tag> findAll() {

        return service.findAll();
    }

    @ApiOperation(value = "find", notes = "Retorna a Tag")
    @RequestMapping(value = "/find", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    public @ResponseBody
    Tag find(@RequestParam(required = true) String id) {

        return service.findOne(id);
    }

    @ApiOperation(value = "update", notes = "update Tag")
    @RequestMapping(value = "/update", method = RequestMethod.PUT, produces = "application/json; charset=utf-8")
    public @ResponseBody
    Tag update(@RequestBody Tag task) {

        return service.insert(task);
    }

    @ApiOperation(value = "create", notes = "create Tag")
    @RequestMapping(value = "/create", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    public @ResponseBody
    Tag create(@RequestBody Tag task) {

        return service.insert(task);
    }

    @ApiOperation(value = "delete", notes = "Deleta a Tag")
    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void delete(@RequestParam(required = true) String id) {

        service.delete(id);
    }

}
