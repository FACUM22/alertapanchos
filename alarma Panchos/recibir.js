let audioActual = null;

// 🔀 MENÚ
function mostrarA(){
    document.getElementById("menu").style.display = "none";
    document.getElementById("sectorA").style.display = "block";
    document.getElementById("sectorB").style.display = "none";
}

function mostrarB(){
    document.getElementById("menu").style.display = "none";
    document.getElementById("sectorA").style.display = "none";
    document.getElementById("sectorB").style.display = "block";
}

function volver(){
    document.getElementById("menu").style.display = "block";
    document.getElementById("sectorA").style.display = "none";
    document.getElementById("sectorB").style.display = "none";
}


// 📤 SECTOR A - enviar alerta
function enviarAlerta(){

    localStorage.setItem("alertaPanchos", Date.now());

    document.getElementById("estado").innerText =
    "🚨 Alerta enviada";
}


// 📡 SECTOR B escucha alerta
window.addEventListener("storage", function(e){
    if(e.key === "alertaPanchos"){
        sonarAlerta();
    }
});

function sonarAlerta(){

    document.getElementById("mensaje").innerText =
    "🚨 En 30 min sale un carro de panchos";

    // 🔊 sonido
    audioActual = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
    audioActual.loop = true;

    audioActual.play().catch(()=>{});

    // 🗣️ voz
    speechSynthesis.cancel();

    let voz = new SpeechSynthesisUtterance(
        "En 30 minutos sale un carro de panchos"
    );

    voz.lang = "es-UY";
    speechSynthesis.speak(voz);
}


// ✔️ RECIBIDO (apaga todo)
function recibir(){

    if(audioActual){
        audioActual.pause();
        audioActual.currentTime = 0;
        audioActual = null;
    }

    speechSynthesis.cancel();

    document.getElementById("mensaje").innerText =
    "✔️ Recibido";

    setTimeout(() => {
        document.getElementById("mensaje").innerText =
        "Esperando aviso...";
    }, 3000);
}