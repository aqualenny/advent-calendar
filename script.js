// ----- open door -----
function openDoor(day){

  // Current date
  const now = new Date();
  const today = now.getDate();

  // If not ready
  if(day > today){
    showPopup();
    return;
  }

  // Ready
  window.location.href = `day${day}.html`;
}


// ----- popup -----
function showPopup(){
  const popup = document.getElementById("popup");
  popup.classList.remove("hidden");
  setTimeout(()=>popup.classList.add("hidden"),1500);
}

function updateCountdown(){
  const now = new Date();

  // If it's before Dec 12 -- countdown until Dec 12 midnight
  const startDay = 12;
  if(now.getMonth() === 11 && now.getDate() < startDay){
    const unlockTime = new Date(now.getFullYear(), 11, startDay, 0, 0, 0);
    const diff = unlockTime - now;

    const h = Math.floor(diff/3600000);
    const m = Math.floor((diff%3600000)/60000);
    const s = Math.floor((diff%60000)/1000);

    document.getElementById("countdown")
      .textContent = `First door opens in ${h}h ${m}m ${s}s`;
    return;
  }

  // After Dec 12 -- countdown until next midnight
  const midnight = new Date(now);
  midnight.setHours(24,0,0,0);

  const diff = midnight - now;

  const h = Math.floor(diff/3600000);
  const m = Math.floor((diff%3600000)/60000);
  const s = Math.floor((diff%60000)/1000);

  document.getElementById("countdown")
    .textContent = `Next unlock in ${h}h ${m}m ${s}s`;
}

updateCountdown();
setInterval(updateCountdown,1000);

// ----- Snowfall -----
window.addEventListener('load', () => {
  const snowCanvas = document.getElementById("snow");
  if (!snowCanvas || !snowCanvas.getContext) return;

  const ctx = snowCanvas.getContext("2d");

  function resizeCanvas() {
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
  }

  // Set size now + on window resize
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const flakes = [];
  const FLAKE_COUNT = 80;

  for (let i = 0; i < FLAKE_COUNT; i++) {
    flakes.push({
      x: Math.random() * snowCanvas.width,
      y: Math.random() * snowCanvas.height,
      r: Math.random() * 3 + 1,
      d: Math.random() * 0.5 + 0.5
    });
  }

  function drawSnow() {
    ctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    flakes.forEach(f => {
      ctx.beginPath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"; 
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function updateSnow() {
    flakes.forEach(f => {
      f.y += f.d;
      if (f.y > snowCanvas.height) {
        f.y = -5;
        f.x = Math.random() * snowCanvas.width;
      }
    });
  }

  function animateSnow() {
    drawSnow();
    updateSnow();
    requestAnimationFrame(animateSnow);
  }

  animateSnow();
});

