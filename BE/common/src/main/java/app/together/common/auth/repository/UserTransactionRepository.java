package app.together.common.auth.repository;

import app.together.common.auth.entity.UserTransaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTransactionRepository extends JpaRepository<UserTransaction, Long> {

    List<UserTransaction> findByUserIdOrderByUserTransactionIdDesc(Long userId);

    Page<UserTransaction> findByUserIdOrderByUserTransactionIdDesc(Long userId, Pageable pageable);

    List<UserTransaction> findByWalletIdOrderByUserTransactionIdDesc(Long walletId);
}
