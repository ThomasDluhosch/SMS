package com.td.backend.user.dto;

import com.td.backend.auth.model.Role;

import java.util.Date;

public record UpdateUserDTO (
        String username,
        String firstName,
        String lastName,
        Date birthday,
        String phone,
        Role role,
        AddressDTO address
) {}
