const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");

// 🔊 Audio para el botón "No"
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

  // 🔁 reinicia y reproduce el sonido
  noSound.currentTime = 0;
  noSound.play().catch(() => {});

  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  if (intentos < frases.length) {
    noBtn.textContent = frases[intentos];
    intentos++;
  }
}

// 📱 iPhone / touch
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

// 💻 Desktop
noBtn.addEventListener("mouseenter", moveNoButton);

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
        animation: fadeIn .4s ease forwards;
      }
      .card {
        background:white;
        padding:30px;
        border-radius:22px;
        text-align:center;
        max-width:320px;
        width:90%;
        box-shadow:0 20px 40px rgba(0,0,0,.2);
        transform:scale(.9);
        opacity:0;
        animation: popIn .4s ease forwards;
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
        transition:.25s;
      }
      .fake-check.checked {
        background:#ff8fa3;
      }
      .fake-check span {
        color:white;
        font-size:18px;
        transform:scale(0);
        opacity:0;
        transition:.25s;
      }
      .fake-check.checked span {
        transform:scale(1);
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
        transition:.25s;
      }
      .continue.active {
        opacity:1;
        cursor:pointer;
      }
      @keyframes fadeIn { to { opacity:1 } }
      @keyframes popIn { to { transform:scale(1); opacity:1 } }
    </style>

    <div class="overlay">
      <div class="card">
        <h2>STOP!
        THIS IS A CACA INSPECTION 🤚</h2>
        <p>Confirma que no eres una caca</p>

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
    if (verified) return;
    verified = true;
    box.classList.add("checked");

    setTimeout(() => {
      msg.textContent = "✅ Verificado. Eres mi caca 😀";
      btn.classList.add("active");
    }, 300);
  });

  btn.addEventListener("click", () => {
    if (!verified) return;
    showFinalScreen();
  });
});
function showFinalScreen() {
  document.body.innerHTML = `
    <div style="
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      height:100vh;
      text-align:center;
      font-family: system-ui;
      padding:20px;
    ">
      <img src="final.gif" style="width:300px; max-width:90%; margin-bottom:20px;">
      <h1>espero que te haya gustado esta tonteria jejeje</h1>
      <p>Te ñamoooooooo ❤️</p>

      <div id="giftBtn" style="
        margin-top:25px;
        display:flex;
        align-items:center;
        gap:10px;
        font-size:18px;
        cursor:pointer;
        background:#ffa6b6;
        color:white;
        padding:12px 20px;
        border-radius:30px;
      ">
        <span style="font-size:24px;">🎁</span>
        <span>Te ganaste esto</span>
      </div>
    </div>
  `;

  document.getElementById("giftBtn").addEventListener("click", () => {
    document.body.innerHTML = `
      <video src="video.mp4" autoplay controls style="
        position:fixed;
        inset:0;
        width:100vw;
        height:100vh;
        object-fit:cover;
        background:black;
      "></video>
    `;
  });
}
