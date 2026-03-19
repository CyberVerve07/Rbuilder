package com.resumebuilder.controller;

import com.resumebuilder.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import java.util.Map;

@RestController
@RequestMapping("/api/pdf")
@CrossOrigin("*")
public class PdfController {

    @Autowired
    private PdfService pdfService;

    @GetMapping("/status")
    public Map<String, String> getStatus() {
        return Map.of("status", "Backend is running. PDF generation is now handled by Java (Playwright) for premium quality!");
    }

    @PostMapping("/generate")
    public ResponseEntity<byte[]> generatePdf(@RequestBody Map<String, String> request) {
        String htmlContent = request.get("htmlContent");
        if (htmlContent == null || htmlContent.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        byte[] pdfBytes = pdfService.generatePdf(htmlContent);
        if (pdfBytes == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment().filename("Resume.pdf").build());

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
}
