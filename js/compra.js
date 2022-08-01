
// Configuarción de Luxon
let DateTime = luxon.DateTime;

// Función para renderizar la seccion de compra
const  mostrarCompra  = () => {
    const tituloCompra = document.querySelector(".titleCompraPersonalizado");
    tituloCompra.innerHTML =`  <span class="nombreCompra">${userAlmacenado.nombre},</span> tu monto a pagar es de <span class="nombreCompra">$${total}</span>...`;
}

// Validación previa al renderizadp
if(iniciado == true || iniciado == "true"){
    mostrarCompra();
}

// Obtención de la fecha actual para futuro uso
const fechaDeHoy = DateTime.now().toISODate()
console.log(fechaDeHoy)

//Captura de formularios para validar
const formVisa = document.querySelector("#formVisa");
console.log(formVisa)

const formMaster = document.querySelector("#formMaster");
console.log(formMaster)

// Generación de variable para la validación final
let compraValida = false;

// Validación método de pago VISA
formVisa.addEventListener('submit', (e) => {

    e.preventDefault();

    // Captura de respuestas
    const numeroTarjeta = document.querySelector(".numeroTarjeta").value;
    const nombreTarjeta = document.querySelector(".nombreTarjeta").value;
    const apellidoTarjeta = document.querySelector(".apellidoTarjeta").value; 
    const fechaVencimientoTarjeta = document.querySelector(".fechaVencimientoTarjeta").value;
    const cvvTarjeta = document.querySelector(".cvvTarjeta").value;
    
    //Variables de validación por datos
    let nombreValido = false;
    let apellidoValido = false;
    let fechaVtoValida=false;
    let numeroValido=false;
    let cvvValido =false; 

    // Validación nombre ingresado
    if (nombreTarjeta.length > 0 ) {
        nombreValido = true;
    }

    // Validacion apellido ingresado
    if(apellidoTarjeta.length > 0 ) {
        apellidoValido = true;
    }

    //Validacion numero tarjeta ingresado (Segun google los numeros de tarjeta pueden variar entre 15 y 19 digitos)
    if(numeroTarjeta.length > 14 && numeroTarjeta.length < 20 && isNaN(cvvTarjeta) == false){
        numeroValido= true;
    }

    //Validacion Codigo de seguridad (CVV) ingresado
    if(cvvTarjeta.length === 3 && isNaN(cvvTarjeta) == false){
        cvvValido=true;
    }

    //Validacion fecha de vencimiento de la tarjeta ingresada
    let fechaVenc = DateTime.fromISO(fechaVencimientoTarjeta);
    let fechaHoy = DateTime.fromISO(fechaDeHoy);
    let diffInDaysCalc = fechaVenc.diff(fechaHoy, 'days');
    let diffInDays = diffInDaysCalc.toObject().days; 

    if(diffInDays > 0){ // Si la diferencia de fechas es al menos un dia mas, la tarjeta es valida
        fechaVtoValida = true;
    }
    
    // Validación final de compra comparando todos los datos
    if(cvvValido && fechaVtoValida && apellidoValido && nombreValido){ 
        compraValida = true
    }

    // Instrucciones finales, tanto si la compra es valida o no
    if(compraValida){
        swal.fire({
            title: "Tarjeta aceptada",
            text: "La tarjeta ha sido aceptada",
            icon:"success",
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            showCancelButton: true, 
            confirmButtonText: "Ir a envios",
            cancelButtonText: "cancelar",
            background: "#fff",
            color: "#7B68EC",
        }).then((result) => {
            if(result.isConfirmed){
                window.location.replace("../pages/envio.html")
            }
        })

    }else{
        swal({
            title: "Tarjeta rechazada",
            text: "Chequee que los datos ingresados sean correctos",
            icon:"error",
            timer:2000, 
            background: "#fff",
            color: "#7B68EC",
        });
    }
})

// Validacion formulario método de pago MasterCard
formMaster.addEventListener('submit', (e) => {

    e.preventDefault();

    // Captura de valores ingresados
    const numeroTarjeta = document.querySelector(".numeroTarjetaMaster").value;
    const nombreTarjeta = document.querySelector(".nombreTarjetaMaster").value;
    const apellidoTarjeta = document.querySelector(".apellidoTarjetaMaster").value; 
    const fechaVencimientoTarjeta = document.querySelector(".fechaVencimientoTarjetaMaster").value;
    const cvvTarjeta = document.querySelector(".cvvTarjetaMaster").value;
    
    // Variables de validación individual
    let nombreValido = false;
    let apellidoValido = false;
    let fechaVtoValida=false;
    let numeroValido=false;
    let cvvValido =false; 

    // Validacion nombre tarjeta ingresado
    if (nombreTarjeta.length > 0 ) {
        nombreValido = true;
    }

    // Validacion apellido tarjeta ingresado
    if(apellidoTarjeta.length > 0 ) {
        apellidoValido = true;
    }

    //Validacion numero tarjeta ingresado(Segun google los numeros de tarjeta pueden variar entre 15 y 19 digitos)
    if(numeroTarjeta.length > 14 && numeroTarjeta.length < 20 && isNaN(cvvTarjeta) == false){
        numeroValido= true;
    }

    //Validacion Codigo de seguridad (CVV) ingresado
    if(cvvTarjeta.length === 3 && isNaN(cvvTarjeta) == false){
        cvvValido=true;
    }

    //Validacion fecha de vencimiento tarjeta ingresado
    let fechaVenc = DateTime.fromISO(fechaVencimientoTarjeta);
    let fechaHoy = DateTime.fromISO(fechaDeHoy);
    let diffInDaysCalc = fechaVenc.diff(fechaHoy, 'days');
    let diffInDays = diffInDaysCalc.toObject().days; 

    if(diffInDays > 0){ // Si la diferencai de dias es mayor a uno, la tarjeta es valida
        fechaVtoValida = true;
    }
    

    // Validación final de compra 
    if(cvvValido && fechaVtoValida && apellidoValido && nombreValido){ 
        compraValida = true
    }

    // Instrucciones de compra finales, tanto si es valida o no
    if(compraValida){
        swal.fire({
            title: "Tarjeta aceptada",
            text: "La tarjeta ha sido aceptada",
            icon:"success",
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            // timer:1000,
            showCancelButton: true, 
            confirmButtonText: "Ir a envios",
            cancelButtonText: "cancelar"
        }).then((result) => {
            if(result.isConfirmed){
                window.location.replace("../pages/envio.html")
            }
        })

    }else{
        swal({
            title: "Tarjeta rechazada",
            text: "Chequee que los datos ingresados sean correctos",
            icon:"error",
            timer:2000, 
            
        });
    }
})

