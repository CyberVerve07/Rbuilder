package com.resumebuilder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ResumeBuilderApplication {
    public static void main(String[] args) {
        System.out.println("Starting ResumeForge Java Spring Boot PDF Rendering Server...");
        SpringApplication.run(ResumeBuilderApplication.class, args);
    }
}
