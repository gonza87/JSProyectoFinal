class Producto{
    constructor(id, marca, modelo,precio,stock,imagen){
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
    }
}
//Array de productos
const productos = [];

//Creo productos
const producto1 = new Producto(1,"OCEAN","FARKING",45,true,"./img/01.jpg");
const producto2 = new Producto(2,"LOST","PUDDLE JUMPER",850,true,"./img/02.jpg");
const producto3 = new Producto(3,"SLATER","FCSII",125,true,"./img/03.jpg");
const producto4 = new Producto(4,"JOHN FLORENCE","ROUND PRO",49.50,true,"./img/04.jpg");
const producto5 = new Producto(5,"O'NEILL","HYPERFREAK",449,true,"./img/05.jpg");
const producto6 = new Producto(6,"CHANNEL","ISLANDS G",854,true,"./img/06.jpg");
const producto7 = new Producto(7,"VISSLA","SEAS",299,true,"./img/07.jpg");
const producto8 = new Producto(8,"CREATURES","RELIANCE",54,true,"./img/08.jpg");

//Agrego productos a array productos
productos.push(producto1,producto2,producto3,producto4,producto5,producto6,producto7,producto8);
