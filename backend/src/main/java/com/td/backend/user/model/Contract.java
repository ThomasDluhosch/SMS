package com.td.backend.user.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "contract")
public class Contract {

    @Id
    @Column(name = "user_id")
    private Integer id;

    @Getter @Setter
    private Date hiringDate;

    @Getter @Setter
    private Float monthlyHours;

    @Getter @Setter
    private Float maxVacationDays;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    @Setter
    @JsonBackReference("user-contract")
    private User user;


}
