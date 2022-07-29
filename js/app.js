
//Declaracion y descarga del carrito! 
let CARRITO =[];
CARRITO=JSON.parse(localStorage.getItem('carrito')) || [];
let cartContainer = document.getElementById("contentContainer");

// Creacion variable total

let total = 0

// Contador del total del carrito
const contarTotal = () =>{
    total = 0
    for (producto of CARRITO){
        total += producto.precio * producto.cantidad
    }
}

//Funcion para renderizar el carrito en el DOM
const mostrarCarrito = () => {
    cartContainer.innerHTML="";
    contarTotal();
    CARRITO.forEach(prod => {
        let precioFinal = prod.cantidad * prod.precio; 
        let div = document.createElement("div");
        div.classList.add("productCartContainer")
        div.innerHTML = `
                            <div class="cartProductContainer">
                                <img class="cartProductImg" src=${prod.Img} alt="">
                                <p class="cartProductName">${prod.nombre}</p>
                            </div>
                            <div class="cartCantContainer">
                                <button class="cartCantBtn addCantBtn" value="${prod.id}">
                                    <svg class="cartCantIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                    </svg>
                                </button>
                                <span class="cartCant">${prod.cantidad}</span>
                                <button class="cartCantBtn reduceCantBtn" value="${prod.id}">
                                    <svg class="cartCantIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
                                    </svg>
                                </button>
                            </div>

                            <div class="cartPriceContainer">
                                <p class="cartPrice">$${precioFinal}</p>
                            </div>
                        `

        cartContainer.appendChild(div);
    })
}

if(CARRITO != []){
    mostrarCarrito(); 
}






//Funcion para encontar el elemento y agregarlo al carrito. 
const agregarAlCarrito = (productoId, array) => {

    const item = array.find((prod) => prod.id === productoId);
    const itemEnCarrito = CARRITO.find((prod) => prod.id === productoId);

    (itemEnCarrito) ? itemEnCarrito.cantidad++ : CARRITO.push(item);
    cargarEnStorage("carrito", JSON.stringify(CARRITO));

    Toastify({
        text: "Producto agregado con éxito",
        duration: 1500,
        close: true,
        gravity: "bottom", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "#7B68EC",
            color:"#fff"
        },
    }).showToast();
}


//Función para vaciar el carrito
function vaciarCarrito () {

    CARRITO = [];
    cartContainer.innerHTML= "";
    cargarEnStorage('carrito', JSON.stringify(CARRITO))
    mostrarCarrito();
    Toastify({
        text: "El carrito ha sido vaciado!",
        duration: 1500,
        close: true,
        gravity: "bottom",
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "#7B68EC",
            color:"#fff"
        },
    }).showToast();
}

// Función de subida a storage
const cargarEnStorage = (key,value) => {
    localStorage.setItem(key,value);
}


// Captura de elementos para la modificación  de cantidades en el carrito
const container = document.querySelector("#exampleModal2");

container.addEventListener("click", (e) => {
    if (e.target.parentElement.parentElement.classList.contains("addCantBtn")) {
        aumentarCantidadProducto(parseInt(e.target.parentElement.parentElement.value));
    }

    if (e.target.parentElement.parentElement.classList.contains("reduceCantBtn")) {
        disminuirCantidadProducto(parseInt(e.target.parentElement.parentElement.value));
    }
})

// Funcion para aumentar la cantidad del producto en el carrito
const aumentarCantidadProducto = (id) => {

    let productoEnCarrito = CARRITO.find((prod) => prod.id === id)
    productoEnCarrito.cantidad++
    cargarEnStorage('carrito',JSON.stringify(CARRITO))
    mostrarCarrito();
}

// Funcion para disminuir la cantidad del producto en el carrito
const disminuirCantidadProducto = (id) => {

    let productoEnCarrito = CARRITO.find((prod) => prod.id === id)

    if(productoEnCarrito.cantidad > 1){
        productoEnCarrito.cantidad--;
        cargarEnStorage('carrito',JSON.stringify(CARRITO))
        mostrarCarrito()

    }else{
        CARRITO.splice(CARRITO.indexOf(productoEnCarrito), 1);
        swal("Producto Eliminado", "Producto retirado del carrito con éxito", "success")
        cargarEnStorage('carrito',JSON.stringify(CARRITO))
        mostrarCarrito();
    }

}


// Función para acceder a la página de compra
const realizarCompra = () => {
    (iniciado == true && total != 0 || iniciado == "true" && total != 0) ? window.location.replace("../pages/compra.html") : swal(
                                                                                                        "No es posible realizar al compra",

                                                                                                        `Debes tener una cuenta, luego iniciar sesión con la misma y haber seleccionado algun producto para poder realizar compras
                                                                                                        
                                                                                                        Att: TecnoArg`
                                                                                                        )
}  

// Captura del boton de comprar y asignamientod e la funcion realizarCompra
const btnComprar = document.querySelector(".btnComprar");
btnComprar.addEventListener('click', realizarCompra);
