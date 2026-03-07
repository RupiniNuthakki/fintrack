package com.fintrack.fintrackbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from FinTrack Backend! 🚀";
    }

    @GetMapping("/status")
    public String status() {
        return "FinTrack API is running successfully! ✅";
    }
}