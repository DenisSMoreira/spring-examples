package com.lab.arq.dsm.client;

import com.lab.arq.dsm.dto.Message;
import feign.*;
import feign.gson.GsonDecoder;
import feign.gson.GsonEncoder;

import java.util.List;

@Headers("Content-Type: application/json")
public interface MessageClientFeign {

    @RequestLine("GET /message")
    List<Message> findAll();

    @RequestLine("GET /message/{id}")
    Message show(@Param("id") String id);

    @RequestLine("PUT /message")
    Message update(Message message);

    @RequestLine("POST /message")
    Message create(Message message);

    @RequestLine("DELETE /message/{id}")
    void delete(@Param("id") String id);

    static MessageClientFeign connect() {
        return Feign.builder()
                .encoder(new GsonEncoder())
                .decoder(new GsonDecoder())
                .logLevel(Logger.Level.FULL)
                .target(MessageClientFeign.class, "http://localhost:8080/");
    }
}