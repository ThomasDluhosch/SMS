package com.sms.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "role")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 20, unique = true, nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleName name;

    @Column(nullable = false)
    private String description;

    public enum RoleName {
        USER,
        ADMIN
    }

}
