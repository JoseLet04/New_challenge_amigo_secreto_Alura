// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// Array para almacenar los nombres de los amigos
let amigos = [];

// Función para agregar un amigo a la lista
function agregarAmigo() {
    // Capturar el valor del campo de entrada
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim();

    // Validar la entrada
    if (nombreAmigo === "") {
        alert("Por favor, inserte un nombre.");
        return; // Detener la ejecución si el campo está vacío
    }

    // Añadir el nombre al array de amigos
    amigos.push(nombreAmigo);

    // Limpiar el campo de entrada
    inputAmigo.value = "";

    // Actualizar la lista de amigos en el DOM
    actualizarListaAmigos();
}

// Función para actualizar la lista de amigos en el DOM
function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ""; // Limpiar la lista antes de actualizar

    // Recorrer el array de amigos y crear elementos <li> para cada uno
    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

// Función para sortear un amigo secreto
function sortearAmigo() {
    // Verificar si hay suficientes amigos para sortear
    if (amigos.length < 2) {
        alert("Necesitas al menos 2 amigos para realizar el sorteo.");
        return; // Detener la ejecución si no hay suficientes amigos
    }

    // Crear una copia del array de amigos para no modificar el original
    let amigosDisponibles = [...amigos];

    // Array para almacenar los resultados del sorteo
    const resultados = [];

    // Si el número de amigos es impar, guardamos el último amigo para asignarlo después
    let amigoImpar = null;
    if (amigosDisponibles.length % 2 !== 0) {
        amigoImpar = amigosDisponibles.pop(); // Extraer el último amigo de la lista
    }

    // Realizar el sorteo para los amigos restantes (número par)
    while (amigosDisponibles.length > 0) {
        // Seleccionar un amigo aleatorio de la lista disponible
        const indiceAleatorio = Math.floor(Math.random() * amigosDisponibles.length);
        const amigoSeleccionado = amigosDisponibles.splice(indiceAleatorio, 1)[0];

        // Asignar el siguiente amigo en la lista como su amigo secreto
        const amigoSecreto = amigosDisponibles.length > 0 
            ? amigosDisponibles[0] 
            : resultados[0]; // Si es el último, asignar el primero de los resultados

        // Guardar el resultado
        resultados.push({ amigo: amigoSeleccionado, amigoSecreto: amigoSecreto });
    }

    // Si había un amigo impar, asignarle un amigo secreto
    if (amigoImpar !== null) {
        // Seleccionar un amigo aleatorio de los resultados para asignarle el amigo impar
        const indiceAleatorio = Math.floor(Math.random() * resultados.length);
        const amigoSecretoImpar = resultados[indiceAleatorio].amigo;

        // Añadir el amigo impar a los resultados
        resultados.push({ amigo: amigoImpar, amigoSecreto: amigoSecretoImpar });

        // También actualizar el amigo secreto del amigo seleccionado para que apunte al amigo impar
        resultados[indiceAleatorio].amigoSecreto = amigoImpar;
    }

    // Mostrar los resultados en el DOM
    mostrarResultados(resultados);
}

// Función para mostrar los resultados del sorteo en el DOM
function mostrarResultados(resultados) {
    const resultadoLista = document.getElementById('resultado');
    resultadoLista.innerHTML = ""; // Limpiar la lista antes de mostrar los resultados

    // Recorrer los resultados y crear elementos <li> para cada uno
    resultados.forEach(({ amigo, amigoSecreto }) => {
        const li = document.createElement('li');
        li.textContent = `${amigo} ➔ ${amigoSecreto}`;
        resultadoLista.appendChild(li);
    });
}
