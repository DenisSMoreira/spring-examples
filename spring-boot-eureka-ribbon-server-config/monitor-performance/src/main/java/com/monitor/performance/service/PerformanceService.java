package com.monitor.performance.service;

import com.monitor.core.entity.Performance;
import com.monitor.performance.repository.PerformanceRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author denis
 */
@Service
public class PerformanceService {
    
    @Autowired
    private PerformanceRepository repository;

    public List<Performance> findAll() {
        return repository.findAll();
    }

    public Performance findOne(String id) {
        return repository.findOne(id);
    }

    public void delete(String id) {
        repository.delete(id);
    }

    public Performance update(Performance performance) {
        return repository.insert(performance);
    }
    
     public Performance save(Performance performance) {
        return repository.save(performance);
    }
}
