package com.monitor.performance.config;

import com.google.common.base.Predicate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;

import static springfox.documentation.builders.PathSelectors.regex;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import static com.google.common.base.Predicates.or;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Monitor Automation Core API")
                .description("Api de Monitor Task. Onde sua principal tarefa é inovar o sistema de monitoramento de tarefas.")
                .version("1.0")
                .licenseUrl("http://www.apache.org/licenses/LICENSE-2.0.html")
                .license("Apache 2.0")
                .contact(new Contact("Denis Soares Moreira", "https://github.com/DenisSMoreira/monitor-web", "denis.soares.moreira@gmail.com"))
                .termsOfServiceUrl("https://www.google.com/policies/terms/")
                .build();
    }

    @SuppressWarnings("unchecked")
    private Predicate paths() {
        return or(regex("/perfomace.*"));
    }

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(paths())
                //.paths(PathSelectors.regex("/monitor/api/.*")) 
                //.paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo());
    }
}
