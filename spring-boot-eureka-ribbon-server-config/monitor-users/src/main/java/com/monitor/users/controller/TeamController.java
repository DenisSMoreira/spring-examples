/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitor.users.controller;

import com.monitor.core.entity.Team;
import com.monitor.users.service.TeamService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.autoconfigure.ShellProperties.SimpleAuthenticationProperties.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "Team", description = "Gestão dos times")
@RestController
@RequestMapping("/team")
public class TeamController {

    @Autowired
    private TeamService service;
    
    @ApiOperation(value = "findAll", notes = "Retorna todas as teams cadastradas", response = User.class, responseContainer = "List")
    @RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    public @ResponseBody
    List<Team> findAll() {

        return service.findAll();
    }

    @ApiOperation(value = "find", notes = "Retorna a Team", response = User.class)
    @RequestMapping(value = "/find", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    public @ResponseBody
    Team find(@RequestParam(required = true) String id) {

        return service.findOne(id);
    }

    @ApiOperation(value = "update", notes = "update Team", response = User.class)
    @RequestMapping(value = "/update", method = RequestMethod.PUT, produces = "application/json; charset=utf-8")
    public @ResponseBody
    Team update(@RequestBody Team team) {

        return service.save(team);
    }

    @ApiOperation(value = "create", notes = "create Team", response = User.class)
    @RequestMapping(value = "/create", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    public @ResponseBody
    Team create(@RequestBody Team team, @RequestParam(required = true) String userId) {

        return service.insert(team, userId);
    }

    @ApiOperation(value = "delete", notes = "Delete Team")
    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public void delete(@RequestParam(required = true) String id) {

        service.delete(id);
    }
    
    @ApiOperation(value = "findAllTeamOfUser", notes = "Find All Team Of User")
    @RequestMapping(value = "/findAllTeamOfUser", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    public @ResponseBody
    List<Team> findAllTeamOfUser(@RequestParam(required = true) String userId, @RequestParam(required = false) String gerenteVendedor) {

        return service.findAllTeamOfUser(userId);
    }
    
    @ApiOperation(value = "vizualized", notes = "vizualized")
    @RequestMapping(value = "/vizualized", method = RequestMethod.PUT)
    public ResponseEntity<?> vizualized(@RequestParam(required = true) String teamId) {
           
        service.vizualized(teamId);
        
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @ApiOperation(value="deleteUserOfTeam", notes = "Delete User Of Team")
    @RequestMapping(value="deleteUserOfTeam", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteUserOfTeam(@RequestParam String userId, @RequestParam String teamId){
        
        service.deleteUserOfTeam(userId, teamId);
    }
    
}
