package com.monitor.users.repository;

import com.monitor.core.entity.Team;
import com.monitor.core.entity.User;
import com.monitor.core.entity.generic.GenericMongoDBRepository;
import java.util.List;

/**
 *
 * @author denis
 */
public interface UserRepository extends GenericMongoDBRepository<User, String> {

    public User findUserByEmail(String email);

    public List<User> findUserByListTeams(Team team);

}
 