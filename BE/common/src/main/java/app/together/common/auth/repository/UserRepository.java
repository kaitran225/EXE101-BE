package app.together.common.auth.repository;

import app.together.common.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserSso(String userSso);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
