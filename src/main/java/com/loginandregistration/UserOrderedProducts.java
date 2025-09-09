package com.loginandregistration;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserOrderedProducts {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    Integer id;
    String userid;
    String productid;
	String delevirydata;
    String quantity;
    String shipcharg;
    String price;
    String total;
    public Integer getId() {
		return id;
	}
	public String getPrice() {
		return price;
	}
	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
	}
	public void setPrice(String price) {
		this.price = price;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getProductid() {
		return productid;
	}
	public void setProductid(String productid) {
		this.productid = productid;
	}
	public String getDelevirydata() {
		return delevirydata;
	}
	public void setDelevirydata(String delevirydata) {
		this.delevirydata = delevirydata;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getShipcharg() {
		return shipcharg;
	}
	public void setShipcharg(String shipcharg) {
		this.shipcharg = shipcharg;
	}
	@Override
	public String toString() {
		return "UserOrderedProducts [id=" + id + ", userid=" + userid + ", productid=" + productid + ", delevirydata="
				+ delevirydata + ", quantity=" + quantity + ", shipcharg=" + shipcharg + ", price=" + price + ", total="
				+ total + "]";
	}

}
