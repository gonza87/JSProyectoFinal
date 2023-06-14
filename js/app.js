
console.table(productos);

const contenedorProductos = document.querySelector("#misProductos");


function renderizarProductos (list){
    for (producto of productos){
        contenedorProductos.innerHTML += `
        <div class="card col-6 m-1" style="width: 15rem">
        <img src="${producto.imagen}" class="card-img-top" alt="producto" />
        <div class="card-body">
          <h5 class="card-title">US$ ${producto.precio}</h5>
          <p class="card-text">
            ${producto.marca} - ${producto.modelo}
          </p>
          <a href="#" class="btn btn-primary text-center">Comprar</a>
        </div>
        </div> 
        `;
    }
}

renderizarProductos(productos);


const body = document.body;
const btnDarkMode = document.querySelector("#btnDarkMode");

if (localStorage.getItem("mode")=== "light")
{
  body.className="light";
  btnDarkMode.textContent="Dark Mode";
}

else{
  body.className="dark";
  btnDarkMode.textContent="Light Mode";
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













{/* <div class="card" style="width: 18rem">
<img src="..." class="card-img-top" alt="..." />
<div class="card-body">
  <h5 class="card-title">Card title</h5>
  <p class="card-text">
    Some quick example text to build on the card title and make up the
    bulk of the card's content.
  </p>
  <a href="#" class="btn btn-primary text-center">Comprar</a>
</div>
</div> */}
















// class Tabla{
//     constructor(id, marca, modelo, medida, color, precio, stock){
//         this.id = id;
//         this.marca = marca;
//         this.modelo = modelo;
//         this.medida = medida;
//         this.color = color;
//         this.precio = precio;
//         this.stock = stock;

//     }
// }
// //creo los objetos
// const tabla1 = new Tabla(01,"Lost","Light Speed","6.2","blanca", 840, true);
// const tabla2 = new Tabla(02,"Lost","Puddle Jumper","6.1","blanca", 850, false);
// const tabla3 = new Tabla(03,"Fireware","Frk","6.2","blanca", 855, true);
// const tabla4 = new Tabla(04,"Fireware","Hydroshort","6.2","blanca", 845, true);

// //array de tablas
// const listaTablas = [];
// //agrego los objetos al array
// listaTablas.push(tabla1,tabla2,tabla3,tabla4);


// let totalArticulos = 0;//acumulo el monto total

// let nameUser = prompt("Ingresa tu Nombre");
// while(nameUser.trim() === ""){
//     alert("Usuario invalido");
//     nameUser = prompt("Ingresa tu Nombre");
// }

// alert("Bienvenido "+nameUser+"!!!")
// let ingresar = prompt("Desea Ingresar al menú de Tablas?\n *S/si* o *N/no*")
// if(ingresar === "s" || ingresar ==="S"){
//     ingresar = true;
    
// }
// else{
//     ingresar = false;
    
// }



//  while(ingresar){
   
//      let opcion = parseInt(prompt("Menú de Tablas\n"+"1-Listar Tablas por precio\n"+"2-Comprobar Stock\n"+"3-Agregar al Carrito\n"+
//       "4-Ordenar de Menor a Mayor Precio\n"+"5-Total\n"+"0-Salir"));
//     switch(opcion)
//         {
//          case 1:
//              let precio  = parseInt(prompt("Ingrese precio máximo"))
//              if (isNaN(precio) || precio <=0)
//                 alert("Debe ingresar un precio valido");
//             else{
//                 const filtro = filtrarPrecio(precio);
//                 console.table(filtro);
//             }
//             break;

//          case 2:
//              console.table(filtrarPorStock());
//              break;

//          case 3:
//              let idtabla = parseInt(prompt("Ingrese el id de la tabla"))
//              sumarPrecios(listaTablas, idtabla);
//              break;
         
//          case 4:
//              precioMenorAMayor(listaTablas);
//              console.table(listaTablas);    
//              break;
        
//          case 5:
//              alert("Total a Pagar: "+totalArticulos)
//              break;
       
//          case 0:
//             ingresar = false;
//             break;
        
//          default:
//             alert("Error- Opcion Invalida");
//             break;

//      }

    
//  }
//  //Declaracion de funciones

//  function filtrarPrecio(precio){
//     const filtrados = listaTablas.filter((tabla)=>tabla.precio <= precio);
//     return filtrados;
//  }

//  function filtrarPorStock(){
//     const filtradosStock = listaTablas.filter((tabla)=>tabla.stock === true);
//     return filtradosStock;

//  }

//  function sumarPrecios(listaTablas,id){
//     if (isNaN(id)){
//             alert("Dede ser un id valido");
//     }
//     else{
//         for (lista of listaTablas){
//             if(lista.id === id)
//             totalArticulos = totalArticulos + lista.precio;
//         }
//     }
    
//     return totalArticulos;
//  }

// function precioMenorAMayor(list){
//     list.sort((a, b)  => a.precio - b.precio);
//     return list;
// }
