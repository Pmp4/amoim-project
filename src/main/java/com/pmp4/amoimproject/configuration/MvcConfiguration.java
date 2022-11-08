package com.pmp4.amoimproject.configuration;

import com.pmp4.amoimproject.interceptor.MoimInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableScheduling
@EnableTransactionManagement
public class MvcConfiguration implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(moimInterceptor())
                .addPathPatterns("/meeting/edit/**")
                .addPathPatterns("/meeting/delete/**");
    }

    @Bean
    public MoimInterceptor moimInterceptor() {
        return new MoimInterceptor();
    }


    // 배포시 사용안함
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/images/**")                   //유저 업로드 이미지
//                .addResourceLocations("classpath:/static/upload/img_upload/");
//        registry.addResourceHandler("/default/images/**")           //기본 이미지
//                .addResourceLocations("classpath:/static/upload/images");
//        registry.addResourceHandler("/profile/images/**")           //프로필 이미지
//                .addResourceLocations("classpath:/static/upload/profile/");
//    }


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://p-mp4.iptime.org:3000")
//                .allowedOrigins("http://localhost:3000")
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
        multipartResolver.setMaxInMemorySize(100 * 1024 * 1024);
        return multipartResolver;
    }
}
