let preguntas = ["¿Qué país creó juegos de rol influyentes como Final Fantasy y Dragon Quest?", "¿Qué juego es considerado el primer videojuego de la historia?",
    "¿En qué año salió la PlayStation 1?", '¿Qué estudio desarrolló "Elden Ring"?', '¿Qué juego ganó el premio "Juego del Año" en The Game Awards 2018?',
    '¿Qué consola de Nintendo presentaba el innovador controlador de "pantalla táctil"?', '¿Cual es el Juego mas vendido de la Historia?',
    '¿Quien dice la frase “Get over here”', '¿Que genero es Pokemon?', '"Un juego retrasado eventualmente es bueno, un juego malo es malo para siempre" ¿De qué desarrollador vino?'
]

let respuestas = [
    ["Japón","Estados Unidos","Venezuela","Corea del Sur"], //RESPUESTAS DE PRIMERA PREGUNTA
    ["Pong","Super Mario Bros","OXO","Tetris for two"],  //RESPUESTAS DE SEGUNDO PREGUNTA
    ["1994","1995","1999","2002"],
    ["Nintendo","FromSoftware","Capcom","Square Enix"],
    ["Spider-man","Red Dead Redemption 2","Super Smash Bros Ultimate","God of War(2018)"],
    ["Nintendo Wii","Nintendo 64","Nintendo DS","Nintendo Switch"],
    ["Tetris","Minecraft","Grand Theft Auto V","Mario Kart 8 Deluxe"],
    ["Scorpion","Ryu","Terry Bogard","Jin Kazama"],
    ["Mundo Abierto","Plataformero","RPG","Novela Visual"],
    ["Hideo Kojima","Hidetaka Miyazaki","Masahiro Sakurai","Shigeru Miyamoto"],
]

let counter = 1
function siguientePregunta(){
    document.querySelector("#titulo-pregunta").innerHTML = preguntas[counter];
    let opciones = document.querySelectorAll(".option") // [...]
    for(let i = 0; i < opciones.length; i++){
        opciones[i].innerHTML = '<input type="radio" name="answer" value="'+ respuestas[counter][i] +'">' + respuestas[counter][i]
    }

    counter++
}
document.querySelector("#siguiente").addEventListener("click", siguientePregunta)



function logo(){
    window.location.href = '/index.html'
}

document.querySelector(".Logo").addEventListener("click", logo)


function logout(){
    window.location.href = '/index.html'
}

document.querySelector(".Logout").addEventListener("click", logout)


        let timeLeft = 5 * 60; // 5 minutos en segundos

        function updateTimer() {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;

            // Formato MM:SS con ceros a la izquierda
            document.getElementById("timer").textContent =
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (timeLeft > 0) {
                timeLeft--;
            } else {
                clearInterval(timerInterval);
                alert("¡Tiempo acabado!");
            }
        }

        // Actualizar cada segundo
        let timerInterval = setInterval(updateTimer, 1000);

