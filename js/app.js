
//Declaracion y descarga del carrito! 
let CARRITO =[];
CARRITO=JSON.parse(localStorage.getItem('carrito'));
let cartContainer = document.getElementById("contentContainer");

// console.log(CARRITO)


//Mostrar carrito
const mostrarCarrito = () => {

    CARRITO.forEach(prod => {
        
        let div = document.createElement("div");
        div.classList.add("productCartContainer")
        div.innerHTML = `
                            <div class="cartProductContainer">
                                <img class="cartProductImg" src=${prod.Img} alt="">
                                <p class="cartProductName">${prod.nombre}</p>
                            </div>
                            <div class="cartCantContainer">
                                <button class="cartCantBtn"> <svg class="cartCantIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                        </svg>
                                </button>
                                <span class="cartCant">${prod.cantidad}</span>
                                <button class="cartCantBtn">
                                    <svg class="cartCantIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
                                    </svg>
                                </button>
                            </div>

                            <div class="cartPriceContainer">
                                <p class="cartPrice">$${prod.precio}</p>
                            </div>
                        `

        cartContainer.appendChild(div);
    })
}

mostrarCarrito();

//Creando Cards dinámicas
const mostrarProductos = () => {

    const container = document.querySelector("#sectionProductos");

    PRODUCTOS.forEach(producto => {
        const DIV = document.createElement("div");
        DIV.classList.add("aurisProduct");
        DIV.innerHTML = `
                            <div class="aurisImg">
                                <img src=${producto.Img} alt=""
                            </div>
                            <div class="aurisTextContainer">
                                <p class="aurisDescription"> ${producto.nombre} </p>
                                <button class="agregar${producto.id} addToCartBtn">
                                    <svg class="aurisAddToCart" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </button>
                            </div>
                            <p class="aurisPrecio">$${producto.precio * producto.cantidad}</p>
                        `

        container.appendChild(DIV);

        const btnAgregarAlCarrito = document.querySelector(`.agregar${producto.id}`);

        btnAgregarAlCarrito.addEventListener('click', () => {
            agregarAlCarrito(producto.id);
            cartContainer.innerHTML= "";
            console.log(CARRITO);
            mostrarCarrito();
        });
    })
};

mostrarProductos();


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






