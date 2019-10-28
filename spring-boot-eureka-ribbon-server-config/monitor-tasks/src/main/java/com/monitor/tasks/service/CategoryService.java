/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitor.tasks.service;

import com.monitor.core.entity.Category;
import com.monitor.tasks.repository.CategoryRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author denis
 */
@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    public List<Category> findAll() {
        return repository.findAll();
    }

    public Category findOne(String id) {
        return repository.findOne(id);
    }

    public void delete(String id) {
        repository.delete(id);
    }

    public Category insert(Category user) {
        return repository.insert(user);
    }
}
