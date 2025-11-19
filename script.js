/*
 * Archivo: js/script.js
 * Proyecto: Entrega 1 - Simulador Interactivo
 */

// --- 1. Declaración de Constantes y Variables Globales ---
// (Cumple con "Declara variables, constantes y arrays")
const NOTA_APROBACION = 7; // Constante para la nota mínima de aprobación
let nombreAlumno = ""; // Variable para guardar el nombre

// --- 2. Definición de Funciones ---
// (Cumple con "Crea al menos 3 funciones" y "Nombres claros")

/**
 * Función 1: ENTRADA DE DATOS
 * Pide los datos del alumno y sus notas.
 * Utiliza prompt, un ciclo 'for' y un array.
 */
function obtenerDatosAlumno() {
    // Pedimos el nombre
    nombreAlumno = prompt("Bienvenido al simulador de promedios.\nPor favor, ingresa el nombre del alumno:");

    // Pedimos la cantidad de notas (y validamos que sea un número)
    let cantidadNotas = parseInt(prompt("¿Cuántas notas deseas ingresar para " + nombreAlumno + "?"));

    // Array para guardar las notas
    let notas = [];

    // --- Ciclo de Iteración (FOR) ---
    // (Cumple con "Agrega los ciclos de iteración")
    for (let i = 0; i < cantidadNotas; i++) {
        let notaIngresada = parseFloat(prompt("Ingresa la nota N° " + (i + 1)));
        
        // Añadimos la nota al array
        notas.push(notaIngresada);
    }
    
    // Devolvemos las notas para que otra función las procese
    return notas;
}

/**
 * Función 2: PROCESAMIENTO DE DATOS
 * Calcula el promedio de un array de notas.
 */
function calcularPromedio(arrayNotas) {
    let sumaTotal = 0;
    
    // Usamos otro ciclo para sumar las notas
    for (let i = 0; i < arrayNotas.length; i++) {
        sumaTotal = sumaTotal + arrayNotas[i]; 
    }
    
    // Calculamos el promedio
    let promedio = sumaTotal / arrayNotas.length;
    return promedio;
}

/**
 * Función 3: SALIDA DE DATOS
 * Muestra el resultado al usuario.
 * Utiliza un condicional 'if/else', 'alert' y 'console.log'.
 */
function mostrarResultados(promedio) {
    let mensaje = "";

    // --- Algoritmo Condicional (IF/ELSE) ---
    // (Cumple con "Agrega... condicionales necesarios")
    if (promedio >= NOTA_APROBACION) {
        // Mensaje si aprobó
        mensaje = "¡Felicidades, " + nombreAlumno + "! Has aprobado.\n\n" +
                  "Tu promedio es: " + promedio.toFixed(2); // .toFixed(2) para redondear a 2 decimales
    } else {
        // Mensaje si desaprobó
        mensaje = "Lo sentimos, " + nombreAlumno + ". Has desaprobado.\n\n" +
                "Tu promedio es: " + promedio.toFixed(2);
    }

    // --- Uso de Alert y Consola ---
    // (Cumple con "Integra el uso de la Consola JS y de los cuadros de diálogo")
    alert(mensaje);
    
    console.log("--- Resultados del Simulador ---");
    console.log("Alumno: " + nombreAlumno);
    console.log("Promedio Final: " + promedio.toFixed(2));
    console.log("Aprobado: " + (promedio >= NOTA_APROBACION));
    console.log("---------------------------------");
}

// --- 3. Ejecución Principal (Invocación de funciones) ---
// (Cumple con "Realizar llamadas(invocar) a las funciones")

/**
 * Función principal que orquesta el simulador
 */
function iniciarSimulador() {
    // Usamos 'confirm' para iniciar
    let iniciar = confirm("¿Deseas iniciar el simulador de promedio de notas?");

    if (iniciar) {
        // 1. Llamada a la función de ENTRADA
        let notasDelAlumno = obtenerDatosAlumno();
        
        // 2. Llamada a la función de PROCESAMIENTO
        let promedioDelAlumno = calcularPromedio(notasDelAlumno);
        
        // 3. Llamada a la función de SALIDA
        mostrarResultados(promedioDelAlumno);
        
        alert("Simulación finalizada. Revisa la consola para más detalles.");
    } else {
        alert("Gracias por visitar. ¡Vuelve pronto!");
    }
}

// ¡Llamamos a la función principal para que todo comience!
iniciarSimulador();