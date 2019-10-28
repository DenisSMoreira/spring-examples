package com.monitor.users.repository;

import com.monitor.core.entity.Team;
import com.monitor.core.entity.User;
import com.monitor.core.entity.generic.GenericMongoDBRepository;
import java.util.List;

/**
 *
 * @author denis
 */
public interface TeamRepository extends GenericMongoDBRepository<Team, String> {

    public List<Team> findTeamByListUsers(User user);
    
    public List<Team> findTeamByVisualized(boolean visualized);
    
}

