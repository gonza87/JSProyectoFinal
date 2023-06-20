class Producto{
    constructor(id, categoria, marca, modelo,precio,cantidad,imagen){
        this.id = id;
        this.categoria = categoria;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.cantidad = cantidad;
        this.imagen = imagen;
    }
}
//Array de productos
const productos = [];

//Creo productos
const producto1 = new Producto(1,"accesorios","OCEAN","FARKING",45,1,"./img/01.jpg");
const producto2 = new Producto(2,"tablas","LOST","PUDDLE JUMPER",850,1,"./img/02.jpg");
const producto3 = new Producto(3,"accesorios","SLATER","FCSII",125,1,"./img/03.jpg");
const producto4 = new Producto(4,"accesorios","JOHN FLORENCE","ROUND PRO",49.50,1,"./img/04.jpg");
const producto5 = new Producto(5,"trajes","O'NEILL","HYPERFREAK",449,1,"./img/05.jpg");
const producto6 = new Producto(6,"tablas","CHANNEL","ISLANDS G",854,1,"./img/06.jpg");
const producto7 = new Producto(7,"trajes","VISSLA","SEAS",299,1,"./img/07.jpg");
const producto8 = new Producto(8,"accesorios","CREATURES","RELIANCE",54,1,"./img/08.jpg");

//Agrego productos a array productos
productos.push(producto1,producto2,producto3,producto4,producto5,producto6,producto7,producto8);

