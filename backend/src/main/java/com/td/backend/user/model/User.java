package com.td.backend.user.model;

import com.td.backend.auth.model.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Integer id;

    @Getter @Setter
    @Column(unique = true)
    private String username;

    @Getter @Setter
    private String firstName;

    @Getter @Setter
    private String lastName;

    @Getter @Setter
    private Date birthday;

    @Getter @Setter
    private String password;

    @Getter @Setter
    private String phone;

    //private Address address;

    @Getter @Setter
    @Column(name = "hiring_date")
    private Date hiringDate;

    @Getter @Setter
    @Column(name = "working_hours")
    private Float workingHours;

    @Getter @Setter
    @Column(name = "vacation_days_left")
    private Integer vacationDaysLeft;



    @Getter @Setter
    @Enumerated(EnumType.STRING)
    private Role role;




    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
}
