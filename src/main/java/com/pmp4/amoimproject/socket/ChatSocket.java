package com.pmp4.amoimproject.socket;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.*;

@Service
@ServerEndpoint(value = "/socket/chatt/{moim}")
public class ChatSocket {
    private static Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());
    private static Logger LOGGER = LoggerFactory.getLogger(ChatSocket.class);

    @OnOpen
    public void onOpen(@PathParam("moim") Long meetingNo) {
        LOGGER.info("[onOpen] open chatt, meetingNo : {}", meetingNo);
//        LOGGER.info("[onOpen] open session : {}, clients={}", session.toString(), clients);

//        Map<String, List<String>> res = session.getRequestParameterMap();
//        LOGGER.info("res={}", res);
//
//        if(!clients.contains(session)) {
//            clients.add(session);
//            LOGGER.info("session open : {}", session);
//        }else{
//            LOGGER.info("이미 연결된 session");
//        }
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        LOGGER.info("receive message : {}", message);

        for (Session s : clients) {
            LOGGER.info("send data : {}", message);
            s.getBasicRemote().sendText(message);
        }
    }

    @OnClose
    public void onClose(Session session) {
        LOGGER.info("session close : {}", session);
        clients.remove(session);
    }
}
