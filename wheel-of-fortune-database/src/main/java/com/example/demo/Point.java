package com.example.demo;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

@Entity(name = "points")
public class Point {
  @Id
  Long id;

  String googleUid;

  int totalPoints;

  public Point(String googleUid, int totalPoints) {
    this.googleUid = googleUid;
    this.totalPoints = totalPoints;
  }

  public long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
  	this.id=id;
  }
  
  public String getGoogleUid() {
  	return this.googleUid;
  }
  
  public void setGoogleUid(String googleUid) {
  	this.googleUid=googleUid;
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
        ", googleUID:'" + this.googleUid + '\'' +
        ", Total Points::" + this.totalPoints + 
        '}';
  }
}