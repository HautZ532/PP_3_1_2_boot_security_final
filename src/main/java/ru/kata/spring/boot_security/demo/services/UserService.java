package ru.kata.spring.boot_security.demo.services;



import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserService {
    void saveUser(User user, Long[] roles);
    List<User> getAllUsers();
    void removeUser(Long id);
    void editUser(User user, Long[] roles);
    User getUser(Long id);
    User getUserByName(String name);
}
