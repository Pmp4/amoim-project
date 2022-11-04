package com.pmp4.amoimproject.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pmp4.amoimproject.sign.model.EntryPointErrorResponse;
import lombok.Data;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Data
public class AuthErrorResponse {
    private String msg;


    public AuthErrorResponse(String msg) {
        super();
        this.msg = msg;
    }


    public void errorResponse(HttpServletResponse httpServletResponse) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();

        EntryPointErrorResponse entryPointErrorResponse = new EntryPointErrorResponse();
        entryPointErrorResponse.setMsg(msg);

        httpServletResponse.setStatus(401);
        httpServletResponse.setContentType("application/json");
        httpServletResponse.setCharacterEncoding("UTF-8");
//            httpServletResponse.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:3000");
        // cors 에러에 대비 : 클라이언트의 'withCredentials: true' 일 경우 응답 헤더에는 이렇게 담겨야함

        httpServletResponse.getWriter().write(objectMapper.writeValueAsString(entryPointErrorResponse));
        httpServletResponse.getWriter().flush();
    }
}
