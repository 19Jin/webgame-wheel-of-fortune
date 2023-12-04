package com.example.demo;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

@Entity(name = "points")
public class Point {
  @Id
  Long id;

  String google;

  int totalPoints;

  public Point(String google, int totalPoints) {
    this.google = google;
    this.totalPoints = totalPoints;
  }

  public long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
  	this.id=id;
  }
  
  public String getGoogle() {
  	return this.google;
  }
  
  public void setGoogle(String google) {
  	this.google=google;
  }


  public int getTotalPoints() {
  	return this.totalPoints;
  }
  
  public void setTotalPoints(int totalPoints) {
  	this.totalPoints=totalPoints;
  }
  

  @Override
  public String toString() {
    return "{" +
        "id:" + this.id +
        ", google UID:'" + this.google + '\'' +
        ", Total Points::" + this.totalPoints + 
        '}';
  }
}