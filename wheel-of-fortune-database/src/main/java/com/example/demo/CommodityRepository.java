package com.example.demo;

import java.util.List;

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;

import org.springframework.data.domain.Sort;


public interface CommodityRepository extends DatastoreRepository<Commodity, Long> {

  List<Commodity> findByItemName(String itemName);

  List<Commodity> findByPriceGreaterThan(int price);

  List<Commodity> findByItemNameAndPrice(String itemName, int price);

  List<Commodity> findByItemName(String itemName, Sort sort);

  List<Commodity> findByImageLink(String imageLink);

}