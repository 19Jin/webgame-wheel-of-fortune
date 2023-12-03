package com.example.demo;

import java.util.List;

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;

import org.springframework.data.domain.Sort;


public interface ScoreRepository extends DatastoreRepository<Score, Long> {

  List<Score> findByUserName(String userName);

  List<Score> findByScoreGreaterThan(int score);

  List<Score> findByUserNameAndScore(String userName, int score);

  List<Score> findByUserName(String userName, Sort sort);

  List<Score> findByGoogleUID(String googleUID);

}