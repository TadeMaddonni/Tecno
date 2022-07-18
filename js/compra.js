

// mostra compra

const  mostrarCompra  = () => {
    const tituloCompra = document.querySelector(".titleCompraPersonalizado");
    tituloCompra.innerHTML =`  <span class="nombreCompra">${userAlmacenado.nombre},</span> tu monto a pagar es de <span class="nombreCompra">$${total}</span>...`;

}

if(iniciado == true || iniciado == "true"){
    mostrarCompra();
}


