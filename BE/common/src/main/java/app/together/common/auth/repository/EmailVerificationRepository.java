package app.together.common.auth.repository;

import app.together.common.auth.entity.EmailVerification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailVerificationRepository extends JpaRepository<EmailVerification, Long> {

    Optional<EmailVerification> findByEmailAndVerificationCode(String email, String code);

    Optional<EmailVerification> findByVerificationCode(String verificationCode);
}
