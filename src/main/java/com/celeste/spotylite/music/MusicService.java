package com.celeste.spotylite.music;

import com.fasterxml.jackson.databind.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class MusicService {

    @Value("${rapidapi.key}")
    private String apiKey;

    @Value("${rapidapi.host}")
    private String apiHost;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<Song> search(String query) {

        String url = "https://youtube-music-api3.p.rapidapi.com/search?q=" + query;

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", apiKey);
        headers.set("X-RapidAPI-Host", apiHost);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<String> response =
                restTemplate.exchange(url, HttpMethod.GET, request, String.class);
                System.out.println("API RESPONSE:");
System.out.println(response.getBody());


        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());
            JsonNode result = root.path("result");

            List<Song> songs = new ArrayList<>();

            for (JsonNode node : result) {
    Song song = new Song();

    song.setVideoId(node.has("videoId") ? node.get("videoId").asText() : "");
    song.setTitle(node.has("title") ? node.get("title").asText() : "");
    song.setAuthor(node.has("author") ? node.get("author").asText() : "");
    song.setThumbnail(node.has("thumbnail") ? node.get("thumbnail").asText() : "");
    song.setDuration(node.has("duration") ? node.get("duration").asText() : "");
    song.setExplicit(node.has("isExplicit") && node.get("isExplicit").asBoolean());

    songs.add(song);
}


            return songs;

        } catch (Exception e) {
            throw new RuntimeException("Error parsing music API", e);
        }
    }
}
