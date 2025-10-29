package com.td.backend.user.dto;

import com.td.backend.auth.model.Role;

import java.util.Date;

public record CreateUserDTO(
        String username,
        String firstName,
        String lastName,
        Date birthday,
        String password,
        String phone,
        Role role,
        AddressDTO address,
        ContractDTO contract
) {}