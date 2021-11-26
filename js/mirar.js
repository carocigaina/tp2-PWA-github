var db;
function caca(){
    console.log("holii");
   var hola= db.peliculas.toArray();
   console.log("holii");
}
window.onload = function(){
    init();
}

function init(){
     db=new Dexie("listado").open().then(caca);
}