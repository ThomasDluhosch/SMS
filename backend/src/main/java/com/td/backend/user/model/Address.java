package com.td.backend.user.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "address")
public class Address {

    @Id
    @Column(name = "user_id")
    private Integer id;

    @Getter @Setter
    private String street;

    @Getter @Setter
    private String number;

    @Getter @Setter
    private String plz;

    @Getter @Setter
    private String location;

    @OneToOne
    @MapsId // Sagt: "Fülle das @Id-Feld (id) mit der ID dieser Beziehung"
    @JoinColumn(name = "user_id") // Sagt: "Die Spalte für diese Beziehung ist 'user_id'"
    @Setter
    @JsonBackReference
    private User user;

}
