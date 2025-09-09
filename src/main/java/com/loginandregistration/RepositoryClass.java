package com.loginandregistration;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryClass extends JpaRepository<UserInformation,Integer>{
   UserInformation findByemail(String email);
}
interface productRepo extends JpaRepository<ProductsData, Integer>{
	ProductsData findByid(Integer id);
}
interface productOrdered extends JpaRepository<UserOrderedProducts,Integer>{

}