/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitor.core.repository;

import com.monitor.core.entity.Message;
import com.monitor.core.entity.generic.GenericMongoDBRepository;

/**
 *
 * @author denis
 */
public interface MessageRepository extends GenericMongoDBRepository<Message, String> {

}
