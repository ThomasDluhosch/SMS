package com.td.backend.user;

import com.td.backend.auth.AuthenticationService;
import com.td.backend.auth.model.Role;
import com.td.backend.user.dto.AddressDTO;
import com.td.backend.user.dto.CreateUserDTO;
import com.td.backend.user.dto.UserDetailDTO;
import com.td.backend.user.dto.UserListDTO;
import com.td.backend.user.model.Address;
import com.td.backend.user.model.User;
import com.td.backend.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    // GET /api/users
    public List<UserListDTO> getAllUsers(){
        return userRepository.findAll().stream().map(this::convertToUserListDTO).collect(Collectors.toList());
    }


    // GET /api/users/{id}
    public UserDetailDTO getUserById(Integer id){
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return convertToDetailDTO(user);
    }


    // POST /api/users
    @Transactional
    public User createUser(CreateUserDTO dto) {
        User user = new User();
        user.setUsername(dto.username());
        user.setFirstName(dto.firstName());
        user.setLastName(dto.lastName());
        user.setBirthday(dto.birthday());
        user.setPhone(dto.phone());

        user.setPassword(passwordEncoder.encode(dto.password()));

        user.setRole(dto.role());

        Address newAddress = new Address();

        if (dto.address() != null) {
            AddressDTO adrDto = dto.address();
            newAddress.setStreet(adrDto.street());
            newAddress.setNumber(adrDto.number());
            newAddress.setPlz(adrDto.plz());
            newAddress.setLocation(adrDto.location());
        }

        user.setAddress(newAddress);
        return userRepository.save(user);
    }


    // DELETE /api/users/{id}
    public void deleteUser(Integer id){
        if(!userRepository.existsById(id)){
            throw new UsernameNotFoundException("User not found");
        }

        userRepository.deleteById(id);
    }


    private UserListDTO convertToUserListDTO(User user) {
        return new UserListDTO(
                user.getId(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getBirthday(),
                user.getPhone(),
                user.getRole()
        );
    }


    private UserDetailDTO convertToDetailDTO(User user) {
        return new UserDetailDTO(
                user.getId(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getBirthday(),
                user.getPhone(),
                user.getHiringDate(),
                user.getWorkingHours(),
                user.getVacationDaysLeft(),
                user.getRole(),
                user.getAddress()
        );
    }
}
