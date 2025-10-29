package com.td.backend.user.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @Getter
    @OneToOne( mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-address")
    private Address address;

    @Getter
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-contract")
    private Contract contract;


    public void setAddress(Address address) {
        if (address == null) {
            if (this.address != null) {
                this.address.setUser(null);
            }
        } else {
            address.setUser(this);
        }
        this.address = address;
    }

    public void setContract(Contract contract) {
        if (contract == null) {
            if (this.contract != null) {
                this.contract.setUser(null);
            }
        } else {
            contract.setUser(this);
        }
        this.contract = contract;
    }


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
