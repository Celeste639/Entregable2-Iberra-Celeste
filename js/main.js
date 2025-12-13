
let carrito = []; 
let catalogoCursos = [];

// --- Selectores del DOM ---
const contenedorCursos = document.getElementById('contenedor-cursos');
const contenedorCarrito = document.getElementById('carrito-contenedor');
const contadorCarrito = document.getElementById('contador-carrito');
const precioTotalElement = document.getElementById('precio-total');
const inputBuscador = document.getElementById('buscador');
const btnVaciar = document.getElementById('btn-vaciar');
const btnFinalizar = document.getElementById('btn-finalizar');
const formularioContacto = document.getElementById('form-contacto');


// --- 1. Inicialización y Carga Asíncrona
document.addEventListener('DOMContentLoaded', () => {
    obtenerCursos(); 

 // 2. Cargar carrito del localStorage
    if (localStorage.getItem('carritoFleex')) {
        carrito = JSON.parse(localStorage.getItem('carritoFleex'));
        actualizarCarritoUI();
    }
});


function obtenerCursos() {
    fetch('./data/cursos.json') 
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue correcta');
            }
            return response.json();
        })
        .then(data => {
            catalogoCursos = data; 
            renderizarCursos(catalogoCursos);
        })
        .catch(error => {

            Toastify({
                text: '❌ Error al cargar el catálogo de cursos. Verifica la ruta del JSON.',
                duration: 5000,
                gravity: "top",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #ef4444, #f87171)", 
                },
            }).showToast();
        });
}

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

        btn.addEventListener('click', () => agregarAlCarrito(catalogoCursos.find(c => c.id === curso.id)));
    });
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


// --- 3. Lógica de Datos y Eventos ---
function agregarAlCarrito(cursoNuevo) {
    const existe = carrito.some(curso => curso.id === cursoNuevo.id);

    if(!existe) {
        carrito.push(cursoNuevo);

        Toastify({
            text: `✅ Curso "${cursoNuevo.nombre}" agregado al plan.`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, #3b82f6, #38bdf8)", 
            },
        }).showToast();
    } else {

        Toastify({
            text: `⚠️ El curso "${cursoNuevo.nombre}" ya está en tu plan.`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, #fbbf24, #f59e0b)",
            },
        }).showToast();
    }
    actualizarCarritoUI();
    guardarStorage();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(curso => curso.id !== id);
    actualizarCarritoUI();
    guardarStorage();
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarritoUI();
    localStorage.removeItem('carritoFleex');
}

function guardarStorage() {
    localStorage.setItem('carritoFleex', JSON.stringify(carrito));
}

function finalizarSolicitud() {
    if (carrito.length === 0) {
        Swal.fire({
            title: 'Plan Vacío',
            text: 'Para solicitar un presupuesto, debes agregar al menos una capacitación a tu plan.',
            icon: 'warning',
            confirmButtonColor: '#3498db'
        });
        return;
    }
    
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    
    Swal.fire({
        title: 'Confirmar Solicitud',
        html: `
            <p>Estás a punto de solicitar presupuesto por ${carrito.length} curso(s).</p>
            <p><strong>Presupuesto Estimado: $${total.toLocaleString()}</strong></p>
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, Solicitar Ahora',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#27ae60', // Verde
        cancelButtonColor: '#e74c3c' // Rojo
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Solicitud Enviada!',
                text: 'Recibirás la confirmación y los detalles en tu correo. El carrito ha sido vaciado.',
                icon: 'success',
                confirmButtonColor: '#2c3e50'
            });
            vaciarCarrito();
        }
    });
}


// --- 4. Asignación de Eventos ---

inputBuscador.addEventListener('input', (e) => {
    const busqueda = e.target.value.toLowerCase();
    const resultado = catalogoCursos.filter(curso => 
        curso.nombre.toLowerCase().includes(busqueda)
    );
    renderizarCursos(resultado);
});


btnVaciar.addEventListener('click', vaciarCarrito);

btnFinalizar.addEventListener('click', finalizarSolicitud);

formularioContacto.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    if (nombre && email) {
        Toastify({
            text: `Gracias ${nombre}! Tu consulta ha sido enviada.`,
            duration: 3000,
            gravity: "bottom",
            position: "left",
            style: {
                background: "linear-gradient(to right, #6d28d9, #9333ea)",
            },
        }).showToast();

        formularioContacto.reset();
    }
});