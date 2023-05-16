package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserService;


@Controller
@RequestMapping("/users")
public class UsersController {
	private final UserService userService;

	public UsersController(UserService userService) {
		this.userService = userService;
	}


	@GetMapping
	public String printAllUsers(Model model) {
		model.addAttribute("usersList", userService.getAllUsers());
		return "users";
	}

	@GetMapping("/addUser")
	public String addUser(ModelMap model) {
		model.addAttribute("user", new User());
		return "saveUser";
	}

	@PostMapping()
	public String saveUser(@ModelAttribute("user") User user) {
		userService.saveUser(user);
		return "redirect:users";
	}

	@GetMapping("/editUser")
	public String userEdit(@RequestParam(value = "id") Long id, Model model) {
		model.addAttribute("user", userService.getUser(id));
		return "userEdit";
	}

	@PatchMapping()
	public String userUpdate(@ModelAttribute("user") User user) {
		userService.editUser(user);
		return "redirect:users";
	}

	@DeleteMapping()
	public String removeUser(@RequestParam("id") Long id) {
		userService.removeUser(id);
		return "redirect:users";
	}

}