const API_KEY = "e6446419"; // PEGUEN ACA SU API KEY!!
const URL = "http://www.omdbapi.com/";

/*
window.addEventListener("offline", (event) => {
    console.log("estoy offline");
    document.getElementById("barra").classList.add('offline');
    
});
window.addEventListener("online", (event) => {
    console.log("estoy online");
    document.getElementById("barra").classList.remove('online');
});
if(!navigator.onLine){
    console.log("estoy sin conexion");
    document.getElementById("barra").classList.add('offline');
    
}
*/
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
var divpelicula=document.querySelector(' .divpelicula');
var divmirar=document.querySelector(' .divmirar');


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
        guardarResultados('resultados', data);
        onYouTubeIframeAPIReady();
    }).catch(function(error){
        console.log('Hay un error',error);
    });

};
var titulo,sinopsis,score, fecha,idpeli;
function mostrarResult(data){
    
    console.log(data);
    titulo=data.Title;
    fecha=data.Year;
    sinopsis=data.Plot;
    score=data.imdbRating;
    link=data.Website;
    divpelicula.id=data.imdbID;
    
    img.src=data.Poster;
    
    li1.innerHTML= 'Titulo: ' + titulo;
    li2.innerHTML= 'Sinopsis: '+ sinopsis;
    li3.innerHTML= 'Score: '+ score;
    li4.innerHTML= 'Año: '+ fecha;

};

window.onload = function(){
  init();
}
//indexed db
var db;
var btnagregar=document.getElementById("btnagregar");

function init(){
  db=new Dexie("listado");
  btnagregar.addEventListener("click",agregarPeli);
  document.body.addEventListener("click", onClick);
  db.version(1).stores({ peliculas: 'id'});
  db.open()
  .then(refreshView);
  //db.open();
};

function agregarPeli(event){
  event.preventDefault();
  db.peliculas.bulkPut([
    {
      id: divpelicula.id,
      titulo: li1.innerHTML,
      fecha: li4.innerHTML,
      sinopsis: li2.innerHTML,
      score: li3.innerHTML,
      poster:img.src,
    },
  ]).catch(err => {
    alert("Ocurrio un error: " + err)
  });
}

function imprimirTodos(todos){
  var html = '';
  
  todos.forEach(function(peliculas){
    html+= `<div class="card col-12 col-md-12 d-flex justify-content-center" style="width: 18rem;">
    <img src="${peliculas.poster}" class="card-img-top" id="img">
    <ul class="list-group list-group-flush">
    <li class="list-group-item" >Titulo: ${peliculas.titulo}</li>
    <li class="list-group-item" >Sinopsis: ${peliculas.sinopsis}</li>
    <li class="list-group-item" >Score: ${peliculas.score}</li>
    <li class="list-group-item" >Año: ${peliculas.fecha}</li>
  </ul>
  <button type="button" class="btn btn-danger borrar" id="${peliculas.id}">Eliminar</button>
  </div>`;
  });

  divmirar.innerHTML = html;
}


//borrar
function onClick(event){
  var id;
  if (event.target.hasAttribute('id') && event.target.classList.contains('borrar')){
    // Prevengo el comportamiento default del click del boton
    event.preventDefault();

    // Cual es el ID a borrar?
    id = event.target.getAttribute("id");

    db.peliculas.where('id').equals(id).delete()
    .then(refreshView);
  }
}


function refreshView(){
  return db.peliculas.toArray()
  .then(imprimirTodos);
}

//video

 // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '360',
      width: '640',
      videoId: 'M7lc1UVf-VE' ,

      events: {
         
        'onReady': onPlayerReady,
       'onStateChange': onPlayerStateChange
     }
   });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  }
  function stopVideo() {
    player.stopVideo();
  }       
        

