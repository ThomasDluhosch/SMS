package com.td.backend.user.dto;

public record AddressDTO(
        String street,
        String number,
        String plz,
        String location
) {}