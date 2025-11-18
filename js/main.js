class Curso {
    constructor(id, nombre, precio, categoria, nivel) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.nivel = nivel;
    }
}
const catalogoCursos = [
    new Curso(1, "Programación Web HTML5", 15000, "Desarrollo", "Inicial"),
    new Curso(2, "Python para Análisis de Datos", 18000, "Programación", "Intermedio"),
    new Curso(3, "Lenguaje C: Fundamentos", 14000, "Programación", "Avanzado"),
    new Curso(4, "Google Apps Script (JS)", 12000, "Automatización", "Intermedio"), // JS para Sheets
    new Curso(5, "Excel Empresarial Avanzado", 10000, "Ofimática", "Avanzado"),
    new Curso(6, "Marketing Digital 360", 13500, "Marketing", "Todos"),
    new Curso(7, "Liderazgo Estratégico", 16000, "Soft Skills", "Gerencial"),
    new Curso(8, "Inteligencia Emocional", 11000, "Soft Skills", "Todos")
];
let carrito = [];
const contenedorCursos = document.getElementById('contenedor-cursos');
const contenedorCarrito = document.getElementById('carrito-contenedor');
const contadorCarrito = document.getElementById('contador-carrito');
const precioTotalElement = document.getElementById('precio-total');
const inputBuscador = document.getElementById('buscador');
const btnVaciar = document.getElementById('btn-vaciar');

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carritoFleex')) {
        carrito = JSON.parse(localStorage.getItem('carritoFleex'));
        actualizarCarritoUI();
    }
    renderizarCursos(catalogoCursos);
});

function renderizarCursos(lista) {
    contenedorCursos.innerHTML = ''; 
    if(lista.length === 0) {
        contenedorCursos.innerHTML = '<p style="text-align:center; width:100%;">No se encontraron capacitaciones.</p>';
        return;
    }
    lista.forEach(curso => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('card');
        tarjeta.innerHTML = `
            <span class="categoria-tag">${curso.categoria}</span>
            <h3>${curso.nombre}</h3>
            <p>Nivel: ${curso.nivel}</p>
            <div class="price">$${curso.precio.toLocaleString()}</div>
            <button id="btn-${curso.id}" class="btn-add">Agregar al Plan</button>
        `;
        contenedorCursos.appendChild(tarjeta);
        
        const btn = document.getElementById(`btn-${curso.id}`);
        btn.addEventListener('click', () => agregarAlCarrito(curso));
    });
}

function agregarAlCarrito(cursoNuevo) {
    const existe = carrito.some(curso => curso.id === cursoNuevo.id);
    if(!existe) {
        carrito.push(cursoNuevo);
    }
    actualizarCarritoUI();
    guardarStorage();
}

function eliminarDelCarrito(id) {
    const index = carrito.findIndex(curso => curso.id === id);
    if (index !== -1) {
        carrito.splice(index, 1);
        actualizarCarritoUI();
        guardarStorage();
    }
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarritoUI();
    localStorage.removeItem('carritoFleex');
}

function actualizarCarritoUI() {
    contenedorCarrito.innerHTML = '';
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p class="empty-msg">No hay capacitaciones seleccionadas.</p>';
        contadorCarrito.innerText = '0';
        precioTotalElement.innerText = 'Presupuesto Total: $0';
        return;
    }
    carrito.forEach(curso => {
        const fila = document.createElement('div');
        fila.classList.add('item-carrito');
        fila.innerHTML = `
            <div>
                <strong>${curso.nombre}</strong><br>
                <small>$${curso.precio.toLocaleString()}</small>
            </div>
            <button class="btn-danger" id="eliminar-${curso.id}">Quitar</button>
        `;
        contenedorCarrito.appendChild(fila);
        const btnEliminar = document.getElementById(`eliminar-${curso.id}`);
        btnEliminar.addEventListener('click', () => eliminarDelCarrito(curso.id));
    });
    contadorCarrito.innerText = carrito.length;
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    precioTotalElement.innerText = `Presupuesto Total: $${total.toLocaleString()}`;
}

function guardarStorage() {
    localStorage.setItem('carritoFleex', JSON.stringify(carrito));
}

inputBuscador.addEventListener('input', (e) => {
    const busqueda = e.target.value.toLowerCase();
    const resultado = catalogoCursos.filter(curso => 
        curso.nombre.toLowerCase().includes(busqueda)
    );
    renderizarCursos(resultado);
});

btnVaciar.addEventListener('click', vaciarCarrito);
//Formulario (Evento Submit)
const formularioContacto = document.getElementById('form-contacto');

formularioContacto.addEventListener('submit', (e) => {
    e.preventDefault();

    // Captura datos del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    if (nombre && email) {
        console.log("Formulario enviado con éxito");
        console.log(`Nombre: ${nombre}, Email: ${email}`);
        //DOM
        const mensajeExito = document.createElement('p');
        mensajeExito.innerText = `¡Gracias ${nombre}! Nos pondremos en contacto contigo a ${email} a la brevedad.`;
        mensajeExito.style.color = "green";
        mensajeExito.style.fontWeight = "bold";
        mensajeExito.style.marginTop = "10px";

        formularioContacto.appendChild(mensajeExito);
        formularioContacto.reset();
        setTimeout(() => {
            mensajeExito.remove();
        }, 5000);
    }
});