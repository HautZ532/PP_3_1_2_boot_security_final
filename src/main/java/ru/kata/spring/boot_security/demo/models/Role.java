package ru.kata.spring.boot_security.demo.models;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Role implements GrantedAuthority {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "role")
    private String role;

//    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.EAGER)
//    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "roles_id"), inverseJoinColumns = @JoinColumn(name = "users_id"))
//    private List<User> users;

    @Override
    public String toString() {
        return  role;
    }

    public Role() {

    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    @Override
    public String getAuthority() {
        return getRole();
    }
}
