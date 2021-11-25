const API_KEY = "e6446419"; // PEGUEN ACA SU API KEY!!
const URL = "http://www.omdbapi.com/";

/*
window.addEventListener('offline', event=>{
    document.getElementById("barra").classList.add('offline');
});
window.addEventListener('online', event=>{
    document.getElementById("barra").classList.add('online');
});
if(!navigator.onLine){
    document.getElementById("barra").classList.add('offline');
    console.log("estoy sin conexion");
}*/

// Escucho si el usuario se desconecta, y ejecuto algo
window.addEventListener("offline", (event) => {
    document.getElementById('offline').classList.remove('d-none');
    document.getElementById("main-container").classList.add('d-none');
  });
  
  // Escucho si el usuario tiene conexion
  window.addEventListener("online", (event) => {
    document.getElementById("offline").classList.add("d-none");
    document.getElementById("main-container").classList.remove("d-none");
  });
  
  // Escucho si el navegador esta online o no, util en los casos que entro sin conexion.
  if (!navigator.onLine) {
    //document.getElementById("offline").classList.remove("d-none");
    //document.getElementById("main-container").classList.add("d-none");
    console.log("estoy sin conexion!!");
  }


var input=document.getElementById('search');
var boton=document.getElementById('sendButton');
var main=document.getElementById('main');
var descripcion=document.getElementById('descrip');
var li1=document.getElementById('li1');
var li2=document.getElementById('li2');
var li3=document.getElementById('li3');
var li4=document.getElementById('li4');
var li5=document.getElementById('li5');
var li6=document.getElementById('li6');
var img=document.getElementById('img');


boton.addEventListener("click", ()=>{
    
    console.log('valor',input.value);
    buscarPeli(input.value);
});


function buscarPeli(peli){

    fetch(`${URL}?apikey=${API_KEY}&t=${peli}` )
    .then(function(response){
        console.log(response);
        return response.json();
    }).then(function(data){
        
        mostrarResult(data);
    }).catch(function(error){
        console.log('Hay un error',error);
    });

};
var titulo,sinopsis,score, fecha;
function mostrarResult(data){
    
    console.log(data);
    titulo=data.Title;
    fecha=data.Year;
    sinopsis=data.Plot;
    score=data.imdbRating;
    link=data.Website;
    
    img.src=data.Poster;
    
    li1.innerHTML= 'Titulo: ' + titulo;
    li2.innerHTML= 'Sinopsis: '+ sinopsis;
    li3.innerHTML= 'Score: '+ score;
    li4.innerHTML= 'Año: '+ fecha;

};