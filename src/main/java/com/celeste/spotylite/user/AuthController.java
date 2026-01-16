package com.celeste.spotylite.user;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository repo;

    public AuthController(UserRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return repo.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        User u = repo.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("No existe"));

        if (!u.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        return u;
    }
}
