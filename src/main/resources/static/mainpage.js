import { itemsobj,forloadinitialcart,makeRequestToBackend } from './products.js';
let day=dayjs();
let day9=day.add(9,"day");
day9=day9.format("dddd ,MMMM D");
let loaditems='';
async function init() {
    await makeRequestToBackend();
	forloadinitialcart();
    loading();
	searchFunction();
}
init();
function loading(){
    itemsobj.forEach((values)=>{
        loaditems +=`
        <div class="itemscard">
            <div class="imgsec">
                <img style="object-fit:contain; height:100%;width:100%" src="${values.Image}" alt="">
            </div>
            <div class="itemdisc">
                ${values.discription}
            </div>
            <div class="ratingsec">
                <img style="display: flex;width:100%;margin-right:10px;" src="https://supersimple.dev/projects/amazon/images/ratings/rating-45.png" alt="">
                <div style="color: blue;margin-top:3px;">87</div>
            </div>
            <div class="pricediv">$${Number(values.price.substring(1,values.price.length)).toFixed(2)}</div>
            <div class="quantityselect">
                <select class="selectqnt forselect${values.product}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div class="addtocartsymbol"></div>
            <div class="addtocartbtn">
            <button value="${values.product}" class="addbtn">Add to cart</button>
            </div>
        </div>`
    });
    document.querySelector('.gridlayout').innerHTML=loaditems;
    let holdall=document.querySelectorAll('.addbtn');
    holdall.forEach(value=>{
        value.addEventListener('click',()=>{funccall(value.value)});
    });
}
function funccall(val){
    let flag=0;
    let hold=JSON.parse(localStorage.getItem('ordereditems'))||[];
    let appen='.forselect'+(val);
    let valuess=document.querySelector(appen).value;
    const obj={
        valdd:valuess,
        sojb:itemsobj[val-1],
        shipcharg:0,
        deliverydata:day9
    };
    if(hold.length!==0){
        hold.forEach((element) => {
            if(element.sojb.product===Number(val)){
                let val=Number(element.valdd);
                let sval=Number(obj.valdd);
                val=val+sval;
                element.valdd=val;
                flag=1;
            }
        });
    }else{hold.push(obj);flag=-1;}
    if(flag===0){hold.push(obj);}
    localStorage.setItem('ordereditems',JSON.stringify(hold));
    let totalpro = 0;
    hold.forEach(element=>{
      totalpro+=Number(element.valdd);
    });
    document.querySelector('.cheangecount').innerHTML=totalpro;
}
document.querySelector('.forreturns').addEventListener('click',()=>{
    window.location.href='/finalpage';
});
let holditemsforsearc;
let search=document.querySelector('.searchfield');
function searchFunction(){
	search.addEventListener('keyup',function(event){
	    let val=this.value;
	    document.querySelector('.gridlayout').innerHTML='';
	    holditemsforsearc='';
	    itemsobj.forEach((element)=>{
	        let hold=element.discription.toLowerCase();
	        if(hold.includes(val)){
	           loading_search(element);
	        }
	    });
	    loadintopage();
	});
}
function loading_search(values){
    holditemsforsearc +=`
    <div class="itemscard">
        <div class="imgsec">
            <img style="object-fit:contain; height:100%;width:100%" src="${values.Image}" alt="">
        </div>
        <div class="itemdisc">
            ${values.discription}
        </div>
        <div class="ratingsec">
            <img style="display: flex;width:100%;margin-right:10px;" src="https://supersimple.dev/projects/amazon/images/ratings/rating-45.png" alt="">
            <div style="color: blue;margin-top:3px;">87</div>
        </div>
        <div class="pricediv">$${Number(values.price.substring(1,values.price.length)).toFixed(2)}</div>
        <div class="quantityselect">
            <select class="selectqnt forselect${values.product}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>
        <div class="addtocartsymbol"></div>
        <div class="addtocartbtn">
        <button value="${values.product}" class="addbtn">Add to cart</button>
        </div>
    </div>`
}
function loadintopage(){
    document.querySelector('.gridlayout').innerHTML=holditemsforsearc;
    let holdall=document.querySelectorAll('.addbtn');
    holdall.forEach(value=>{
        value.addEventListener('click',()=>{funccall(value.value)});
    });
}
document.querySelector('.logo').addEventListener('click',()=>{
     window.location.href="/dashbordpage";
});
