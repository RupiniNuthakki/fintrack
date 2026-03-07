package com.fintrack.fintrackbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private String token;
    private String email;
    private String name;
    private String message;

    public LoginResponse(String token, String email, String name) {
        this.token = token;
        this.email = email;
        this.name = name;
        this.message = "Login successful";
    }
}