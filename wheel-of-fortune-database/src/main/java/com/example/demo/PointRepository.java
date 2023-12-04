package com.example.demo;

import java.util.List;

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;

import org.springframework.data.domain.Sort;


public interface PointRepository extends DatastoreRepository<Point, Long> {

  List<Point> findByGoogleUid(String googleUid);

  List<Point> findByTotalPointsGreaterThan(int totalPoints);

  List<Point> findByGoogleUidAndTotalPoints(String googleUid, int totalPoints);

  List<Point> findByGoogleUid(String googleUid, Sort sort);

}