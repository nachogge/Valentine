let musica;

const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");

// 🔊 Audio botón "No"
const noSound = new Audio("no.mp3");

const frases = [
  "oye :(",
  "dale govir",
  "oyeeeeee",
  "daleeeeeeeee",
  "pero lacon",
  "oh",
  "comprendo 😔",
  "maldita caca",
  "dale que no hice mas botones",
  "el ultimo",
  "chau"
];

let intentos = 0;

function moveNoButton() {
  const x = Math.random() * 220 - 110;
  const y = Math.random() * 220 - 110;

  noSound.currentTime = 0;
  noSound.play().catch(() => {});

  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  if (intentos < frases.length) {
    noBtn.textContent = frases[intentos];
    intentos++;
  }
}

// 📱 Touch
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

// 💻 Desktop
noBtn.addEventListener("mouseenter", moveNoButton);

// ❤️ CLICK EN "SÍ"
yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <style>
      .overlay {
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.25);
        display:flex;
        justify-content:center;
        align-items:center;
      }
      .card {
        background: rgba(255, 255, 255, 0.71); /* glass */
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.3);
        padding:30px;
        border-radius:22px;
        text-align:center;
        max-width:320px;
        width:90%;
        box-shadow:0 20px 40px rgba(0,0,0,.2);
        font-family: system-ui;
      }
      .fake-check {
        width:28px;
        height:28px;
        border:2px solid #ff8fa3;
        border-radius:6px;
        display:flex;
        align-items:center;
        justify-content:center;
        cursor:pointer;
      }
      .fake-check.checked {
        background:#ff8fa3;
      }
      .fake-check span {
        color:white;
        font-size:18px;
        opacity:0;
      }
      .fake-check.checked span {
        opacity:1;
      }
      .continue {
        margin-top:18px;
        padding:10px 22px;
        border:none;
        border-radius:22px;
        background:#ff8fa3;
        color:white;
        font-size:16px;
        opacity:.5;
        cursor:not-allowed;
      }
      .continue.active {
        opacity:1;
        cursor:pointer;
      }
    </style>

    <div class="overlay">
      <div class="card">
        <h2>STOP! 🤚</h2>
        <p>Confirmá que no sos una caca</p>

        <div style="display:flex; justify-content:center; gap:12px; margin:20px 0;">
          <div class="fake-check" id="checkBox"><span>✓</span></div>
          <span>No soy una caca</span>
        </div>

        <p id="captchaMsg" style="min-height:24px;"></p>

        <button class="continue" id="continueBtn">
          Continuar 👍
        </button>
      </div>
    </div>
  `;

  const box = document.getElementById("checkBox");
  const msg = document.getElementById("captchaMsg");
  const btn = document.getElementById("continueBtn");

  let verified = false;

  box.addEventListener("click", () => {
    verified = true;
    box.classList.add("checked");
    msg.textContent = "✅ Verificado. Eres mi caca 😀";
    btn.classList.add("active");
  });

  btn.addEventListener("click", () => {
    if (!verified) return;
    showFinalScreen();
  });
});


// 🎁 PANTALLA FINAL
function showFinalScreen() {

  musica = new Audio("cancion.m4a");
  musica.loop = true;
  musica.volume = 0;
  musica.play().catch(() => {});

  let v = 0;
  const fadeIn = setInterval(() => {
    v += 0.05;
    musica.volume = Math.min(v, 0.6);
    if (v >= 0.6) clearInterval(fadeIn);
  }, 120);

  document.body.innerHTML = `
    <div style="
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      height:100vh;
      text-align:center;
      font-family: system-ui;
      gap:14px;
    ">
      <img src="final.gif" style="width:300px; max-width:90%;">
      <h1>espero que te haya gustado esta tonteria jejeje</h1>
      <p>Te ñamoooooooo ❤️</p>

      <div 
        id="giftBtn"
        style="
          display:flex;
          align-items:center;
          gap:10px;
          font-size:18px;
          cursor:pointer;
          background:rgba(255, 155, 155, 0.61);
          color:;
          padding:12px 20px;
          border-radius:30px;
        "
      >
        🎁 Te ganaste esto
      </div>

      <img src="mac.gif" style="width:290px;">
    </div>
  `;

  document.getElementById("giftBtn").addEventListener("click", showWarning);
}

// ⚠️ AVISO LEGAL FALSO
function showWarning() { 
  document.body.insertAdjacentHTML("beforeend", `
    <div id="warning" style="
      position:fixed;
      inset:0;
      background:rgba(0,0,0,.4);
      display:flex;
      justify-content:center;
      align-items:center;
      font-family:system-ui;
    ">
      <div style="
        background:rgba(255, 255, 255, 0.71); /* transparencia tipo glass */
        backdrop-filter: blur(5px); /* efecto difuminado */
        -webkit-backdrop-filter: blur(10px);
        padding:25px;
        border-radius:20px;
        max-width:320px;
        text-align:center;
        box-shadow: 0 8px 32px 0 rgba(0,0,0,0.2); /* un poco de sombra */
        border: 1px solid rgba(255,255,255,0.3); /* borde sutil */
      ">
        <h3>⚠️ ¿Estás segura? ⚠️</h3>
        <!-- Imagen PG justo debajo -->
        <img src="pg.jpg" alt="pg" style="margin:10px 0; max-width:100%; height:auto;" />

        <p>A partir de acá no hay vuelta atrás...</p>

        <p style="font-size:11px; opacity:.7; margin-top:8px; text-align:left;">
          Al continuar, la usuaria reconoce que el contenido siguiente podría generar
          reacciones emocionales imprevistas.
        </p>

        <p style="font-size:11px; opacity:.7; text-align:left;">
          No se asumirá responsabilidad alguna por los efectos que pudieran derivarse
          de su visualización.
        </p>

        <div style="
          display:flex;
          gap:10px;
          margin-top:15px;
          justify-content:center;
        ">
          <button onclick="document.getElementById('warning').remove()">
            Cancelar
          </button>
          <button onclick="startVideo()">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  `);
}



// 🎬 ARRANQUE FINAL
function startVideo() {
  let vol = musica.volume;
  const fadeOut = setInterval(() => {
    vol -= 0.05;
    musica.volume = Math.max(vol, 0);
    if (vol <= 0) {
      clearInterval(fadeOut);
      musica.pause();
      musica.currentTime = 0;
      showVideoScreen();
    }
  }, 80);
}

function showVideoScreen() {
  document.body.innerHTML = `
    <video 
      src="video.mp4"
      autoplay
      controls
      style="
        position:fixed;
        inset:0;
        width:100vw;
        height:100vh;
        object-fit:cover;
        background:black;
      "
    ></video>
  `;
}
