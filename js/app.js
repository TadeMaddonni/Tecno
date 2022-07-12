
//Declaracion y descarga del carrito! 
let CARRITO =[];
CARRITO=JSON.parse(localStorage.getItem('carrito'));
let cartContainer = document.getElementById("contentContainer");

// console.log(CARRITO)


//Mostrar carrito
const mostrarCarrito = () => {

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

mostrarCarrito();


// Comprar

const realizarCompra = () => {
    if(iniciado == true || iniciado == "true"){
        // Falta determinar como seguir
        window.location.replace("../pages/compra.html")
    } else{
        swal(
        "No es posible realizar al compra",

        `Debes tener una cuenta e iniciar sesión con la misma para poder realizar compras
        
        Att: TecnoArg`
        )
    }
}



//Agregar producto al carrito y almacenarlo en Storage
const agregarAlCarrito = (productoId) => {

    const item = PRODUCTOS.find((prod) => prod.id === productoId);
    const itemEnCarrito = CARRITO.find((prod) => prod.id === productoId);

    if(itemEnCarrito){
        itemEnCarrito.cantidad++;
        console.log(CARRITO);
    } else{
        CARRITO.push(item);
    }
    cargarEnStorage("carrito", JSON.stringify(CARRITO));
}


//Vaciar carrito function
function vaciarCarrito () {
    CARRITO = [];
    cartContainer.innerHTML= "";
    cargarEnStorage=localStorage.setItem('carrito', JSON.stringify(CARRITO));
    mostrarCarrito();
}

// Subida a storage
const cargarEnStorage = (key,value) => {
    localStorage.setItem(key,value);
}


const container = document.querySelector("#exampleModal2");

container.addEventListener("click", (e) => {
    if (e.target.parentElement.parentElement.classList.contains("addCantBtn")) {
        aumentarCantidadProducto(e.target.parentElement.parentElement.value);
    }

    if (e.target.parentElement.parentElement.classList.contains("reduceCantBtn")) {
        disminuirCantidadProducto(e.target.parentElement.parentElement.value);
    }
})

const aumentarCantidadProducto = (id) => {

    let itemId = Number(id);
    let itemCarrito = CARRITO.find((prod) => prod.id === itemId);

    itemCarrito.cantidad++;
    cartContainer.innerHTML = "";
    mostrarCarrito();
    cargarEnStorage('carrito',JSON.stringify(CARRITO));
    
    console.log(itemCarrito)
}

const disminuirCantidadProducto = (id) => {
    let itemId = Number(id);
    let itemCarrito = CARRITO.find((prod) => prod.id === itemId);

    if(itemCarrito.cantidad == 1){
        let eliminarProducto = swal("Producto Eliminado", "Producto retirado del carrito con éxito", "success");

        if(eliminarProducto){
            itemCarrito.cantidad--;
            CARRITO.splice(itemCarrito, 1);
            cartContainer.innerHTML = "";
            mostrarCarrito();
            cargarEnStorage('carrito', JSON.stringify(CARRITO));
        } 
    } else{
        itemCarrito.cantidad--;
        cartContainer.innerHTML = "";
        mostrarCarrito();
        cargarEnStorage('carrito', JSON.stringify(CARRITO));
    }
}


// Btn Comprar del carrito  

const btnComprar = document.querySelector(".btnComprar");



btnComprar.addEventListener('click', realizarCompra);

