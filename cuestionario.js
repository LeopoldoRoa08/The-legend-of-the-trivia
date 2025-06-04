// Datos completos del cuestionario
let preguntas = [
    "¿Qué país creó juegos de rol influyentes como Final Fantasy y Dragon Quest?", 
    "¿Qué juego es considerado el primer videojuego de la historia?",
    "¿En qué año salió la PlayStation 1?", 
    '¿Qué estudio desarrolló "Elden Ring"?', 
    '¿Qué juego ganó el premio "Juego del Año" en The Game Awards 2018?',
    '¿Qué consola de Nintendo presentaba el innovador controlador de "pantalla táctil"?', 
    '¿Cual es el Juego mas vendido de la Historia?',
    '¿Quien dice la frase "Get over here"', 
    '¿Que genero es Pokemon?', 
    '"Un juego retrasado eventualmente es bueno, un juego malo es malo para siempre" ¿De qué desarrollador vino?'
];

let respuestas = [
    ["Japón", "Estados Unidos", "Venezuela", "Corea del Sur"],
    ["Pong", "Super Mario Bros", "OXO", "Tetris for two"],
    ["1994", "1995", "1999", "2002"],
    ["Nintendo", "FromSoftware", "Capcom", "Square Enix"],
    ["Spider-man", "Red Dead Redemption 2", "Super Smash Bros Ultimate", "God of War(2018)"],
    ["Nintendo Wii", "Nintendo 64", "Nintendo DS", "Nintendo Switch"],
    ["Tetris", "Minecraft", "Grand Theft Auto V", "Mario Kart 8 Deluxe"],
    ["Scorpion", "Ryu", "Terry Bogard", "Jin Kazama"],
    ["Mundo Abierto", "Plataformero", "RPG", "Novela Visual"],
    ["Hideo Kojima", "Hidetaka Miyazaki", "Masahiro Sakurai", "Shigeru Miyamoto"]
];

const respuestasCorrectas = [
    "Japón", 
    "OXO", 
    "1994", 
    "FromSoftware", 
    "God of War(2018)", 
    "Nintendo DS", 
    "Minecraft", 
    "Scorpion", 
    "RPG", 
    "Shigeru Miyamoto"
];

let respuestasUsuario = [];
let counter = 0;
let timeLeft = 5 * 60; // 5 minutos en segundos

// Función para mezclar preguntas y respuestas
function mezclarArrays() {
    // Combinar preguntas con sus respuestas y respuestas correctas
    let combinadas = preguntas.map((pregunta, index) => {
        return {
            pregunta: pregunta,
            respuestas: respuestas[index],
            respuestaCorrecta: respuestasCorrectas[index]
        };
    });

    // Algoritmo para mezclar 
    for (let i = combinadas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combinadas[i], combinadas[j]] = [combinadas[j], combinadas[i]];
    }

    // Reconstruir los arrays mezclados
    combinadas.forEach((item, index) => {
        preguntas[index] = item.pregunta;
        respuestas[index] = item.respuestas;
        respuestasCorrectas[index] = item.respuestaCorrecta;
    });
}

// Llamar a la función para mezclar al inicio
mezclarArrays();

// Función para guardar la respuesta seleccionada
function guardarRespuesta() {
    let respuestaSeleccionada = document.querySelector('input[name="answer"]:checked');
    if (respuestaSeleccionada) {
        respuestasUsuario[counter] = respuestaSeleccionada.value;
    } else {
        respuestasUsuario[counter] = null;
    }
}

// Función para mostrar la pregunta actual
function mostrarPregunta() {
    document.querySelector("#titulo-pregunta").textContent = preguntas[counter];
    
    let opciones = document.querySelectorAll(".option");
    for (let i = 0; i < opciones.length; i++) {
        opciones[i].innerHTML = `
            <input type="radio" name="answer" value="${respuestas[counter][i]}"
                   ${respuestasUsuario[counter] === respuestas[counter][i] ? 'checked' : ''}>
            ${respuestas[counter][i]}
        `;
    }
}

