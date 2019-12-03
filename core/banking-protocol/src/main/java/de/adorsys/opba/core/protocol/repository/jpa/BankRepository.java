package de.adorsys.opba.core.protocol.repository.jpa;

import de.adorsys.opba.core.protocol.domain.entity.Bank;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BankRepository extends JpaRepository<Bank, Long> {

    List<Bank> findByNameContainingIgnoreCaseOrBicContainingIgnoreCaseOrBankCodeContainingIgnoreCase(String query, String query2, String query3, Pageable pageable);
}
