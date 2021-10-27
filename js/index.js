/*
REQUERIMIENTOS
- utilizar el formulario para captar el texto ingresado

- implmentar el evento "submit", utilizarlo para guardar el comentario en un array

- cada vez que se agrega un nuevo comentario renderizarlo en una etiqueta "p"(sacar del html los hardcodeados y hacerlo dinamico)

- constantemente guardar la informacion en localStorage, si se recarga la pagina deberian mantenerse los comentarios
*/

// capturo el formulario
let formulario = document.forms[0];

// capturo el input de los comentarios 
let inputComentario = document.querySelector("#comentario")


// let comentarios = [];

// capturo el contenedor de los comentarios 
let contenedorComentarios = document.querySelector('.comentarios')


let contenedorTodosComentarios = document.querySelectorAll('.parrafo')
// capturo boton eliminar

// obtengo los comentarios guardados en el localstorage 
let comentariosGuardados = obtenerComentarios();

// renderizo todos los comentarios existentes en el local storage 
renderizarComentarios(comentariosGuardados)


//Luego de renderizar capturo todos los botones de eliminar
let botonEliminar;
botonEliminar = document.querySelectorAll('.parrafo div i')


// escucho el evento submit del formulario para obtener el comentario 
formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    // console.log(inputComentario.value);
    // obtengo los comentarios existentes 
    obtenerComentarios(inputComentario.value)
    
    // agrego el comentario nuevo al localStorage 
    agregarComentarios(inputComentario.value)
    
    // renderizo el comentario agregado anteriormente 
    renderizarUnComentario(inputComentario.value)

    botonEliminar.forEach((boton,i) => {
        boton.addEventListener('click', () => {
            
            comentariosGuardados.splice(i,1);
            localStorage.setItem('comentariosRealizados', JSON.stringify(comentariosGuardados))
            botonEliminar[i].parentElement.parentElement.remove();
            
        })
    })

    botonEliminar = document.querySelectorAll('.parrafo div i')
    
    formulario.reset();
})


// Busco y elimino el elemento en el cual se hace click al tacho
botonEliminar.forEach((boton,i) => {
    boton.addEventListener('click', () => {
        
        comentariosGuardados.splice(i,1);
        localStorage.setItem('comentariosRealizados', JSON.stringify(comentariosGuardados))
        botonEliminar[i].parentElement.parentElement.remove();
        
    })
})



function obtenerComentarios() {
    let historialMemoria = JSON.parse(localStorage.getItem('comentariosRealizados'))

    if(!historialMemoria){
        historialMemoria = []
    }

    return historialMemoria;
}

function agregarComentarios(comentario){
    comentariosGuardados.push(comentario);

    localStorage.setItem('comentariosRealizados', JSON.stringify(comentariosGuardados))
}

function renderizarComentarios(arrayDeComentarios){
    arrayDeComentarios.forEach(comentario => {
        let contenedorParrafo = document.createElement('div')
        contenedorParrafo.classList.add('parrafo')
        let p = document.createElement('p')
        p.textContent = comentario
        let iconoEliminar = renderizaIconoDeEliminar()
        contenedorParrafo.appendChild(p)
        contenedorParrafo.append(iconoEliminar)
        contenedorComentarios.appendChild(contenedorParrafo)
    })
}

function renderizarUnComentario(comentario) {
    let contenedorParrafo = document.createElement('div')
    contenedorParrafo.classList.add('parrafo')
    let p = document.createElement('p')
    p.textContent = comentario
    // contenedorComentarios.appendChild(p)
    let iconoEliminar = renderizaIconoDeEliminar()
    contenedorParrafo.appendChild(p)
    contenedorParrafo.append(iconoEliminar)
    contenedorComentarios.appendChild(contenedorParrafo)
}

function renderizaIconoDeEliminar(){
    let contenedorIcono = document.createElement('div')
    let Icono = document.createElement('i')
    Icono.setAttribute("class","fas fa-trash-alt")
    contenedorIcono.appendChild(Icono)
    return contenedorIcono
}



