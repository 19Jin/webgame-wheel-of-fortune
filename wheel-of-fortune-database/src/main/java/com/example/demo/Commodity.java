package com.example.demo;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

@Entity(name = "shopping")
public class Commodity {
  @Id
  Long id;

  String imageLink;

  String itemName;

  int number;

  int price;

  public Commodity(String imageLink, String itemName, int number, int price) {
    this.imageLink = imageLink;
    this.itemName = itemName;
    this.number = number;
    this.price = price;
  }

  public long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
  	this.id=id;
  }
  
  public String getImageLink() {
  	return this.imageLink;
  }
  
  public void setImageLink(String imageLink) {
  	this.imageLink=imageLink;
  }
   public String getItemName() {
  	return this.itemName;
  }
  
  public void setItemName(String itemName) {
  	this.itemName=itemName;
  }
  
  public int getNumber() {
  	return this.number;
  }
  
  public void setNumber(int number) {
  	this.number=number;
  }

  public int getPrice() {
  	return this.price;
  }
  
  public void setPrice(int price) {
  	this.price=price;
  }
  

  @Override
  public String toString() {
    return "{" +
        "id:" + this.id +
        ", imageLink:'" + this.imageLink + '\'' +
        ", itemName:'" + this.itemName + '\'' +
        ", number:" + this.number + '\'' +
        ", price::" + this.price + 
        '}';
  }
}