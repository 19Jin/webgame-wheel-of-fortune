package com.example.demo;

import java.util.List;

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;

import org.springframework.data.domain.Sort;


public interface PointRepository extends DatastoreRepository<Point, Long> {

  List<Point> findByGoogle(String google);

  List<Point> findByTotalPointsGreaterThan(int totalPoints);

  List<Point> findByGoogleAndTotalPoints(String google, int totalPoints);

  List<Point> findByGoogle(String google, Sort sort);

}