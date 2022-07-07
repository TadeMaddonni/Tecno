
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

// Obtenemos data de registro almacenada y la parseamos a objetos
let userAlmacenado = JSON.parse(localStorage.getItem('usuario')) ; 
console.log(userAlmacenado);
console.log(typeof userAlmacenado);     


// Variable global del usuario

//Obtención y almacenamiento de datos de registro

const registroForm = document.getElementById('formularioRegistro');
console.log(registroForm)

registroForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById("registroNombre").value; 
    const apellido = document.getElementById('registroApellido').value;
    const email = document.getElementById('registroEmail').value;
    const password = document.getElementById('registroPassword').value;


    let user1  = new usuarios (nombre, apellido, email, password);
    console.log(user1)

    cargarDataEnStorage('usuario', JSON.stringify(user1))
    
})


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

                            
        }else{
            const texto = document.querySelector('.emailError');
            texto.innerHTML =`<p class = "mensajeError">
                                El mail ingresado no es valido
                                </p>
                            `;
        }
    }) 
    passwordRegistro.addEventListener('blur',() => {
        if (passwordRegistro.value.length > 5){
            const texto = document.querySelector('.passwordError');
            texto.innerHTML =`<p class = "mensajeError">
                                La contraseña es valida
                                </p>`;

                            
        }else{
            const texto = document.querySelector('.passwordError');
            texto.innerHTML =`<p class = "mensajeError">
                                    Recorda tener al menos 6 caracteres
                                </p>
                            `;
        }
    }) 
    apellidoRegistro.addEventListener('blur',() => {
        if (apellidoRegistro.value.length > 0){
            const texto = document.querySelector('.surnameError');
            texto.innerHTML =`<p class = "mensajeError">
                                El apellido es valido
                                </p>`;

                            
        }else{
            const texto = document.querySelector('.surnameError');
            texto.innerHTML =`<p class = "mensajeError">
                                El apellido ingresado no es valido
                                </p>
                            `;
        }
    }) 
    nombreRegistro.addEventListener('blur',() => {
        if (nombreRegistro.value.length > 0){
            const texto = document.querySelector('.nameError');
            texto.innerHTML =`<p class = "mensajeError">
                                El nombre ingresado es valido
                                </p>`;

                            
        }else{
            const texto = document.querySelector('.nameError');
            texto.innerHTML =`<p class = "mensajeError">
                                El nombre ingresado no es valido
                                </p>
                            `;
        }
    });

// Validación LOG IN arranco el 8/7