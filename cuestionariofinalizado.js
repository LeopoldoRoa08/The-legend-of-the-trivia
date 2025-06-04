// Obtener datos del localStorage
const resultados = JSON.parse(localStorage.getItem("quizResults")) || {
    preguntas: [
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
    ],
    respuestasUsuario: ["", "", "", "", "", "", "", "", "", ""],
    respuestasCorrectas: [
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
    ],
    puntaje: 0,
    porcentaje: 0
};

// Mostrar todas las preguntas con su estado
const container = document.getElementById('preguntas-container');

resultados.preguntas.forEach((pregunta, index) => {
    const respuestaUsuario = resultados.respuestasUsuario[index];
    const respuestaCorrecta = resultados.respuestasCorrectas[index];
    const esCorrecta = respuestaUsuario === respuestaCorrecta;
    const noContestada = respuestaUsuario === null || respuestaUsuario === undefined;
    
    const preguntaDiv = document.createElement('div');
    preguntaDiv.className = `pregunta ${esCorrecta ? 'correcta' : 'incorrecta'}`;
    
    preguntaDiv.innerHTML = `
        <div>${pregunta}</div>
        <div class="respuesta-usuario">
            ${noContestada ? "<span style='color:red'>No contestada</span>" : `Tu respuesta: ${respuestaUsuario}`}
        </div>
        ${!esCorrecta && !noContestada ? `<div class="respuesta-correcta">Respuesta correcta: ${respuestaCorrecta}</div>` : ''}
        <div class="puntaje">${esCorrecta ? '+1 pto' : '0 pts'}</div>
    `;
    
    container.appendChild(preguntaDiv);
});




document.querySelector('#ver-ranking').addEventListener('click', () => {
    window.location.href = 'Ranking.html';
});

document.querySelector('#menu').addEventListener('click', () => {
    window.location.href = 'index.html';
});

document.querySelector(".Logo").addEventListener("click", function() {
    window.location.href = 'index.html';
});
document.querySelector(".Logout").addEventListener("click", function() {
    window.location.href = 'index.html';
});