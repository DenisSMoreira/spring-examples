/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitor.tasks.repository;

import com.monitor.core.entity.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author denis
 */
public interface TagRepository extends MongoRepository<Tag, String> {

}
