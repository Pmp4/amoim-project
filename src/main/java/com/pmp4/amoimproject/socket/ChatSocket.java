package com.pmp4.amoimproject.socket;


import lombok.extern.java.Log;
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
@ServerEndpoint(value = "/socket/chatt/{moim}/{userno}")
public class ChatSocket {
//    private static Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());
//    private static Set<Map<Long, Session>> clients = Collections.synchronizedSet(new HashSet<>());
    private static Map<Long, Session> clients = new HashMap<>();
    private static Logger LOGGER = LoggerFactory.getLogger(ChatSocket.class);


    @OnOpen
    public void onOpen(@PathParam("moim") Long meetingNo, @PathParam("userno") Long userno,  Session session) {
        LOGGER.info("[onOpen] open session : {}, clients={}, userno={}", session.toString(), clients, userno);

//        Map<String, List<String>> res = session.getRequestParameterMap();
//        LOGGER.info("res={}", res);

//        for(Map<Long, Session> client : clients) {
//            if(client.get(userno) != null) {
//                LOGGER.info("[onOpen] 접속된 사용자");
//            }else {
//                LOGGER.info("[onOpen] 새로운 사용자");
//            }
//        }


        clients.put(userno, session);

//        if(!clients.contains(session)) {
////            clients.add(session);
//            LOGGER.info("session open : {}", session);
//        }else{
//            LOGGER.info("이미 연결된 session");
//        }
    }

    @OnMessage
    public void onMessage(String message, @PathParam("userno") Long userno) throws IOException {
        LOGGER.info("[onMessage] receive message : {}", message);

        Map<Long, Session> copyClients = new HashMap<>(clients);
        copyClients.remove(userno);

        Collection<Session> sessionCollection = copyClients.values();
        Session[] sessions = sessionCollection.toArray(new Session[0]);

        for(Session session : sessions) {
            LOGGER.info("[onMessage] send data : {}", message);
            session.getBasicRemote().sendText(message);
        }

//        Collection<Session> session = clients.values();

//        for (Session s : clients) {
//            LOGGER.info("send data : {}", message);
//            s.getBasicRemote().sendText(message);
//        }
    }

    @OnClose
    public void onClose(Session session, @PathParam("userno") Long userno) {
        LOGGER.info("session close : {}", session);
        clients.remove(userno);
    }
}
