document.addEventListener('DOMContentLoaded', function() {
    // Recuperar resultados del localStorage
    const resultados = JSON.parse(localStorage.getItem("quizResults"));
    
    // Elementos del DOM
    const contenedorResultados = document.getElementById('resultados-container');
    const puntajeFinalElement = document.getElementById('puntaje-final');
    const porcentajeElement = document.getElementById('porcentaje-acierto');
    const tiempoElement = document.getElementById('tiempo-final');

    // Verificar si hay resultados
    if (!resultados) {
        contenedorResultados.innerHTML = '<p>No se encontraron resultados. Por favor, completa el cuestionario primero.</p>';
        window.location.href = 'index.html';
        return;
    }

    // Mostrar datos generales
    puntajeFinalElement.textContent = resultados.puntaje;
    porcentajeElement.textContent = `${resultados.porcentaje}%`;
    
    // Formatear y mostrar tiempo
    const minutos = Math.floor(resultados.tiempoUsado / 60);
    const segundos = resultados.tiempoUsado % 60;
    tiempoElement.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    // Mostrar cada pregunta con sus resultados
    resultados.preguntas.forEach((pregunta, index) => {
        const respuestaUsuario = resultados.respuestasUsuario[index];
        const respuestaCorrecta = resultados.respuestasCorrectas[index];
        const esCorrecta = respuestaUsuario === respuestaCorrecta;

        const preguntaDiv = document.createElement('div');
        preguntaDiv.className = 'pregunta-resultado';
        
        preguntaDiv.innerHTML = `
            <div class="texto-pregunta">${pregunta}</div>
            <div class="puntaje-pregunta">${esCorrecta ? '+1 pt' : '+0 pt'}</div>
            <div class="opciones-resultado">
        `;

        // Mostrar cada opción con su estado
        resultados.respuestas[index].forEach(opcion => {
            const opcionDiv = document.createElement('div');
            opcionDiv.className = 'opcion';
            
            if (opcion === respuestaCorrecta) {
                opcionDiv.classList.add('correcta');
            } else if (opcion === respuestaUsuario && !esCorrecta) {
                opcionDiv.classList.add('incorrecta-seleccionada');
            }
            
            opcionDiv.textContent = opcion;
            preguntaDiv.querySelector('.opciones-resultado').appendChild(opcionDiv);
        });

        // Mostrar respuesta correcta si el usuario falló
        if (!esCorrecta && respuestaUsuario !== null) {
            const correctaDiv = document.createElement('div');
            correctaDiv.className = 'respuesta-correcta-texto';
            correctaDiv.textContent = `Respuesta correcta: ${respuestaCorrecta}`;
            preguntaDiv.appendChild(correctaDiv);
        }

        contenedorResultados.appendChild(preguntaDiv);
    });

    // Configurar evento para el botón de ranking
    document.getElementById('ver-ranking').addEventListener('click', function() {
        // Lógica para mostrar ranking (puedes implementarla luego)
        console.log("Mostrar ranking...");
    });
});