package com.celeste.spotylite.music;

import lombok.Data;

@Data
public class Song {
    private String videoId;
    private String title;
    private String author;
    private String thumbnail;
    private String duration;
    private boolean explicit;
}
