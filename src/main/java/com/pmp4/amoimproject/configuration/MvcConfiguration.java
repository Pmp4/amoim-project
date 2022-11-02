package com.pmp4.amoimproject.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableScheduling
@EnableTransactionManagement
public class MvcConfiguration implements WebMvcConfigurer {
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new MoimInterceptor())
//                .addPathPatterns("/meeting/**")
//                .excludePathPatterns("/meeting/select/main/**");
//    }


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/upload/img_upload/");
        registry.addResourceHandler("/default/images/**")
                .addResourceLocations("classpath:/static/upload/images");
        registry.addResourceHandler("/profile/images/**")
                .addResourceLocations("classpath:/static/upload/profile/");
    }


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("*")
//                .allowCredentials(true);    //쿠키 열람 권한, 프론트에 맞춰 대응해줘야함
                .allowCredentials(false);    //쿠키 열람 권한, 프론트에 맞춰 대응해줘야함
    }



    @Bean
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver
                = new CommonsMultipartResolver();
        multipartResolver.setDefaultEncoding("UTF-8"); // 파일 인코딩 설정
        multipartResolver.setMaxUploadSizePerFile(100 * 1024 * 1024); // 파일당 업로드 크기 제한 (2MB)
        return multipartResolver;
    }
}
