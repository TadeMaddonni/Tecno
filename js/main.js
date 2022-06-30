
let product = "";
let price = 0;
let priceConIva = 0;
let agregarMas  = true;
let finalPrice = 0;
let otroIntento = false;
let productName = product;

const listaDeProductos = [];

const suma = (a,b) => {return a + b}; // función de suma
const resta = (a,b) => {return a - b}; //función de resta

const iva = (x) => {return x * 1.21}; // cálculo del IVA
const descuento = (a, b) => {return a * b /100}; // Calculo del descuento
let descuentoFinal = 0

function validarDatos (product, price){
    if(product == "" || isNaN(price)){ //Validación de productos y precios validos
        alert("error alguno de los datos ingresados son incorrectos");
        otroIntento = prompt("¿Desea volver a intentar? si/no ").toLowerCase(); //Confirmación antes de finalzar

        if (otroIntento == "si"){
            product = prompt("Ingresa el producto a agregar en la lista");
            price = Number(prompt("Ingrese el precio inicial del producto"));
        } else{
            alert("Programa finalzado");
        }
    }
}


// Función constructora de objetos

class productos {
    constructor (name, price,){
        this.nombre = name,
        this.precio = price
    }
}


    do {
        product = prompt("Ingresa el producto a agregar en la lista"); 
        price = Number(prompt("Ingrese el precio inicial del producto"));

        validarDatos(product,price);

        priceConIva = iva(price); //Cálculo del IVA

        let agregarDescuento = prompt("Desea agregarle un descuento al producto? si/no").toLowerCase();

        if(agregarDescuento == "si" ){
            agregarDescuento=true;
        }else{
                agregarDescuento=false;
                porcentajeDescuento=0;
            }
        
        if(agregarDescuento==true){ 
            let porcentajeDescuento = Number(prompt("Ingrese el porcentaje de descuento que desea agregar, del 1 al 100"));
            descuentoFinal =  descuento (price, porcentajeDescuento); // Cálculo para agregar descuento
        }


        finalPrice = resta(priceConIva, descuentoFinal); // Calculo del precio final
        
        // creando objeto y agregandolo al array
        productName = new productos(product, price);
        listaDeProductos.push(productName);


        //Imprimiendo el producto y el precio del mismo en la página
        alert(`${product} ha sido agregado a la lista con el precio de ${finalPrice}`);

        agregarMas=confirm("¿Desea agregar mas productos?"); // Confirmación para continuar la compra

        const nombresProductos = listaDeProductos.map(products => products.nombre);

        if (agregarMas==false){
            alert(`Hasta aqui llego la carga de stock`);
            console.log(`------Hasta aqui llegó la carga de stock------`);
            console.log(listaDeProductos);
            console.log(nombresProductos);     
            alert(`
                Se agregaron correctamente los siguientes productos:
                ${nombresProductos};
            `)
        }

        descuentoFinal=0;
        

    } while (agregarMas);

    let limitePrecio = 0;

    let filtrarPorPrecio = confirm("¿Desea filtrar por precio?");
    if (filtrarPorPrecio == true){
        limitePrecio = Number(prompt("Ingrese el precio maximo"));
        filtrar();
    }



    // Función de filtrado
    function filtrar (){
        const filtroPrecio =  listaDeProductos.filter( el => el.precio <= limitePrecio);
        console.log(filtroPrecio);
        
        const preciosFiltrados = filtroPrecio.map(el => el.nombre);
        alert(`
                Los productos con precio menor a $${limitePrecio} son los siguientes:
                ${preciosFiltrados}
        `);
    }

