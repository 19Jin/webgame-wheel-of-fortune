package com.example.demo;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpSession;

import java.util.Collections;
import java.util.Comparator;

// import org.springframework.data.domain.Sort;

@RestController
public class ScoreController {
  private final ScoreRepository scoreRepository;

  public ScoreController(ScoreRepository scoreRepository) {
    this.scoreRepository = scoreRepository;
  }

  @PostMapping("/saveScore")
  @CrossOrigin(origins = "*")
  public String saveScore(@RequestBody Score score) {
    if (score == null) {
      return "The score is invalid";
    }
    this.scoreRepository.save(score);
    return "success";
  }
  
  

  @GetMapping("/findAllScores")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Score> findAllScores() {
  	Iterable<Score> scores = this.scoreRepository.findAll();
    List<Score> scoreList = new ArrayList<>();
    scores.forEach(scoreList::add);
    return scoreList;
  }

  @GetMapping("/findByUserName")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Score> findByUserName(@RequestParam String userName) {
  	Iterable<Score> scores = this.scoreRepository.findByUserName(userName);
    List<Score> scoreList = new ArrayList<>();
    scores.forEach(scoreList::add);
    scoreList.sort(Comparator.comparingInt(Score::getScore).reversed());
    return scoreList;
  }
}