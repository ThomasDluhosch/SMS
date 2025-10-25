package com.td.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    @GetMapping("/demo")
    public ResponseEntity<String> demo(){
        return ResponseEntity.ok("Hello World from SECURED URL");
    }

    @GetMapping("/admin")
    public ResponseEntity<String> adminOnly(){
        return ResponseEntity.ok("Hello World from ADMIN ONLY");
    }
}
