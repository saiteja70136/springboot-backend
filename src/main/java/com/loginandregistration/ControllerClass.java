package com.loginandregistration;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ControllerClass {
   @Autowired
   ServiceClass serviceClass;
   @RequestMapping("/loginpage")
   public String getLoginPage() {
	   return "loginpageown";
   }
   @RequestMapping("/registeruserform")
   public String registerUserForm() {
	   return "registrationfrom";
   }
   @RequestMapping("/dashbordpage")
   public String homeEndPoint() {
	   return "mainpage";
   }
   @RequestMapping("/dashbordpagelogin")
   public String homeEndPointlogin() {
	   return "mainpage";
   }
   @RequestMapping("/finalpage")
   public String finalpage() {
	   return "finalpage";
   }
   @ResponseBody
   @GetMapping("/getuserdata")
   public UserInformation userInformation(@AuthenticationPrincipal User user) {
	   return serviceClass.getUserData(user.getUsername());
   }
   @ResponseBody
   @PostMapping(value="/storedataintodb",consumes="application/json")
   public int savaDataInto(@RequestBody UserInformation userInformation) {
	  int val = serviceClass.savaData(userInformation);
	  return val;
   }
   @ResponseBody
   @PostMapping(value="/storeproductintodb",consumes="application/json")
   public ResponseEntity<String> storeProductIntoDb(@RequestBody List<UserOrderedProducts> obj) {
	   serviceClass.saveOrderdInfo(obj);
	   return ResponseEntity.ok("save ordered product into db");
   }
   @ResponseBody
   @PostMapping(value="/storeproductinfo",consumes="application/json")
   public ResponseEntity<String> storeProductInfo(@RequestBody List<ProductsData> obj) {
	   serviceClass.saveproductinfo(obj);
	   return ResponseEntity.ok("save product into db");
   }
   @ResponseBody
   @GetMapping(value="/getstoredproductinfo",produces="application/json")
   public List<ProductsData> getProductInfo(){
	   return serviceClass.returnProductsInfo();
   }
   @ResponseBody
   @GetMapping("/getorderedproducts/{id}")
   public List<UserOrderedProducts> getOrderedProducts(@PathVariable("id")String id){
	   return serviceClass.returOrderedProducts(id);
   }
   @ResponseBody
   @GetMapping("/getproductdatabyid/{id}")
   public ProductsData getProductDataById(@PathVariable("id")Integer id) {
	    return serviceClass.getProduct(id);   
   }
   
}

