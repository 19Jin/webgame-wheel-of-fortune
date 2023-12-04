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
public class CommodityController {
  private final CommodityRepository commodityRepository;

  public CommodityController(CommodityRepository commodityRepository) {
    this.commodityRepository = commodityRepository;
  }

  @PostMapping("/saveCommodity")
  @CrossOrigin(origins = "*")
  public String saveCommodity(@RequestBody Commodity commodity) {
    if (commodity == null) {
      return "The commodity is invalid";
    }
    this.commodityRepository.save(commodity);
    return "success";
  }
  
  

  @GetMapping("/findAllCommodities")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Commodity> findAllCommodities() {
    Iterable<Commodity> commodities = this.commodityRepository.findAll();
    List<Commodity> commodityList = new ArrayList<>();
    commodities.forEach(commodityList::add);
    commodityList.sort(Comparator.comparingInt(Commodity::getPrice).reversed());
    return commodityList;
  }

  /**
   * Credit Part:
   * PUT requist
   * change the number of products by id and changenumber
   */

  @PutMapping("/updateCommodity/{id}")
  @CrossOrigin(origins = "*")
  public ResponseEntity<String> updateCommodity(@PathVariable Long id, @RequestParam int changeAmount) {
      Optional<Commodity> optionalCommodity = commodityRepository.findById(id);
      if (optionalCommodity.isEmpty()) {
          return ResponseEntity.notFound().build();
      }
      Commodity commodity = optionalCommodity.get();
      int currentNumber = commodity.getNumber();
      
      //change the amount number of products
      commodity.setNumber(currentNumber - changeAmount);
      commodityRepository.save(commodity);
      return ResponseEntity.ok("Commodity updated successfully");
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

}