// Capturando elementos del DOM
const envioForm = document.querySelector("#envioForm")
const direccionEnvio = document.querySelector(".direccionEnvio");
const codigoPostal = document.querySelector(".codigoPostal" );

//Variables de validación
let direccionValida = false;
let codigoPostalValido  = false;

// Validación especifica del campo de direccion de envio
direccionEnvio.addEventListener('blur', () =>{
    if(direccionEnvio.value.length > 5 ){
        direccionValida = true; 
        const mensajeErrorCodigo = document.querySelector(".mensajePersonalizadoDireccion")
        mensajeErrorCodigo.innerHTML= `
                                        <P class = "mensajeError"> Direccion valida</P>
                                        `
    }else{
        const mensajeErrorCodigo = document.querySelector(".mensajePersonalizadoDireccion")
        mensajeErrorCodigo.innerHTML= `
                                        <P class = "mensajeError"> Direccion no valida</P>
                                        `
    }
})

// Validación especifica del campo de código postal
codigoPostal.addEventListener('blur', () =>{

    if( codigoPostal.value.length > 3){
        codigoPostalValido= true;
        
    }else{
        const mensajeErrorCodigo = document.querySelector(".mensajePersonalizadoCodigo")
        mensajeErrorCodigo.innerHTML= `
                                        <P class = "mensajeError"> Codigo postal no valido</P>
                                        `
    }
})

// Validación del formulario de envio y creación de posibles salidas al ser enviado
envioForm.addEventListener("submit",(e) => {
    e.preventDefault();

    if(codigoPostalValido == true && direccionValida == true){
        swal.fire({
            icon:"success",
            title:"Direccion guardada",
            text: `En los proximos 5 dias habiles recibiras el paquete en ${direccionEnvio.value}`,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            showCancelButton: true, 
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
        }).then( (result) => {
            if(result.isConfirmed){
                window.location.replace("../index.html")
                vaciarCarrito()
            }
        })
        envioForm.reset();
    }else{
        swal.fire({
            icon:"error",
            title:"Direccion incorrecta",
            text: `no ha sido posible encontrar la dirección, por favor revise los datos`,

        })
        envioForm.reset();
    }
}) 