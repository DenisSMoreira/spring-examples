/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitor.tasks.service;

import com.monitor.core.entity.SubTask;
import com.monitor.tasks.repository.SubTaskRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author denis
 */
@Service
public class SubTaskService {

    @Autowired
    private SubTaskRepository repository;

    public List<SubTask> findAll() {
        return repository.findAll();
    }

    public SubTask findOne(String id) {
        return repository.findOne(id);
    }

    public void delete(String id) {
        repository.delete(id);
    }

    public SubTask insert(SubTask user) {
        return repository.insert(user);
    }
}
