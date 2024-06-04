package org.example.pmsproj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@ComponentScan(basePackages = {"controllers", "Models", "Config", "Repositories", "Factories"})
@EnableJpaRepositories(basePackages = {"Repositories"})
@SpringBootApplication
@EntityScan(basePackages = {"Models"})
public class PmsProjApplication {

public static void main(String[] args) {
        SpringApplication.run(PmsProjApplication.class, args);
    }

}
