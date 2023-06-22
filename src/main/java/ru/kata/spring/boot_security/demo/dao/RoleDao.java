package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.models.Role;

import java.util.List;

public interface RoleDao {
    List<Role> getAllRoles();

    Role getRoleByAuthority(String authority);

    Role getRoleById(Long id);

    void editRole(Role role);
}
