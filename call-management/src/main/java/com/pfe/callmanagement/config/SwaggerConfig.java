package com.pfe.callmanagement.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Swagger/OpenAPI configuration for API documentation.
 */
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Call Management System API")
                .version("1.0.0")
                .description("Professional backend API for Call Management System PFE Project")
                .contact(new Contact()
                    .name("Development Team")
                    .email("support@callmanagement.com")
                )
            )
            .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
            .components(new io.swagger.v3.oas.models.Components()
                .addSecuritySchemes("Bearer Authentication",
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                        .description("JWT Authentication token")
                )
            );
    }
}
