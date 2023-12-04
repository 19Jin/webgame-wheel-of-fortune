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

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpStatus;


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
    scoreList.sort(Comparator.comparingInt(Score::getScore).reversed());
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

  @GetMapping("/findByGoogleUID")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Score> findByGoogleUID(@RequestParam String googleUID) {
    Iterable<Score> scores = this.scoreRepository.findByGoogleUID(googleUID);
    List<Score> scoreList = new ArrayList<>();
    scores.forEach(scoreList::add);
    scoreList.sort(Comparator.comparingInt(Score::getScore).reversed());
    return scoreList;
  }  

// @DeleteMapping("/{id}")
//     public ResponseEntity<String> deleteById(@PathVariable Long id) {
//         try {
//             if (scoreRepository.existsById(id)) {
//                 scoreRepository.deleteById(id);
//                 return ResponseEntity.ok("Deleted successfully");
//             } else {
//                 return ResponseEntity.notFound().build();
//             }
//         } catch (Exception e) {
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting the record");
//         }
//     }
  // public ResponseEntity<String> deleteById(@PathVariable Long id) {
  //   Optional<Score> scoreOptional = this.scoreRepository.findById(id);
  //   if (scoreOptional.isPresent()) {
  //       // 如果找到数据，删除它
  //       this.scoreRepository.deleteById(id);
  //       return ResponseEntity.ok("删除成功");
  //   } else {
  //       return ResponseEntity.notFound().build();
  // }
  @DeleteMapping("/deleteById")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public ResponseEntity<String> deleteById(@RequestParam Long id) {
      Optional<Score> scoreOptional = scoreRepository.findById(id);
      
      if (scoreOptional.isPresent()) {
          scoreRepository.delete(scoreOptional.get());
          return ResponseEntity.ok("Score deleted successfully");
      } else {
          return ResponseEntity.notFound().build();
      }
  }
}