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
public class PointController {
  private final PointRepository pointRepository;

  public PointController(PointRepository pointRepository) {
    this.pointRepository = pointRepository;
  }

  @PostMapping("/savePoint")
  @CrossOrigin(origins = "*")
  public String savePoint(@RequestBody Point point) {
    if (point == null) {
      return "The point is invalid";
    }
    this.pointRepository.save(point);
    return "success";
  }
  
  

  @GetMapping("/findAllPoints")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Point> findAllScores() {
    Iterable<Point> points = this.pointRepository.findAll();
    List<Point> pointList = new ArrayList<>();
    points.forEach(pointList::add);
    pointList.sort(Comparator.comparingInt(Point::getTotalPoints).reversed());
    return pointList;
  }
  
  @GetMapping("/findByGoogleUid")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Point> findByGoogleUid(@RequestParam String googleUid) {
    Iterable<Point> points = this.pointRepository.findByGoogleUid(googleUid);
    List<Point> pointList = new ArrayList<>();
    points.forEach(pointList::add);
    pointList.sort(Comparator.comparingInt(Point::getTotalPoints).reversed());
    return pointList;
  }

}