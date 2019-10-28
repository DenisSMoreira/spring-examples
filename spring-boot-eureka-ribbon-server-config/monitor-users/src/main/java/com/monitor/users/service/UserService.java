/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitor.users.service;

import com.monitor.core.entity.Team;
import com.monitor.core.entity.User;
import com.monitor.users.repository.UserRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 *
 * @author denis
 */
@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public List<User> findAll() {
        return repository.findAll();
    }

    @Cacheable(value = "user", key = "#userId")
    public List<User> getAllUsersOfTeams(String userId) {
        final User userFound = repository.findOne(userId);
        final List<Team> listTeamsBindThisUser = userFound.getListTeams();
        if (listTeamsBindThisUser == null) {
            return Arrays.asList(userFound);
        } else {
            return searchAllUsersOfListTeams(listTeamsBindThisUser);
        }
    }

    private List<User> searchAllUsersOfListTeams(final List<Team> listTeamsBindThisUser) {
        final List<User> listUsersOfAllTeams = new ArrayList<>();

        listTeamsBindThisUser.stream().forEach(team -> {
            final List<User> users = repository.findUserByListTeams(team);
            listUsersOfAllTeams.addAll(users);
        });

        return listUsersOfAllTeams;
    }

    public User findOne(String id) {
        return repository.findOne(id);
    }

    public User authentication(User user) {
        final User findUser = repository.findUserByEmail(user.getEmail());

        if (findUser.getPassword().equals(user.getPassword())) {
            return findUser;
        } else {
            return null;
        }
    }

    @CacheEvict(value = "user", key = "#userId")
    public void delete(String userId) {
        repository.delete(userId);
    }

    @CachePut(value = "user", key = "#userId")
    public User update(User user) {
        user.setUpdated(new Date());
        return repository.insert(user);
    }

    public User save(User user) {
        user.setCreated(new Date());
        user.setUnconfirmedEmail(user.getEmail());
        return repository.save(user);
    }

}
