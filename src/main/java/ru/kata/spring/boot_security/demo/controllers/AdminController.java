package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;
    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }
//    @GetMapping()
//    public String printAdmin(Principal principal, Model model) {
//        User admin = userService.getUserByName(principal.getName());
//        model.addAttribute("admin", admin);
//        return "admin";
//    }
    @GetMapping("/users")
    public String printAllUsers(Model model) {
        model.addAttribute("usersList", userService.getAllUsers());
        return "users";
    }
    @GetMapping("/users/addUser")
    public String addUser(ModelMap model) {
        model.addAttribute("user", new User());
        List<Role> roles = roleService.getAllRoles();
        model.addAttribute("allRoles", roles);
        return "saveUser";
    }
    @PostMapping("/users")
    public String saveUser(@ModelAttribute("user") User user, @RequestParam(value = "rolesId") Long[] roles) {
        userService.saveUser(user, roles);
        return "redirect:/admin/users";
    }
    @GetMapping("/users/editUser")
    public String userEdit(@RequestParam(value = "id") Long id, Model model) {
        model.addAttribute("user", userService.getUser(id));
        List<Role> roles = roleService.getAllRoles();
        model.addAttribute("allRoles", roles);
        return "userEdit";
    }
    @PatchMapping("/users")
    public String userUpdate(@ModelAttribute("user") User user, @RequestParam(value = "rolesId") Long[] roles) {
        userService.editUser(user, roles);
        return "redirect:/admin/users";
    }
    @DeleteMapping("/users")
    public String removeUser(@RequestParam("id") Long id) {
        userService.removeUser(id);
        return "redirect:/admin/users";
    }
}
