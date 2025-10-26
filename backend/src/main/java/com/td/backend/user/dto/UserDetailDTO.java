package com.td.backend.user.dto;

import com.td.backend.auth.model.Role;
import com.td.backend.user.model.Address;
import java.util.Date;

public record UserDetailDTO(
        Integer id,
        String username,
        String firstName,
        String lastName,
        Date birthday,
        String phone,
        Date hiringDate,
        Float workingHours,
        Integer vacationDaysLeft,
        Role role,
        Address address
) {}