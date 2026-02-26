package com.resumebuilder.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Map everything from the root of the project so frontend files load correctly
        registry.addResourceHandler("/**")
                .addResourceLocations("file:../", "file:./", "classpath:/static/");
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Forward requests to the root path `/` to `index.html`
        registry.addViewController("/").setViewName("forward:/index.html");
    }
}
