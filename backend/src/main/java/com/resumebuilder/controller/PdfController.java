package com.resumebuilder.controller;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import com.resumebuilder.dto.PdfRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/pdf")
@CrossOrigin(origins = "*") // Allow frontend to call across origins
public class PdfController {

    @PostMapping("/generate")
    public ResponseEntity<byte[]> generatePdf(@RequestBody PdfRequest request) {
        String htmlContent = request.getHtml();

        if (htmlContent == null || htmlContent.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        try (Playwright playwright = Playwright.create();
             Browser browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(true))) {
            System.out.println("Generating PDF with Playwright Chromium Engine...");
            Page page = browser.newPage();
            
            // Set HTML content directly to the page rendering engine
            page.setContent(htmlContent, new Page.SetContentOptions().setWaitUntil(com.microsoft.playwright.options.WaitUntilState.NETWORKIDLE));

            // Generate precise PDF matching CSS exactly (A4 size, no margins, prints background graphics)
            byte[] pdfBytes = page.pdf(new Page.PdfOptions()
                    .setFormat("A4")
                    .setPrintBackground(true)
                    .setMargin(new com.microsoft.playwright.options.Margin()
                            .setTop("0px")
                            .setBottom("0px")
                            .setLeft("0px")
                            .setRight("0px")));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "ResumeForge_Project.pdf");

            System.out.println("PDF generated successfully!");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(pdfBytes);

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Failed to render PDF using Playwright.");
            String errorMessage = "Failed to render PDF using Playwright: " + e.getMessage();
            return ResponseEntity.internalServerError()
                    .contentType(MediaType.TEXT_PLAIN)
                    .body(errorMessage.getBytes(StandardCharsets.UTF_8));
        }
    }
}
