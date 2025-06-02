// ranking.js - Archivo completo
document.addEventListener('DOMContentLoaded', function() {
    // 1. Obtener datos del ranking
    const rankingData = JSON.parse(localStorage.getItem('ranking')) || [];
    
    // 2. Ordenar por puntaje (descendente) y tiempo (ascendente)
    rankingData.sort((a, b) => {
        if (b.puntaje !== a.puntaje) {
            return b.puntaje - a.puntaje; // Mayor puntaje primero
        } else {
            return a.tiempoUsado - b.tiempoUsado; // Menor tiempo primero
        }
    });

    // 3. Limitar a los 7 mejores (según número de rectángulos)
    const topRanking = rankingData.slice(0, 7);
    
    // 4. Mostrar en los rectángulos
    const rectangles = document.querySelectorAll('.rectangulo');
    
    rectangles.forEach((rect, index) => {
        if (topRanking[index]) {
            const user = topRanking[index];
            rect.innerHTML = `
                <div class="posicion">${index + 1}°</div>
                <div class="nickname">${user.nickname}</div>
                <div class="puntaje">${user.puntaje}/10</div>
                <div class="tiempo">${formatTime(user.tiempoUsado)}</div>
            `;
            rect.classList.add('lleno');
        } else {
            rect.innerHTML = '<div class="vacio">- Sin datos -</div>';
            rect.classList.add('vacio');
        }
    });

    // 5. Funciones auxiliares
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // 6. Event listeners para botones
    document.querySelector('#menu').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    document.querySelector('#volver-jugar').addEventListener('click', function() {
        window.location.href = 'cuestionario.html';
    });

    document.querySelector(".Logout").addEventListener("click", function() {
    window.location.href = 'index.html';
});
    document.querySelector(".Logo").addEventListener("click", function() {
        window.location.href = 'index.html';
    });
});