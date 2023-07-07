// Funcion para hacer fetch a mi json y lo cargo en array productos
let productos = [];

function traerJsonFetch(){
const url = "./js/productos.json";
  fetch(url)
  .then(response => response.json())
  .then(data =>{
    
    productos = data;
    cargarProductos(productos);

  });

};
traerJsonFetch();

// Funcion para hacer fetch a api de cotizacion de dolar para Uruguay y lo inserto en el html
let coti;
function traerJsonCotizacion(){
  const url = "https://cotizaciones-brou-v2-e449.fly.dev/currency/latest";
  fetch(url)
  .then(response => response.json())
  .then(data =>{
    
    coti = data.rates.USD.sell
    cotizacion.innerHTML = `UYU/USD: ${coti}`;
    
  });
}
traerJsonCotizacion();


//Llamo a elementos del HTML y declaro constantes de la mayoria de los elementos que necesito
const contenedorProductos = document.querySelector("#misProductos");
const titulo = document.querySelector("#titulo");
const body = document.body;
const btnTodos = document.querySelector("#todos");
let carrito = JSON.parse(localStorage.getItem("carrito")) || ([]);
const btnCarrito = document.querySelector("#btnCarrito"); 
const contenedorCarro = document.querySelector("#contenedorCarro");
const totalAPagar = document.querySelector("#totalPagar");
const btnVaciarCarro = document.querySelector("#vaciarCarro");
const btnFinalizarCompra = document.querySelector("#finalizarCompra");
const cotizacion =  document.querySelector("#cotizacion");

//FUNCION QUE RECIBE LISTA DE ARTICULOS Y LOS CARGA EN HTML
function cargarProductos (listProductos){
  contenedorProductos.innerHTML="";
  
    for (producto of listProductos){
      
        contenedorProductos.innerHTML += `
        <div class="card col-6 m-2 shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 15rem">
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

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        showCloseButton: true,
      
      })
      
      Toast.fire({
        icon: 'success',
        title: `${prodACarro.marca} ${prodACarro.modelo} Agregado Al Carrito`
      })
     
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
  updateNumeroCarro();
  
};



btnCarrito.addEventListener("click",()=>{
  renderizarCarro();
  
  
});

function renderizarCarro(){
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
      <td><button id="${prod.id}" type="button" class="btn btn-danger btn-sm ms-2 eliminar-articulo"><i class="bi bi-trash"></i></button></td>
      </tr>
     `;
     
    });
    const total = prodEnCarrito.reduce((acumulador,art)=>acumulador + (art.precio*art.cantidad), 0);
    totalAPagar.innerHTML=`ToTal: ${total} U$S`
    updateBtnEliminarArticulo();
  }
  else{
    contenedorCarro.innerHTML="";
    contenedorCarro.innerHTML += `
      <tr>
      <th scope="row"><p class="text-danger fw-bold fs-3">Carro Vacio</p></th>
      </tr>
     `;
  }
}


//VACIADO DE CARRO



btnVaciarCarro.addEventListener("click",()=>{
 
  Swal.fire({
    icon: 'question',
    iconColor: "red",
    title: 'Seguro que quieres vaciar el carrito?',
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: 'Aceptar',
  
  }).then((result) => {
  
  if (result.isConfirmed) {
    
    
    localStorage.removeItem("carrito");
    carrito = [];
    carroNumero.textContent="";
    contenedorCarro.innerHTML = "";
    totalAPagar.innerHTML="";
    contenedorCarro.innerHTML += `
      <tr>
      <th scope="row"><p class="text-danger fw-bold fs-3">Carro Vacio</p></th>
      </tr>
     `;
     
    Swal.fire({
      icon: "success",
      title: 'Vaciado Exitosamente!',
    })
  }
 
 
})



});

//ELIMINAR ARTICULO DE CARRO


function updateBtnEliminarArticulo(){
  let botonesEliminarArticulo = document.querySelectorAll(".eliminar-articulo");
  for (const btn of botonesEliminarArticulo){
    btn.addEventListener("click",()=>{
      
      let prodAEliminar = carrito.find((producto)=> producto.id == btn.id);
      if(prodAEliminar.cantidad !== 1) //Si la propiedad cantidad es distinto de uno le resto 1 hasta llegar a catidad 1 y ahi ejecuto el else(borro el articulo)
      {
        cantidadProd = prodAEliminar.cantidad - 1;
        prodAEliminar.cantidad = cantidadProd;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarro();
        
      }

      else{
        prodAEliminar = carrito.indexOf(prodAEliminar); 
        eliminarArticulo(prodAEliminar);
        renderizarCarro();
      }

     
      updateNumeroCarro();
   });
 };
};

function eliminarArticulo(prod){
  carrito.splice(prod,1)
  localStorage.setItem("carrito", JSON.stringify(carrito));
  updateNumeroCarro();
}

//BOTON FINALIZAR COMPRA
btnFinalizarCompra.addEventListener("click",()=>{
  if (carrito.length === 0)//Si el carrito esta vacio
  {
    Swal.fire({
      icon: 'error',
      title: 'Carrito Vacio...',  
    });
  }
  //Si tiene articulos el carrito
  else{
    carroNumero.textContent="";
    localStorage.removeItem("carrito");
    carrito = [];
    contenedorCarro.innerHTML = "";
    totalAPagar.innerHTML="";
    contenedorCarro.innerHTML += `
      <tr>
      <th scope="row"><p class="text-danger fw-bold fs-3">Carro Vacio</p></th>
      </tr>
     `;
  
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Tu compra fue procesada',
      text: "La recibiras en un plazo de 48 hrs",
      showConfirmButton: true,
    });
  }
});


/***********************************************************************************************************************
 Numero del carrito
 ****************************************************************************************************************/

function updateNumeroCarro(){
  let carroNumero = document.querySelector("#carroNumero");
  const cantidadArticulosCarro = carrito.reduce((acumulado, elemento)=> acumulado + elemento.cantidad, 0);
  if(cantidadArticulosCarro){
    carroNumero.textContent= cantidadArticulosCarro;
  }
  else{
    carroNumero.textContent="";
    
  }

}
updateNumeroCarro();





/************************************************************************************************************
 DARK MODE
 **********************************************************************************************************/ 


const btnDarkMode = document.querySelector("#btnDarkMode");

if (localStorage.getItem("mode")=== "light")
{
  body.className="light";
  btnDarkMode.innerHTML=`<p>Light Mode <i class="bi bi-toggle2-off"></i></p>`;
}

else if(localStorage.getItem("mode")=== "dark")
{
  body.className="dark";
  btnDarkMode.innerHTML= `<p>Dark Mode <i class="bi bi-toggle2-on"></i></p>`;
}
else{
  localStorage.setItem("mode","light")
  body.className="light";
  btnDarkMode.innerHTML=`<p>Light Mode <i class="bi bi-toggle2-off"></i></p>`;
}

btnDarkMode.addEventListener("click",()=>{
  
  if (localStorage.getItem("mode") === "light"){
    body.classList.replace("light","dark");
    btnDarkMode.innerHTML= `<p>Dark Mode <i class="bi bi-toggle2-on"></i></p>`;
    localStorage.setItem("mode","dark");
     
  }
  else{
    body.classList.replace("dark","light");
    btnDarkMode.innerHTML=`<p>Light Mode <i class="bi bi-toggle2-off"></i></p>`;
    localStorage.setItem("mode","light")

  }
});
//************************************************/





