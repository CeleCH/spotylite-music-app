package com.celeste.spotylite.music;

import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/music")
@CrossOrigin
public class MusicController {

    private final MusicService musicService;

    public MusicController(MusicService musicService) {
        this.musicService = musicService;
    }

@GetMapping("/test")
public String test() {
    return "SPOTYLITE OK";
}


  @GetMapping("/search")
public List<Song> search(@RequestParam String q) {
    return musicService.search(q);
}


}
