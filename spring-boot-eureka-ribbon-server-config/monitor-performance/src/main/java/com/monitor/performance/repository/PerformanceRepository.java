/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitor.performance.repository;

import com.monitor.core.entity.Performance;
import com.monitor.core.entity.generic.GenericMongoDBRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 *
 * @author denis
 */
@RepositoryRestResource(collectionResourceRel = "performance", path = "/performance")
public interface PerformanceRepository extends GenericMongoDBRepository<Performance, String> {

}
