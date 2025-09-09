let loadcart=[];
let loadcartitems=[];
let loadhtmltocart='';
async function makeRequestToBackend() {
  try {
    const response = await fetch('/getuserdata', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
  	  const result = await response.json();
	  getUserProductInfo(result.id);
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong: " + error.message);
  }
}
makeRequestToBackend();
async function getUserProductInfo(val){
	try {
	  const response = await fetch('/getorderedproducts/'+val, {
	    method: 'GET',
	    headers: {
	      'Accept': 'application/json'
	    }
	  });
	  const result = await response.json();
	  loadcartitems = result||[];
	  console.log(loadcartitems)
	  await load(loadcartitems)
	  printall();
	  loadItemsIntoScreen();
	  
	} catch (error) {
	  console.error("Error:", error);
	  alert("Something went wrong: " + error.message);
	}
}
async function load(items){
    for(let item of items){
		try {
		  const response = await fetch('/getproductdatabyid/'+item.productid, {
		    method: 'GET',
		    headers: {
		      'Accept': 'application/json'
		    }
		  });
		  const result = await response.json();
		  loadcart.push(result);
		} catch (error) {
		  console.error("Error:", error);
		  alert("Something went wrong: " + error.message);
		}
	}
}
function printall(){
   loadcart.forEach((item)=>{
	  console.log(item)
   })	
}
function loadItemsIntoScreen(){
	if(loadcartitems.length!=0){
	   loadhtmltocart=document.createElement("div");
	   loadcartitems.forEach((element) => {
		  let hold=loadcart.find(a=>Number(a.id)===Number(element.productid))
	      loadhtmltocart.innerHTML+=`
	      <div class="cardforcart">
	         <div>
	            <div class="stylefordeldiv deliverydata${element.productid}">Delivery date: ${element.delevirydata}</div>
	            <div class="foritems">
	               <div class="imagesec">
	                  <img style="width:100%; object-fit:contain;" src="${hold.image}" alt="">
	               </div>
	               <div class="productinfo">
	                  <div style=margin-bottom:10px;>${hold.discription}</div>
	                  <div class="forupdatee" style="margin-bottom:10px">Quantity:${element.quantity}</div>
	                  <div>total $${element.total}</div>
	               </div>
	               <div><button value="${element.productid}" class="trackpack forbutnstyling">TrackPackage</button></div>
	            </div>
	         </div>
	      </div>`
	   });
	   document.querySelector('.finalorders').appendChild(loadhtmltocart);
	}
	document.querySelector('.gohomefunc').addEventListener('click',()=>{
	      window.location.href='/dashbordpagelogin';
	});
	document.querySelectorAll('.trackpack').forEach((obj)=>{
	   obj.addEventListener('click',()=>{
	       trackpage(obj.value);
	   });
	});	
}
function trackpage(value){
   loadcart.forEach((loaditems)=>{
      if(loaditems.id===Number(value)){
         localStorage.setItem('trackitem',JSON.stringify(loaditems));
         window.location.href='trackitem.html';
      }
   });
}