/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitor.tasks.controller;

import com.monitor.core.entity.Category;
import com.monitor.tasks.service.CategoryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "Category", description = "Categorias das tarefas")
@RestController
@RequestMapping("/category")
public class CategoryController {

    private static final Logger LOG = LoggerFactory.getLogger(CategoryController.class);

    @Autowired
    private CategoryService service;

    @ApiOperation(value = "index", notes = "Get all category", responseContainer = "List")
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Category> index() {

        return service.findAll();
    }

    @ApiOperation(value = "show", notes = "show a category")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Category> show(@PathVariable(name = "id") String id) {

        final Category categoryFound = service.findOne(id);

        if (categoryFound != null) {
            return new ResponseEntity<>(categoryFound, HttpStatus.FOUND);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @ApiOperation(value = "update", notes = "update category")
    @RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH}, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Category> update(@RequestBody(required = true) Category categoryRequest) {

        Category categorySaved = service.insert(categoryRequest);

        if (categorySaved != null) {
            return new ResponseEntity<>(categorySaved, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(categorySaved, HttpStatus.BAD_REQUEST);
        }

    }

    @ApiOperation(value = "create", notes = "create category")
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Category> create(@RequestBody(required = true) Category categoryRequest) {

        Category categorySaved = service.insert(categoryRequest);

        if (categorySaved != null) {
            return new ResponseEntity<>(categorySaved, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(categorySaved, HttpStatus.BAD_REQUEST);
        }

    }

    @ApiOperation(value = "delete", notes = "delete category")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable(name = "id") String id) {

        service.delete(id);
    }

}
