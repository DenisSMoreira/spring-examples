package com.lab.arq.dsm.core.repository;

import com.lab.arq.dsm.core.entity.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {

}