// Función principal para avanzar a la siguiente pregunta
function siguientePregunta() {
    guardarRespuesta();

    if (counter >= preguntas.length - 1) {
        // Calcular puntaje final
        let puntaje = 0;
        for (let i = 0; i < respuestasUsuario.length; i++) {
            if (respuestasUsuario[i] === respuestasCorrectas[i]) {
                puntaje++;
            }
        }

        // Calcular tiempo usado
        const tiempoUsado = (5 * 60) - timeLeft;

        // Guardar todos los resultados en localStorage
        localStorage.setItem("quizResults", JSON.stringify({
            nickname: localStorage.getItem("nickname"),
            respuestasUsuario: respuestasUsuario,
            respuestasCorrectas: respuestasCorrectas,
            preguntas: preguntas,
            puntaje: puntaje,
            porcentaje: Math.round((puntaje / preguntas.length) * 100),
            tiempoUsado: tiempoUsado
        }));

       // Actualizar el ranking 
const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

// Buscar si el usuario ya existe en el ranking
const usuarioExistenteIndex = ranking.findIndex(item => item.nickname === localStorage.getItem("nickname"));

if (usuarioExistenteIndex !== -1) {
    // Si existe, actualiza solo si el nuevo puntaje es MEJOR
    if (puntaje > ranking[usuarioExistenteIndex].puntaje) {
        ranking[usuarioExistenteIndex] = {
            nickname: localStorage.getItem("nickname"),
            puntaje: puntaje,
            tiempoUsado: tiempoUsado,
            fecha: new Date().toISOString()
        };
    }
} else {
    // Si no existe, agregar nuevo registro
    ranking.push({
        nickname: localStorage.getItem("nickname"),
        puntaje: puntaje,
        tiempoUsado: tiempoUsado,
        fecha: new Date().toISOString()
    });
}

// Ordenar por puntaje (descendente) y tiempo (ascendente)
localStorage.setItem("ranking", JSON.stringify(ranking));

        // Redirigir a la página de resultados
        window.location.href = 'Cuestionariofinalizado.html';
        return;
    }

    counter++;
    mostrarPregunta();
}

// Función para actualizar el temporizador
function actualizarTemporizador() {
    let minutos = Math.floor(timeLeft / 60);
    let segundos = timeLeft % 60;
    
    document.getElementById("timer").textContent = 
        `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    
    if (timeLeft > 0) {
        timeLeft--;
    } else {
        clearInterval(intervaloTemporizador);
        
        // Guardar la respuesta actual si hay alguna seleccionada
        guardarRespuesta();
        
        // Marcar las preguntas no contestadas como null
        for (let i = counter; i < preguntas.length; i++) {
            if (respuestasUsuario[i] === undefined) {
                respuestasUsuario[i] = null;
            }
        }
        
        // Calcular puntaje 
        let puntaje = 0;
        for (let i = 0; i < respuestasUsuario.length; i++) {
            if (respuestasUsuario[i] === respuestasCorrectas[i]) {
                puntaje++;
            }
        }

        // El resto de la lógica para guardar y redirigir (esto ya existe)
        const tiempoUsado = (5 * 60) - timeLeft;
        localStorage.setItem("quizResults", JSON.stringify({
            nickname: localStorage.getItem("nickname"),
            respuestasUsuario: respuestasUsuario,
            respuestasCorrectas: respuestasCorrectas,
            preguntas: preguntas,
            puntaje: puntaje,
            porcentaje: Math.round((puntaje / preguntas.length) * 100),
            tiempoUsado: tiempoUsado
        }));

       // Actualizar el ranking 
const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

// Buscar si el usuario ya existe en el ranking
const usuarioExistenteIndex = ranking.findIndex(item => item.nickname === localStorage.getItem("nickname"));

if (usuarioExistenteIndex !== -1) {
    // Si existe, actualiza solo si el nuevo puntaje es MEJOR
    if (puntaje > ranking[usuarioExistenteIndex].puntaje) {
        ranking[usuarioExistenteIndex] = {
            nickname: localStorage.getItem("nickname"),
            puntaje: puntaje,
            tiempoUsado: tiempoUsado,
            fecha: new Date().toISOString()
        };
    }
 
} else {
    // Si no existe, agregar nuevo registro
    ranking.push({
        nickname: localStorage.getItem("nickname"),
        puntaje: puntaje,
        tiempoUsado: tiempoUsado,
        fecha: new Date().toISOString()
    });
}


localStorage.setItem("ranking", JSON.stringify(ranking));

        window.location.href = 'Cuestionariofinalizado.html';
    }
}

// Configurar eventos
document.querySelector("#siguiente").addEventListener("click", siguientePregunta);
document.querySelector(".Logo").addEventListener("click", function() {
    window.location.href = 'index.html';
});
document.querySelector(".Logout").addEventListener("click", function() {
    window.location.href = 'index.html';
});

// Iniciar temporizador
let intervaloTemporizador = setInterval(actualizarTemporizador, 1000);

// Mostrar la primera pregunta al cargar
mostrarPregunta();

