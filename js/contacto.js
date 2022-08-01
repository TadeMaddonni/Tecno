// Captura del formulario de contacto
const contactoForm = document.querySelector('.contactoForm');
console.log(contactoForm);

//Variable de validación final
let formVaalido = false; 

// Validacion de formulario al ser enviado
contactoForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const nombreIngresado = document.querySelector('.contactoNombre').value;
    const apellidoIngresado = document.querySelector('.contactoApellido').value;
    const emailIngresado = document.querySelector('.contactoEmail').value;
    const consultaIngresada = document.querySelector('.contactoConsulta').value;

    console.log(nombreIngresado, apellidoIngresado, emailIngresado, consultaIngresada);

    let nombreValido = false;
    let apellidoValido = false;
    let emailValido = false;
    let consultaValido = false;

    // Si el usuario inicio sesión pasa una determinada alerta si no  se activa la otra
    if(iniciado == true || iniciado == "true"){ 
        if(nombreIngresado.length > 1){
            nombreValido = true;
        }

        if(apellidoIngresado.length >1){
            apellidoValido = true;
        }
        
        if(emailIngresado.length > 9 && emailIngresado.includes("@") && emailIngresado.includes(".com")){
            emailValido = true;
        }

        if(consultaIngresada.length >  10 && consultaIngresada.includes("?")){
            consultaValido = true;
        }


        if(emailValido == true && nombreValido == true && apellidoValido == true && consultaValido == true ){
            formVaalido = true
        }

        Swal.fire({
            title: "Consulta enviada",
            text: `La consulta fue correctamete enviada ${nombreIngresado}, recibiras una respuesta en ${emailIngresado} a la brevedad
                    Atentamente TecnoArg `, 
            icon: "success",
            showClass: {
                popup: 'animate__animated animate__fadeInDownBig'
            },
            background: "#fff",
            color: "#7B68EC"
        })
        contactoForm.reset();

    }else{
        Swal.fire({
            title: "No has iniciado sesión",
            text: "Debes crearte una cuenta y permanecer iniciado/a en ella para poder enviar una consulta",
            icon: "error",
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            background: "#fff",
            color: "#7B68EC"
        })
        contactoForm.reset();
    }
})  