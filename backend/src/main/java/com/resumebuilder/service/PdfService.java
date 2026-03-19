package com.resumebuilder.service;

import com.microsoft.playwright.*;
import org.springframework.stereotype.Service;
import java.nio.file.Paths;
import java.util.Base64;

@Service
public class PdfService {

    public byte[] generatePdf(String htmlContent) {
        try (Playwright playwright = Playwright.create()) {
            Browser browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(true));
            Page page = browser.newPage();
            
            // Set the content of the page to the provided HTML
            // We include the CSS and fonts to ensure the PDF looks exactly like the preview
            page.setContent(htmlContent, new Page.SetContentOptions().setWaitUntil(WaitUntilState.NETWORKIDLE));
            
            // Generate PDF with A4 format and margins
            byte[] pdfBytes = page.pdf(new Page.PdfOptions()
                .setFormat("A4")
                .setPrintBackground(true)
                .setMargin(new com.microsoft.playwright.options.Margin().setTop("10mm").setBottom("10mm").setLeft("10mm").setRight("10mm")));
            
            browser.close();
            return pdfBytes;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
