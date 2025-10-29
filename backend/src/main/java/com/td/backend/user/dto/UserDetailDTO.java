package com.td.backend.user.dto;

import com.td.backend.auth.model.Role;
import com.td.backend.user.model.Address;
import com.td.backend.user.model.Contract;

import java.util.Date;

public record UserDetailDTO(
        Integer id,
        String username,
        String firstName,
        String lastName,
        Date birthday,
        String phone,
        Role role,
        Address address,
        Contract contract
) {}