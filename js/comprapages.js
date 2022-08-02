
// Función para acceder a la página de compra
const realizarCompra = () => {
    (iniciado == true && total != 0 || iniciado == "true" && total != 0) ? window.location.replace("../pages/compra.html") : swal.fire({

                                                                                                                                title:"No es posible realizar al compra",
                                                                                                                                text:`Debes tener una cuenta, luego iniciar sesión con la misma y haber seleccionado algun producto para poder realizar compras
                                                                                                                                                                                                                                
                                                                                                                                        Att: TecnoArg`,
                                                                                                                                icon:"error",
                                                                                                                                background: "#fff",
                                                                                                                                color: "#7B68EC",
                                                                                                                            })
}  

// Captura del boton de comprar y asignamientod e la funcion realizarCompra
const btnComprar = document.querySelector(".btnComprar");
btnComprar.addEventListener('click', realizarCompra);
