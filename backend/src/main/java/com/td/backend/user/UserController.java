package com.td.backend.user;

import com.td.backend.user.dto.CreateUserDTO;
import com.td.backend.user.dto.UpdateUserDTO;
import com.td.backend.user.dto.UserDetailDTO;
import com.td.backend.user.dto.UserListDTO;
import com.td.backend.user.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping
    public ResponseEntity<List<UserListDTO>> getAllUsers() {
        List<UserListDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }


    @PostMapping()
    public ResponseEntity<UserDetailDTO> createUser(@RequestBody CreateUserDTO userDTO) {
        User savedUser = userService.createUser(userDTO);
        UserDetailDTO responseDTO = userService.getUserById(savedUser.getId());
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserDetailDTO> getUserById(@PathVariable Integer id) {
        UserDetailDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }


    @PutMapping("/{id}")
    public ResponseEntity<UserDetailDTO> updateUser(@PathVariable Integer id, @RequestBody UpdateUserDTO userDTO) {
        UserDetailDTO updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    }
    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id){
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}
