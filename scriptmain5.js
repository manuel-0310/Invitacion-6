/* ============================================================
   COUNTDOWN — 12 de Septiembre 2026, 3:00 PM
   ============================================================ */
const weddingDate = new Date("Sep 12, 2026 15:00:00").getTime();

const timer = setInterval(function () {
    const now      = new Date().getTime();
    const distance = weddingDate - now;

    const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText    = days    < 10 ? "0" + days    : days;
    document.getElementById("hours").innerText   = hours   < 10 ? "0" + hours   : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("timer").innerHTML =
            "<p style='font-family:var(--font-script);font-size:2.5rem;color:var(--azul);'>¡Llegó el día! 🎉</p>";
    }
}, 1000);

/* ============================================================
   MÚSICA
   ============================================================ */
window.addEventListener("DOMContentLoaded", () => {
    const audio   = document.getElementById("miMusica");
    const btn     = document.getElementById("btnMusica");
    const textoEl = document.getElementById("texto");

    if (!audio || !btn || !textoEl) return;

    if (localStorage.getItem("reproducirMusica") === "true") {
        audio.play();
        btn.classList.add("sonando");
        textoEl.innerText = "Pausar";
        localStorage.removeItem("reproducirMusica");
    }

    btn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            btn.classList.add("sonando");
            textoEl.innerText = "Pausar";
        } else {
            audio.pause();
            btn.classList.remove("sonando");
            textoEl.innerText = "Canción";
        }
    });
});

function iniciarMusicaDesdeIntro() {
    const audio   = document.getElementById("miMusica");
    const btn     = document.getElementById("btnMusica");
    const textoEl = document.getElementById("texto");
    if (!audio || !btn || !textoEl) return;

    audio.play().then(() => {
        btn.classList.add("sonando");
        textoEl.innerText = "Pausar";
    }).catch(() => {
        textoEl.innerText = "Canción";
    });
}

window.iniciarMusicaDesdeIntro = iniciarMusicaDesdeIntro;

/* ============================================================
   INTRO — sello → sobre → tarjeta → continuar
   ============================================================ */
const sello        = document.getElementById('sello');
const btnContinuar = document.getElementById('btn-continuar');
const sobreCerrado = document.getElementById('sobre-cerrado');
const sobreAbierto = document.getElementById('sobre-abierto');
const tarjetaIntro = document.getElementById('tarjeta-intro');
const overlay      = document.getElementById('intro-overlay');
const mainContent  = document.getElementById('main-content');

function iniciarAnimacion() {
    sello.classList.add('girar-desvanecer');
    setTimeout(() => { sobreCerrado.style.opacity = '0'; sobreAbierto.style.opacity = '1'; }, 1000);
    setTimeout(() => { tarjetaIntro.classList.add('subir-tarjeta'); }, 1800);
    setTimeout(() => { btnContinuar.classList.add('mostrar-boton'); }, 2800);
}

function continuarIntro() {
    overlay.classList.add('ocultar-overlay');
    if (mainContent) mainContent.classList.remove('hidden');
    if (window.iniciarMusicaDesdeIntro) window.iniciarMusicaDesdeIntro();
    setTimeout(() => { overlay.style.display = 'none'; }, 750);
}

if (sello)        sello.addEventListener('click', iniciarAnimacion);
if (btnContinuar) btnContinuar.addEventListener('click', continuarIntro);

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   EMAILJS — RSVP
   ============================================================ */
(function () {
    emailjs.init("O9TA18-zps7iaEptM");
})();

const btnEnviar = document.getElementById('button-send');

document.getElementById('rsvp-form').addEventListener('submit', function (event) {
    event.preventDefault();

    btnEnviar.innerText = 'ENVIANDO...';
    btnEnviar.style.opacity = '0.7';

    emailjs.sendForm('service_6m7prwn', 'template_41pvc6t', this)
        .then(() => {
            btnEnviar.innerText = '¡ENVIADO!';
            btnEnviar.style.backgroundColor = '#27ae60';
            alert('¡Gracias! Tu confirmación ha sido recibida.');
            this.reset();
        }, (err) => {
            btnEnviar.innerText = 'ERROR';
            btnEnviar.style.backgroundColor = '#e74c3c';
            alert('Hubo un error: ' + JSON.stringify(err));
        });
});
