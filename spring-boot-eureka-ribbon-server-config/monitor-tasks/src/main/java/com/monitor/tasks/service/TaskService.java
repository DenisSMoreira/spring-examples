/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitor.tasks.service;

import com.monitor.core.entity.Task;
import com.monitor.tasks.repository.TaskRepository;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author denis
 */
@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;
    
    private static final String KEY_GET_ALL = "all";

    public List<Task> findAll() {
        return repository.findAll();
    }

    public List<Task> findTaskByUserId(String userId) {
//        if current_user && current_user.profile == User_Profile::PROFILE_TYPE_ADMIN
//        tasks_in_vision_administer
//
//        elsif current_user && current_user.profile == User_Profile::PROFILE_TYPE_MANAGER
//          tasks_in_vision_manager
//        end
        return repository.findTaskByUserId(userId);
    }
    
    public List<Task> filter(String userId) {
        if (KEY_GET_ALL.equals(userId)) {
            return findAll();
        } else {
            return findTaskByUserId(userId);
        }
    }

    public Task findOne(String id) {
        return repository.findOne(id);
    }

    public void delete(String id) {
        repository.delete(id);
    }

    public Task insert(Task task) {
        return repository.insert(task);
    }

    public Task save(Task task) {
        return repository.save(task);
    }

    public void changeStatus(String idTask, String change, String status, Date active, Date done, Date timeStatus) {

    }
}
