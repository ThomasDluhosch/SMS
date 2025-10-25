package com.td.backend.user.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "address")
public class Address {

    @Id
    private Long id;

    @Getter @Setter
    private String street;

    @Getter @Setter
    private String number;

    @Getter @Setter
    private String plz;

    @Getter @Setter
    private String location;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

}
