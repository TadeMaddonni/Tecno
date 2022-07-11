
let iniciado 

iniciado=sessionStorage.getItem('iniciado');  


// Funciones 
class usuarios {
    constructor(nombre, apellido, email, password) {
            this.nombre = nombre,
            this.apellido = apellido,
            this.email = email,
            this.password = password;
    }
}

const cargarDataEnStorage = (key,value) => {
    localStorage.setItem(key,value);
}

const cargarDataEnSessionStorage = (key,value) => {
    sessionStorage.setItem(key,value);
}

const usuarioIniciado = () => {
    
    iniciado=sessionStorage.getItem('iniciado');  
    if(iniciado == "true" || iniciado == true){
        
        const iniciadoBtn = document.querySelector(".loggedInBtn");
        iniciadoBtn.setAttribute('style', 'display: inline;');

        const btnSignUp= document.getElementById("signUpBtn")
        btnSignUp.setAttribute('style', 'display: none;');
        
        const btnLogIn = document.getElementById("logInBtn")
        btnLogIn.setAttribute('style', 'display: none;');
    } 
}

usuarioIniciado();


// Variable  y fucnción de iniciado 




// Creación de variables para la validacion del registro

nombreRegistroValido = false;
apellidoRegistroValido = false;
emailRegistroValido = false;
passwordRegistroValido = false;




// Obtenemos data de registro almacenada y la parseamos a objetos
let userAlmacenado = JSON.parse(localStorage.getItem('usuario')); 




// Validación de campos 
const nombreRegistro = document.getElementById("registroNombre"); 
const apellidoRegistro = document.getElementById('registroApellido');
const emailRegistro = document.getElementById('registroEmail');
const passwordRegistro = document.getElementById('registroPassword');


    emailRegistro.addEventListener('blur',() => {
        if (emailRegistro.value.length > 0 && emailRegistro.value.includes("@") && emailRegistro.value.includes(".com")){
            const texto = document.querySelector('.emailError');
            texto.innerHTML =`<p class = "mensajeError">
                                El mail es valido
                                </p>`;
            emailRegistroValido=true

                            
        }else{
            const texto = document.querySelector('.emailError');
            texto.innerHTML =`<p class = "mensajeError">
                                El mail ingresado no es valido
                                </p>
                            `;
            emailRegistroValido=false
        }
    }) 
    passwordRegistro.addEventListener('blur',() => {
        if (passwordRegistro.value.length > 5){
            const texto = document.querySelector('.passwordError');
            texto.innerHTML =`<p class = "mensajeError">
                                La contraseña es valida
                                </p>`;

        passwordRegistroValido = true;
                            
        }else{
            const texto = document.querySelector('.passwordError');
            texto.innerHTML =`<p class = "mensajeError">
                                    Recorda tener al menos 6 caracteres
                                </p>
                            `;
            passwordRegistroValido =false;
                        
        }
    }) 
    apellidoRegistro.addEventListener('blur',() => {
        if (apellidoRegistro.value.length > 0){
            const texto = document.querySelector('.surnameError');
            texto.innerHTML =`<p class = "mensajeError">
                                El apellido es valido
                                </p>`;
            apellidoRegistroValido = true
                            
        }else{
            const texto = document.querySelector('.surnameError');
            texto.innerHTML =`<p class = "mensajeError">
                                El apellido ingresado no es valido
                                </p>
                            `;
            apellidoRegistroValido = false
        }
    }) 
    nombreRegistro.addEventListener('blur',() => {
        if (nombreRegistro.value.length > 0){
            const texto = document.querySelector('.nameError');
            texto.innerHTML =`<p class = "mensajeError">
                                El nombre ingresado es valido
                                </p>`;
            nombreRegistroValido = true

                            
        }else{
            const texto = document.querySelector('.nameError');
            texto.innerHTML =`<p class = "mensajeError">
                                El nombre ingresado no es valido
                                </p>
                            `;
        nombreRegistroValido = false; 
                        }
    });


// Validación para registrarse 

const registroForm = document.getElementById('formularioRegistro');

const validarIngreso = (nombre, apellido, email, password) => {
    if(nombreRegistroValido === true && apellidoRegistroValido === true && emailRegistroValido === true && passwordRegistroValido === true){
        let user1 = new usuarios (nombre, apellido, email, password); 
        cargarDataEnStorage('usuario', JSON.stringify(user1));
        swal("Usuario creado correctamente", "Bienvenido/a a TecnoArg!", "success");
    }else{
        swal("No se ha podido crear el usuario", "Algunos de los datos no es correcto, vuelva a intentarlo!");
    }
}

registroForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById("registroNombre").value; 
    const apellido = document.getElementById('registroApellido').value;
    const email = document.getElementById('registroEmail').value;
    const password = document.getElementById('registroPassword').value;

    validarIngreso(nombre, apellido, email, password);
    registroForm.reset(); 
    window.location.reload();
    userAlmacenado = JSON.parse(localStorage.getItem('usuario')); 
})


// Validación LOG IN arranco el 8/7

const inicioForm = document.getElementById("inicioForm");
console.log(inicioForm);

let incioEmail = document.getElementsByClassName('inicioEmail');
let incioNombre = document.getElementsByClassName('inicioNombre');

inicioForm.addEventListener('submit', (e) =>{

    e.preventDefault();

    const email = document.getElementById('inicioEmail'); 
    const password = document.getElementById('incioPassword'); 
    console.log(password, email)

    let emailAlmacenado = userAlmacenado.email;
    let passwordAlmacenado = userAlmacenado.password; 


    console.log(emailAlmacenado, passwordAlmacenado, email.value, password.value)

    if( password.value == passwordAlmacenado && email.value == emailAlmacenado){
        swal("Te extrañamos!", "Gracias por iniciar sesión en TecnoArg", "success");
        iniciado = true;
        cargarDataEnSessionStorage('iniciado', iniciado);
        usuarioIniciado();
    } else{
        swal('Credenciales incorrectas', "Alguno de los datos ingresados no coincide!");
        cargarDataEnSessionStorage('iniciado', iniciado);
    }

    inicioForm.reset();
    

})






// Apartado individual (Usuario ya iniciado)

let mensajeIndividual = document.querySelector(".mensajePersonalizado");

mensajeIndividual.innerText = `Hola!, ${userAlmacenado.nombre}`

mensajeIndividual.classList.add("dropdown-item");


let dataSeccion = document.querySelector(".infoDataContainer");

// Imprimiendo datos

dataSeccion.innerHTML=`

                        <div class="separadorInfo">
                        <p class="dataInfo dataInfoTitle"> Nombre: <p class="dataInfo">${userAlmacenado.nombre}</p></p>
                        </div>

                        <div class="separadorInfo">
                        <p class="dataInfo dataInfoTitle"> Apellido: <p class="dataInfo">${userAlmacenado.apellido}</p></p>
                        </div>

                        <div class="separadorInfo">
                        <p class="dataInfo dataInfoTitle"> Email: <p class="dataInfo">${userAlmacenado.email}</p></p>
                        </div>

                        `


// Cerrar sesión btn

let cerrarSesionBtn = document.querySelector(".cerrarSesion");

const cerrarSesion = () => {
    iniciado=false;
    cargarDataEnSessionStorage('iniciado', iniciado);
    usuarioIniciado();
    window.location.reload();
}
cerrarSesionBtn.addEventListener('click', cerrarSesion);



