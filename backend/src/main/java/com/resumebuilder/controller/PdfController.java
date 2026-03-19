package com.resumebuilder.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/pdf")
@CrossOrigin("*")
public class PdfController {

    @GetMapping("/status")
    public Map<String, String> getStatus() {
        return Map.of("status", "Backend is running. PDF generation is now handled on the frontend for better performance.");
    }
}
