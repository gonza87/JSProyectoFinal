

const contenedorProductos = document.querySelector("#misProductos");
console.log(contenedorProductos)
const body = document.body;
let carrito;
const contenedorCarro = document.querySelector("#contenedorCarro");
const btnTodos = document.querySelector("#todos");
const totalAPagar = document.querySelector("#totalPagar");

//FUNCION QUE RECIBE LISTA DE ARTICULOS
function cargarProductos (listProductos){
  contenedorProductos.innerHTML="";
    for (producto of listProductos){
      
        contenedorProductos.innerHTML += `
        <div class="card col-6 m-1" style="width: 15rem">
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

btnTodos.addEventListener("click",()=>{
  cargarProductos(productos);
})

//FILTRO DE PRODUCTOS
const btnCategoria = document.querySelectorAll(".btnCategoria");// Selecciono coleccion de todos los botones Categoria

btnCategoria.forEach((boton) =>{
  
  boton.addEventListener("click",()=>{  
    
    const filtoProductos = productos.filter(producto => producto.categoria === boton.id);
    
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

// let carritoEnStorage = JSON.parse(localStorage.getItem("carrito"));
// if (carritoEnStorage)
// carrito = carritoEnStorage;
// else{
//   carrito = [];
// }

carrito = JSON.parse(localStorage.getItem("carrito")) || ([]); 


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


const btnCarrito = document.querySelector("#btnCarrito");
btnCarrito.addEventListener("click",()=>{
  const prodEnCarrito = JSON.parse(localStorage.getItem("carrito"));
  console.log(prodEnCarrito);
  contenedorCarro.innerHTML = "";
    prodEnCarrito.forEach(prod =>{
   
      contenedorCarro.innerHTML += `
      <tr>
      <th scope="row">${prod.id}</th>
      <td><img class="imgCarrito" src="${prod.imagen}" alt=""></td>
      <td>${prod.marca}</td>
      <td>${prod.cantidad}</td>
      <td>U$S ${prod.precio}</td>
      </tr>
     `;
     
  });
  const total = prodEnCarrito.reduce((acumulador,art)=>acumulador + (art.precio*art.cantidad), 0);
  totalAPagar.innerHTML=`ToTal: ${total}`
  
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





