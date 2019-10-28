/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitor.users.service;

import com.monitor.core.entity.Team;
import com.monitor.core.entity.User;
import com.monitor.users.repository.TeamRepository;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author denis
 */
@Service
public class TeamService {
    
    @Autowired
    private UserService userService;
      
    @Autowired
    private TeamRepository repository;

    public List<Team> findAll() {
        return repository.findAll();
    }

    public Team findOne(String id) {
        return repository.findOne(id);
    }

    public void delete(String id) {
        repository.delete(id);
    }

    public Team insert(Team team, String userId) {
        team.setCreated(new Date());
        team.setUserOwner(userService.findOne(userId));
        return repository.insert(team);
    }
    
    public Team save(Team team) {
        return repository.save(team);
    }

    public List<Team> findAllTeamOfUser(String userId) {
        
        return repository.findTeamByListUsers(userService.findOne(userId));
    }

    public void vizualized(String teamId) {
        final Team team = repository.findOne(teamId);
        
        team.setVisualized(true);
        
        repository.save(team);
    }

    public void deleteUserOfTeam(String userId, String teamId) {
       
        final User userToDelete = userService.findOne(userId);
        
        final Team team = repository.findOne(teamId);

        team.setListUsers(filterListUser(team.getListUsers(), userToDelete));
         
        repository.save(team);
    }

    private List<User> filterListUser(final List<User> listUsers, final User userToDelete) {
        return listUsers.stream().filter((User user) -> {
      
            //not equal
            return !user.getId().equals(userToDelete.getId());
            
        }).collect(Collectors.toList());
    }
 
}
