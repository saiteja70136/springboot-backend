class classObjGen{
    product;
    Image;
    discription;
    price;
    constructor(obj){
       this.product=obj.id;
       this.Image=obj.image;
       this.discription=obj.discription;
       this.price=obj.price;
    }
}
export let itemsobj;
export async function makeRequestToBackend() {
  try {
    const response = await fetch('/getstoredproductinfo', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }
    const result = await response.json(); // Or .json() if response is JSON
	itemsobj=result||[];
	setWithObject();
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong: " + error.message);
  }
}
function setWithObject(){
	itemsobj=itemsobj.map((ob)=>{
	     return new classObjGen(ob);
	});
}
export function forloadinitialcart(){
    let totalpro = 0;
    let holdval=JSON.parse(localStorage.getItem('ordereditems'))||[];
    if(holdval.length!==0){
        holdval.forEach(element=>{
          totalpro+=Number(element.valdd);
        });
        document.querySelector('.cheangecount').innerHTML=totalpro;
    }
}