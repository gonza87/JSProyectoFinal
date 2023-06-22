

const contenedorProductos = document.querySelector("#misProductos");
const titulo = document.querySelector("#titulo");
const body = document.body;
const btnTodos = document.querySelector("#todos");
const carrito = JSON.parse(localStorage.getItem("carrito")) || ([]);
const btnCarrito = document.querySelector("#btnCarrito"); 
const contenedorCarro = document.querySelector("#contenedorCarro");
const totalAPagar = document.querySelector("#totalPagar");
const btnVaciarCarro = document.querySelector("#vaciarCarro");

//FUNCION QUE RECIBE LISTA DE ARTICULOS Y LOS CARGA EN HTML
function cargarProductos (listProductos){
  contenedorProductos.innerHTML="";
  
    for (producto of listProductos){
      
        contenedorProductos.innerHTML += `
        <div class="card col-6 m-2" style="width: 15rem">
        <img src="${producto.imagen}" class="card-img-top" alt="producto" />
        <div class="card-body">
          <h5 class="card-title">US$ ${producto.precio}</h5>
          <p class="card-text">
            ${producto.marca} - ${producto.modelo}
          </p>
          <button id="${producto.id}" type="button" class="btn btn-primary btnCompra">Comprar</button>
        </div>
        </div> 
        `;
    }
    updateBtnCompra();
}
cargarProductos(productos);

//BOTON TODOS LOS PRODUCTOS
btnTodos.addEventListener("click",()=>{
  titulo.innerHTML = "Todos Los Articulos";
  cargarProductos(productos);
})

//FILTRO DE PRODUCTOS
const btnCategoria = document.querySelectorAll(".btnCategoria");// Selecciono coleccion de todos los botones Categoria

btnCategoria.forEach((boton) =>{
  
  boton.addEventListener("click",()=>{  
    
    const filtoProductos = productos.filter(producto => producto.categoria === boton.id);
    titulo.innerHTML= boton.id;
    cargarProductos(filtoProductos);
    
  });
});


//Actualiza los Botones de compra 
function updateBtnCompra(){
  let botonesCompra = document.querySelectorAll(".btnCompra");
  for (const btn of botonesCompra){
    btn.addEventListener("click",()=>{
      const prodACarro = productos.find((producto)=> producto.id == btn.id);
      
      agregarACarro(prodACarro);
   });
 };
};





//FUNCION PARA AGREGAR ARTICULOS AL CARRO
function agregarACarro(prod){
  const buscar = carrito.find((art)=>art.id === prod.id);
  if(buscar)
  {
    buscar.cantidad = buscar.cantidad + 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  else{
    carrito.push(prod);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
};



btnCarrito.addEventListener("click",()=>{
  const prodEnCarrito = JSON.parse(localStorage.getItem("carrito"));
  if(prodEnCarrito){
    contenedorCarro.innerHTML = "";
    prodEnCarrito.forEach(prod =>{
   
      contenedorCarro.innerHTML += `
      <tr>
      <th scope="row">${prod.id}</th>
      <td><img class="imgCarrito" src="${prod.imagen}" alt=""></td>
      <td>${prod.marca}</td>
      <td>${prod.cantidad}</td>
      <td>U$S ${prod.precio}</td>
      <td><button type="button" class="btn btn-danger btn-sm ms-2"><i class="bi bi-trash"></i></button></td>
      </tr>
     `;
     
    });
    const total = prodEnCarrito.reduce((acumulador,art)=>acumulador + (art.precio*art.cantidad), 0);
    totalAPagar.innerHTML=`ToTal: ${total}`
  }
  else{
    contenedorCarro.innerHTML="";
    contenedorCarro.innerHTML += `
      <tr>
      <th scope="row"><p class="text-danger fw-bold fs-3">Carro Vacio</p></th>
      </tr>
     `;
  }
  
  
});

//VACIADO DE CARRO
btnVaciarCarro.addEventListener("click",()=>{
  localStorage.removeItem("carrito");
  contenedorCarro.innerHTML = "";
  totalAPagar.innerHTML="";
  contenedorCarro.innerHTML += `
      <tr>
      <th scope="row"><p class="text-danger fw-bold fs-3">Carro Vacio</p></th>
      </tr>
     `;
});

  
  
 

  




//**************************************************************************************** */

//Boton dark mode
const btnDarkMode = document.querySelector("#btnDarkMode");

if (localStorage.getItem("mode")=== "light")
{
  body.className="light";
  btnDarkMode.textContent="Dark Mode";
}

else if(localStorage.getItem("mode")=== "dark")
{
  body.className="dark";
  btnDarkMode.textContent="Light Mode";
}
else{
  localStorage.setItem("mode","light")
  body.className="light";
  btnDarkMode.textContent="Dark Mode";
}

btnDarkMode.addEventListener("click",()=>{
  
  if (localStorage.getItem("mode") === "light"){
    body.classList.replace("light","dark");
    btnDarkMode.textContent="Light Mode";
    localStorage.setItem("mode","dark");
     
  }
  else{
    body.classList.replace("dark","light");
    btnDarkMode.textContent="Dark Mode";
    localStorage.setItem("mode","light")

  }
});
//************************************************/





