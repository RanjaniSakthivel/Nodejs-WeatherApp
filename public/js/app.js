console.log('js working!!!!');
console.log('color check');

const form=document.querySelector('form');
const input=document.querySelector('input');
const address= document.getElementById('address');
const locations= document.getElementById('location');
const para= document.getElementById('forecastData');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let place=input.value;
    locations.innerHTML=null;
    address.innerHTML=null;
    para.textContent=null;
    address.textContent='Loading.....'
    fetch('http://localhost:3000/weather?address='+place).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
            locations.innerHTML=null;
            address.innerHTML=null;
            para.textContent=data.error;
        } else {
            console.log(data);
            para.innerHTML='<b>Forecasted Data: </b>'+data.forecast;
            locations.innerHTML='<b>Place: </b>'+data.location;
            address.innerHTML='<b>Address: </b>'+data.address;
        }
    });
})
})

