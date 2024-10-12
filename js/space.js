let NASAapi = "https://images-api.nasa.gov/search?q="; //variable para almacenar la api
let showInfoArea = document.getElementById("contenedor"); //variable que contiene el contenedor donde se mostraran las tarjetas

//Funcion para hacer las busquedas
function imgsearch(wordtosearch) {
 console.log("buscando" + wordtosearch);
 // Se carga el archivo JSON
 fetch(NASAapi + wordtosearch) //se concatena la palabra a buscar al url de la api
  //si la respuesta es correcta, se convierte a JSON
  .then((response) => response.json())
  // Entonces, se muestra la información en la consola
  .then((data) => {
   console.table(data.collection.items);
   showSearchedInfo(data.collection.items);
  })
  .catch((error) => {
   console.log("Error en la carga de películas");
  });
};
//evento que carga la web y tiene el evento click en el boton buscar
document.addEventListener("DOMContentLoaded", function () {
 let clicksearch = document.getElementById("btnBuscar");

 clicksearch.addEventListener("click", () => {
  let search = document.getElementById("inputBuscar");
  imgsearch(search.value); //llamamos la funcion de buscar
 });
});
//funcion para mostrar la informacion buscada con eso mostrar las tarjetas
function showSearchedInfo(searchedInfo) {
 console.log("se recibio datos");
 showInfoArea.innerHTML = "";
 for (let nasaInfo of searchedInfo) {
  showInfoArea.innerHTML += `
  <div class="card" style="width: 18rem;">
   <img src="${nasaInfo.links[0].href}" class="card-img-top" alt="...">
   <div class="card-body">
    <h5 class="card-title">${nasaInfo.data[0].title}</h5>
    <p class="card-text">${nasaInfo.data[0].description}</p>
    <p class="card-text date-created"><small class="text-body-secondary">${nasaInfo.data[0].date_created}</small></p>
   </div>
  </div>`;
 };
};
