let nickname = document.querySelector(".nickname")


function iniciar(){
    if (nickname.value){
        localStorage.setItem("nickname", nickname.value)
        window.location.href = 'cuestionario.html'
    
    }
    else{
        alert("Por favor ingrese un nickname.")
    }
}

document.querySelector(".iniciar").addEventListener("click", iniciar)



