/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitor.tasks.repository;

import com.monitor.core.entity.Task;
import com.monitor.core.entity.generic.GenericMongoDBRepository;
import java.util.List;

/**
 *
 * @author denis
 */
public interface TaskRepository extends GenericMongoDBRepository<Task, String> {
    
     public List<Task> findTaskByUserId(String userId);

}
