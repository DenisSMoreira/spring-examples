/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitor.tasks.service;

import com.monitor.core.entity.Tag;
import com.monitor.tasks.repository.TagRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author denis
 */
@Service
public class TagService {

    @Autowired
    private TagRepository repository;

    public List<Tag> findAll() {
        return repository.findAll();
    }

    public Tag findOne(String id) {
        return repository.findOne(id);
    }

    public void delete(String id) {
        repository.delete(id);
    }

    public Tag insert(Tag user) {
        return repository.insert(user);
    }
}
