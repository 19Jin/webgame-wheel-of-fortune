package com.example.demo;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

@Entity(name = "scores")
public class Score {
  @Id
  Long id;

  String userName;

  String time;

  int score;

  String googleUID;

  public Score(String userName, String time, int score, String googleUID) {
    this.userName = userName;
    this.time = time;
    this.score = score;
    this.googleUID = googleUID;
  }

  public long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
  	this.id=id;
  }
  
  public String getUserName() {
  	return this.userName;
  }
  
  public void setUserName(String userName) {
  	this.userName=userName;
  }
   public String getTime() {
  	return this.time;
  }
  
  public void setTime(String time) {
  	this.time=time;
  }
  
  public int getScore() {
  	return this.score;
  }
  
  public void setScore(int score) {
  	this.score=score;
  }

  public String getGoogleUID() {
  	return this.googleUID;
  }
  
  public void setGoogleUID(String googleUID) {
  	this.googleUID=googleUID;
  }
  

  @Override
  public String toString() {
    return "{" +
        "id:" + this.id +
        ", userName:'" + this.userName + '\'' +
        ", time:'" + this.time + '\'' +
        ", score:" + this.score + '\'' +
        ", google id::" + this.googleUID + 
        '}';
  }
}