package com.loginandregistration;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.GenericPropertyMatcher;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ServiceClass implements UserDetailsService {
	RepositoryClass obj;
	productRepo ob;
	productOrdered obb;
	@Autowired
	public void setRepObj(RepositoryClass obj,productRepo ob,productOrdered obb) {
		this.obj=obj;
		this.ob=ob;
		this.obb=obb;
	}
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		UserInformation info = obj.findByemail(email);
		if(info==null)
			throw new UsernameNotFoundException("User not found");
        return new User(
        		info.getEmail(),
        		info.getPassword(), 
        		Collections.singletonList(new SimpleGrantedAuthority(info.getRole()))
        		);
	}
	public int savaData(UserInformation userInformation) {
		UserInformation test = obj.findByemail(userInformation.getEmail());
		if (test == null) {
			String pass = userInformation.getPassword();
			BCryptPasswordEncoder objs = new BCryptPasswordEncoder();
			userInformation.setPassword(objs.encode(pass));
			obj.save(userInformation);
			return 1;
		}
		return 0;
	}
	public UserInformation getUserData(String email) {
		return obj.findByemail(email);
	}
    public void saveproductinfo(List<ProductsData> ob) {
    	   for(int i=0;i<ob.size();i++)
    		   this.ob.save(ob.get(i));
    }
    public List<ProductsData> returnProductsInfo(){
    	     return ob.findAll();
    }
    public void saveOrderdInfo(List<UserOrderedProducts> ob) {
 	   for(int i=0;i<ob.size();i++)
 		   this.obb.save(ob.get(i));
    }
    public List<UserOrderedProducts> returOrderedProducts(String id){
    	     UserOrderedProducts up = new UserOrderedProducts();
    	     up.setUserid(id);
         ExampleMatcher matcher = ExampleMatcher.matching()
        		 .withIgnoreNullValues()
        		 .withIgnorePaths("productid","delevirydata","quantity","shipcharg","price","total")
        		 .withMatcher("userid",GenericPropertyMatcher::exact);
         Example<UserOrderedProducts> example = Example.of(up, matcher);
         return obb.findAll(example);
    }
    public ProductsData getProduct(Integer id) {
    	    return ob.findByid(id);
    }
}
