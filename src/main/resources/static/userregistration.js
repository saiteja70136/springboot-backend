

document.querySelector('.userRegistration').addEventListener('submit',(event)=>{
      event.preventDefault();
      makeRequestToBackend();
});
function extractData(){
      const form_data = {
          name:document.querySelector('.name').value,
          dob:document.querySelector('.dob').value,
          gender:document.querySelector('input[name=gender]:checked').value,
          address:document.querySelector('.address').value,
          email:document.querySelector('.email').value,
          phone:document.querySelector('.phone').value,
          password:document.querySelector('.password').value,
          role:"ROLE_USER",
      }
      return form_data;
}
async function makeRequestToBackend() {
  try {
    const response = await fetch('/storedataintodb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(extractData())
    });
    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }
    const result = await response.text(); // Or .json() if response is JSON
    if(result==1){
      alert("Account Created!!")
	  window.location.href='/loginpage';
    }else
      alert("Credentials found!!")
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong: " + error.message);
  }
}


