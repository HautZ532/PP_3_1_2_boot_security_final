package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;

public class AuthController {
    @GetMapping("/login")
    public String loginPage() {

        return "login";
    }

    @GetMapping("/")
    public String page() {

        return "redirect:/login";
    }
}
