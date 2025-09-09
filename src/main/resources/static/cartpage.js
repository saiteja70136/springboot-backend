let value=JSON.parse(localStorage.getItem('ordereditems'))||[];
let loadhtmltocart='';
let loadhtmltocart2='';
let holdproduct='';
let day=dayjs();
let day1=day.add(1,'day');
let day4=day.add(4,'day');
let day9=day.add(9,'day');
day9=day9.format("dddd ,MMMM D");
day=day.format("dddd ,MMMM D");
day1=day1.format("dddd ,MMMM D");
day4=day4.format("dddd ,MMMM D");
let uid=null
function testcart(){
   if(value.length===0){
      document.querySelector('.leftsec').innerHTML=`
      <p>Cart is empty!</p>
      <button class="placeord">go home</button>
      `;
      document.querySelector('.placeord').addEventListener('click',()=>{
         window.location.href="/dashbordpage";
      });

   }else{
      loadingdatafunction();
   }
}
testcart();
async function loadingdatafunction(){
   await getuserlogindata();
   loadcheckitems();
   runthis();
}
async function getuserlogindata() {
  try {
    const response = await fetch('/getuserdata', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
	  redirect:'manual'
    });
      if(response.type!=="opaqueredirect"){
		const result = await response.json();
		uid=result.id
	  }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong: " + error.message);
  }
}
function runthis(){
   document.querySelector('.leftsec').innerHTML = '';
   value.forEach((element) => {
      loadhtmltocart+=`
      <div class="cardforcart">
         <div class="stylefordeldiv deliverydata${element.sojb.product}">Delivery date: ${element.deliverydata}</div>
         <div class="foritems">
            <div class="imagesec">
               <img style="height:100%;width:100%;object-fit:contain;" src="${element.sojb.Image}" alt="">
            </div>
            <div class="productinfo">
               <div style=margin-bottom:10px;>${element.sojb.discription}</div>
               <div class="foruptbox" style="display:flex;margin-bottom:10px">
                  <div data-name-id="${Number(element.sojb.product)}" class="forupdatefield" style="margin-right:10px;color:blue">update</div>
                  <div class="forin${Number(element.sojb.product)}"></div>
                  <div data-name-id="${Number(element.sojb.product)}" class="fordeletefield" style="color:blue">delete</div>
               </div>
               <div class="forupdatee" style="margin-bottom:10px">Quantity:${element.valdd}</div>
               <div>$${Number(element.sojb.price.substring(1,element.sojb.price.length)).toFixed(2)}</div>
            </div>

            <div class="fordelivery">
               <div style="display:flex">
                 <input value="1" data-radio="${element.sojb.product}" name="radibtn${element.sojb.product}" type="radio" checked>
                 <div style="margin-bottom:10px">
                    <div style="color:green">${day9}</div>
                    <div style="color:rgb(141, 141, 141);">Free shipping</div>
                 </div>
               </div>
               <div style="display:flex">
                 <input value="2" data-radio="${element.sojb.product}" name="radibtn${element.sojb.product}" type="radio">
                 <div style="margin-bottom:10px">
                    <div style="color:green">${day4}</div>
                    <div style="color:rgb(141, 141, 141);">$4.99</div>
                 </div>
               </div>
               <div style="display:flex">
                 <input value="3" data-radio="${element.sojb.product}" name="radibtn${element.sojb.product}" type="radio">
                 <div style="margin-bottom:10px">
                    <div style="color:green">${day1}</div>
                    <div style="color:rgb(141, 141, 141);">$9.99</div>
                 </div>
               </div>
            </div>

         </div>
      </div>`
   });
   document.querySelector('.leftsec').innerHTML=loadhtmltocart;
   //setting updata and delete eventlister
   document.querySelectorAll('.forupdatefield').forEach(elementss=>{
      elementss.addEventListener('click',()=>{doupdataordelete(elementss.dataset.nameId,elementss)});
   });
   document.querySelectorAll('.fordeletefield').forEach(elementss=>{
      elementss.addEventListener('click',()=>{doupdataordelete(elementss.dataset.nameId,elementss)});
   });
   //setting radio button eventlistener
   let hds = 'radibtn';
   let ahod='';
   value.forEach(sai=>{
      hds=hds+sai.sojb.product;
      ahod = `input[name="${hds}"]`;
      document.querySelectorAll(ahod).forEach(sss=>{
         sss.addEventListener('change',()=>{changedeliverydata(sss.value,sss.dataset.radio)});
      })
      hds='radibtn';
   });
}
function changedeliverydata(para,para1){
   let hso='.deliverydata'+para1;
   value.forEach(dss=>{
      if(Number(dss.sojb.product)===Number(para1)){
         if(Number(para)===1){
            dss.shipcharg=0.00;
            dss.deliverydata=day9;
            document.querySelector(hso).innerHTML=`Delivery date:${dss.deliverydata}`;
         }
         if(Number(para)===2){
            dss.shipcharg=4.99;
            dss.deliverydata=day4
            document.querySelector(hso).innerHTML=`Delivery date:${dss.deliverydata}`;
         }
         if(Number(para)===3){
            dss.shipcharg=9.99;
            dss.deliverydata=day1;
            document.querySelector(hso).innerHTML=`Delivery date:${dss.deliverydata}`;
         }
      }
   });
   loadhtmltocart='';
   loadcheckitems();
}
function doupdataordelete(para,para2){
   let varrr='.forin'+para;
   let avar='.addevent'+para;
   const valss=document.createElement("div");
   valss.innerHTML=`
   <div style="display:flex;margin-right:10px;">
      <input class="inputfied${para}" style="width:30px; margin-right:5px;" type="text">
      <button class="addevent${para}" value=${para} style="margin-right:5px;">save</button>
   </div>`;
   if(para2.innerHTML==="update"){
      para2.innerHTML='';
      document.querySelector(varrr).appendChild(valss);
      document.querySelector(avar).addEventListener('click',()=>{Changedata(para)});
   }else{
      deleteitems(para);
   }
}
function Changedata(para){
   const vale='.inputfied'+para;
   value.forEach(objs=>{
      objs.shipcharg=0;
      objs.deliverydata=day9;
      if(objs.sojb.product===Number(para)){
         let ho=Number(objs.valdd);
         ho=ho+Number(document.querySelector(vale).value);
         objs.valdd=ho;
      }
   });    
   localStorage.setItem('ordereditems',JSON.stringify(value));
   value=JSON.parse(localStorage.getItem('ordereditems'))||[];
   document.querySelector('.leftsec').innerHTML='';
   loadhtmltocart='';
   runthis();
   loadcheckitems();
}
function deleteitems(para){
   let val=[];
   value.forEach(eles=>{
      if(eles.sojb.product!==Number(para)){
         val.push(eles);
      }
   });
   localStorage.removeItem('ordereditems');
   localStorage.setItem('ordereditems',JSON.stringify(val));
   value=JSON.parse(localStorage.getItem('ordereditems'));
   document.querySelector('.leftsec').innerHTML='';
   loadhtmltocart='';
   if(value.length!==0){
      runthis();
      loadcheckitems();
   }else{
      document.querySelector('.rightsec').innerHTML='';
      testcart();
   }
}
function loadcheckitems(){
   let va=0;
   let totalprice=0;
   let shipchargess=0;
   let fortot=0;
   value.forEach((num)=>{
     va=Number(num.valdd);
     fortot+=va;
     totalprice+=(va*Number(num.sojb.price.substring(1,num.sojb.price.length)));
     shipchargess+=Number(num.shipcharg);
   });
   totalprice=totalprice+shipchargess;
   let tax=(totalprice*10)/100;
   document.querySelector('.fitems').innerHTML=fortot;
   document.querySelector('.rightsec').innerHTML='';
   let hod=document.createElement("div");
   hod.innerHTML=`
   <div class="rightfied">
     <div style="font-weight:bold;">Order Summary</div>
     <div class="itemsdivinfin">
        <div>items(<span style="color:red">${fortot}</span>)</div>
        <div>$${totalprice.toFixed(2)}</div>
     </div>
     <div class="shipandhanddivinfin">
        <div>shipping & handling</div>
        <div>$${shipchargess.toFixed(2)}</div>
     </div>
     <div class="taxdivinfin">
        <div>total before tax:</div>
        <div style="border-top-width:1px;border-top-style:solid;border-color:rgb(201,201,201);">${totalprice.toFixed(2)}</div>
     </div>
      <div class="esttaxdiv">
        <div>Estimated tax(10%):</div>
        <div>${tax.toFixed(2)}</div>
     </div>
      <div class="totalorderdiv">
        <div>Order total:</div>
        <div>${(Number(totalprice)+Number(tax)).toFixed(2)}</div>
     </div>
     <div class="placeorderbtn">
        <button class="placeord">place your order</button>
     </div>
   </div>`
   document.querySelector('.rightsec').appendChild(hod);
   document.querySelector('.placeord').addEventListener('click',()=>{
      if(value.length!=0){
         localStorage.setItem('ordereditemsfinal',JSON.stringify(value));
		 intodatabase(value);
      }
   });
}
async function intodatabase(value){
	let arr = [];
	value.forEach((item)=>{
        arr.push({
			userid:uid,
			productid:item.sojb.product,
			delevirydata:item.deliverydata,
			quantity:item.valdd,
			shipcharg:item.shipcharg,
			price:item.sojb.price,
			total:(Number(item.sojb.price.substring(1,item.sojb.price.length-1))*Number(item.valdd))
		})
	});
	try {
	  const response = await fetch('/storeproductintodb', {
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json'
	    },
		redirect: "manual",
	    body: JSON.stringify(arr)
	  });
	  console.log("status:", response.status, "type:", response.type);

	  // Case 1: Browser blocked redirect → opaqueredirect
	  if (response.type === "opaqueredirect") {
	    window.location.href = "/loginpage"; 
	    return;
	  }

	  // Case 2: Server really sent 3xx and browser exposed it (rare)
	  if (response.status >= 300 && response.status < 400) {
	    const redirectUrl = response.headers.get("Location");
	    if (redirectUrl) {
	      window.location.href = redirectUrl;
	      return;
	    }
	  }
	  if(response.status===200&&response.type==="basic"){
		  localStorage.removeItem('ordereditems');
		  window.location.href='/finalpage';
	  }
	  const result = await response.text();

	  console.log(result)
	} catch (error) {
	  console.error("Error:", error);
      alert("Something went wrong: " + error.message);
	}
}