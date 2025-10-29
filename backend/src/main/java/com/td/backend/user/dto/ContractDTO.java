package com.td.backend.user.dto;

import java.util.Date;

public record ContractDTO (
        Date hiringDate,
        Float monthlyHours,
        Float maxVacationDays
) {}
