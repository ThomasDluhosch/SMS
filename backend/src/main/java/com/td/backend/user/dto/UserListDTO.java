package com.td.backend.user.dto;

import com.td.backend.auth.model.Role;

import java.util.Date;

public record UserListDTO(
        Integer id,
        String username,
        String firstName,
        String lastName,
        Date birthday,
        String phone,
        Role role
) {}