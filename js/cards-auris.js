// Obtención de la "base de datos" del JSON
const getData = async () => {
    const response = await fetch('../js/data.json')
    const data = await response.json();

    return data;
}
// Función para renderizar los productos en el DOM
const mostrarProductos =  async () => {

    // Captura del elemento padre
    const container = document.querySelector("#sectionProductos");

    //Creación del array de productos obtenido con getData
    const productos =  await getData();

    // Filtrado del array para la obtención de solo auriculares
    const auris = productos.filter(product => product.tipo == "auris")

    // Renderizado en el DOM de los productos filtrados
    auris.forEach(producto => {
        

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
                            <p class="aurisPrecio">$${producto.precio}</p>
                        `

        container.appendChild(DIV);

        const btnAgregarAlCarrito = document.querySelector(`.agregar${producto.id}`);

        btnAgregarAlCarrito.addEventListener('click', () => {
            agregarAlCarrito(producto.id, productos);
            cartContainer.innerHTML= "";
            // console.log(CARRITO);
            mostrarCarrito();
        });
    })
};

// Llamada a la función 
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();

});