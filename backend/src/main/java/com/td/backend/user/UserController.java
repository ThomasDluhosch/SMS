package com.td.backend.user;

import com.td.backend.user.model.User;
import com.td.backend.user.repository.UserRepository;
import com.td.backend.auth.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
//@CrossOrigin("http://localhost:3000")
public class UserController {

    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;

    public UserController(UserRepository userRepository, AuthenticationService authenticationService) {
        this.userRepository = userRepository;
        this.authenticationService = authenticationService;
    }

    @GetMapping("/api/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/api/createUser")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = authenticationService.createUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
}
