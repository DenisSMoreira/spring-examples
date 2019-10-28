
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitor.performance.controller;

import com.monitor.core.entity.Performance;
import com.monitor.performance.service.PerformanceService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * User Performance Orchestration Control
 *
 * @version 1.0
 * @author denis
 */
@Api(value = "Performance", description = "Performace do usuário")
@RestController
@RequestMapping("/perfomace")
public class PerformanceController {

    @Autowired
    private PerformanceService service;

    /**
     * Returns all registered Performances by method GET GET /perfomace
     *
     * @return Performance
     */
    @ApiOperation(value = "index", notes = "Returns all registered Performances")
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    List<Performance> index() {

        return service.findAll();
    }

    /**
     * Returns a unique performance per id by method get GET /perfomace/{id}
     *
     * @param id
     * @return Performance
     */
    @ApiOperation(value = "show", notes = "Returns a unique performance per id")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Performance> show(@PathVariable(name = "id", required = true) String id) {
        final Performance performance = service.findOne(id);

        if (performance != null) {
            return new ResponseEntity<>(performance, HttpStatus.FOUND);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    /**
     * Delete or reset user performance by method DELETE DELETE /perfomace/1
     *
     * @param id
     */
    @ApiOperation(value = "delete", notes = "Delete or reset user performance")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable(name = "id", required = true) String id) {

        service.delete(id);
    }

    /**
     * Create performance for user gamification by method POST POST /perfomace
     *
     * @param performance
     * @return Performance.class object created
     */
    @ApiOperation(value = "create", notes = "Create performance for user gamification")
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Performance> create(@RequestBody(required = true) Performance performance) {
        try {
            Performance userSaved = service.save(performance);

            if (userSaved != null) {
                return new ResponseEntity<>(performance, HttpStatus.CREATED);

            } else {
                return new ResponseEntity<>(performance, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            Logger.getLogger(PerformanceController.class.getName()).log(Level.SEVERE, e.getMessage());
            return new ResponseEntity<>(performance, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update performance of user gamification by method PUT or PATCH PUT
     * /perfomace PATCH /perfomace
     *
     * @see Performance.class
     * @param performance
     * @return Performance.class object created
     */
    @ApiOperation(value = "update", notes = "update performance for user gamification")
    @RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH}, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Performance> update(@RequestBody(required = true) Performance performance) {
        Performance userSaved = service.update(performance);

        if (userSaved != null) {
            return new ResponseEntity<>(performance, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(performance, HttpStatus.BAD_REQUEST);
        }
    }

}
