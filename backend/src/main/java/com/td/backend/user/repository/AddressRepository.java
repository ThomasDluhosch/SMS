package com.td.backend.user.repository;

import com.td.backend.user.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address,Long> {

    Optional<Address> findById(Long id);

}
