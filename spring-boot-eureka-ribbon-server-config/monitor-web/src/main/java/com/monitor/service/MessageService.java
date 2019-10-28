/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitor.service;

import com.monitor.core.entity.Message;
import com.monitor.core.repository.MessageRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author denis
 */
@Service
public class MessageService {

    @Autowired
    private MessageRepository repository;

    public List<Message> findAll() {
        return repository.findAll();
    }

    public Message findOne(String id) {
        return repository.findOne(id);
    }

    public void delete(String id) {
        repository.delete(id);
    }

    public Message insert(Message user) {
        return repository.insert(user);
    }
}
