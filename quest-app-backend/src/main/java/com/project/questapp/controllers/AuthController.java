package com.project.questapp.controllers;

import com.project.questapp.entities.User;
import com.project.questapp.requests.UserRequest;
import com.project.questapp.responses.AuthRespones;
import com.project.questapp.security.JwtTokenProvider;
import com.project.questapp.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;

    private JwtTokenProvider jwtTokenProvider;

    private UserService userService;

    private PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserService userService, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public AuthRespones login(@RequestBody UserRequest userRequest) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userRequest.getUserName(), userRequest.getPassword());
        Authentication auth = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwtToken = jwtTokenProvider.generateJwtToken(auth);
        User user = userService.getOneUserByUserName(userRequest.getUserName());
        AuthRespones authRespones = new AuthRespones();
        authRespones.setMessage("Bearer " + jwtToken);
        authRespones.setUserId(user.getId());
        return authRespones;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthRespones> register(@RequestBody UserRequest userRequest) {
        AuthRespones authRespones = new AuthRespones();
        if(userService.getOneUserByUserName(userRequest.getUserName()) != null) {
            authRespones.setMessage("Username already in use");
            return new ResponseEntity<>(authRespones, HttpStatus.BAD_REQUEST);
        }
        User user = new User();
        user.setUserName(userRequest.getUserName());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        userService.createUser(user);
        authRespones.setMessage("User successfully registered");
        return new ResponseEntity<>(authRespones, HttpStatus.CREATED);
    }
}
