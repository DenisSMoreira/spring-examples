package com.lab.arq.dsm.service;

import com.lab.arq.dsm.core.entity.Message;
import com.lab.arq.dsm.core.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return repository.findById(id).get();
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

    public Message insert(Message user) {
        return repository.insert(user);
    }
}