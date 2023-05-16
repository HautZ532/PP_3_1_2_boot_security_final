package ru.kata.spring.boot_security.demo.services;



import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserService {
    void saveUser(User user);
    List<User> getAllUsers();
    void removeUser(Long id);
    void editUser(User user);
    User getUser(Long id);
    User getUserByName(String name);
}
