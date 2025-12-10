// ---------------- CONTENT FOR EACH DAY ----------------
const content = {
  1: { full: "<p>Day 1!</p>" },
  2: { full: "<p>Day 2!</p>" },
  // ...
  24: { full: "<p>Merry Christmas!</p>" }
};

// ---------------- DOOR LOGIC ----------------

function openDoor(day, door) {
  if (door.classList.contains("locked")) return;

  door.classList.add("open");

  // overlay
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.onclick = () => closeZoom(day);
  document.body.appendChild(overlay);

  const back = door.querySelector(".back");
  back.innerHTML = `
    <div class="back-content zoomed">
      ${content[day].full}
      <button class="back-button" onclick="closeZoom(${day})"
        style="margin-top:15px;padding:10px 15px;background:#ff4da6;color:white;border:none;border-radius:8px;">
        Back
      </button>
    </div>
  `;
}

function closeZoom(day) {
  const zoom = document.querySelector(".back-content.zoomed");
  if (zoom) zoom.remove();

  const overlay = document.querySelector(".modal-overlay");
  if (overlay) overlay.remove();

  const door = document.querySelector(`.door[data-day="${day}"]`);
  if (door) {
    door.classList.remove("open");
    door.querySelector(".back").innerHTML = "";
  }
}

// ---------------- LOCK FUTURE DAYS ----------------

const today = new Date().getDate();
document.querySelectorAll(".door").forEach(door => {
  const d = parseInt(door.dataset.day);
  if (d > today) door.classList.add("locked");
});

// ---------------- TIMER ----------------

function updateTimer() {
  const christmas = new Date(`December 25, ${new Date().getFullYear()}`).getTime();
  const now = Date.now();
  let diff = christmas - now;

  if (diff < 0) {
    timer.textContent = "MERRY CHRISTMAS!";
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  document.getElementById("timer").textContent =
    `${days}d ${hours}h ${mins}m ${secs}s`;
}

updateTimer();
setInterval(updateTimer, 1000);

// ---------------- SIMPLE SNOW ----------------

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let flakes = [];
for (let i = 0; i < 80; i++) {
  flakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    d: Math.random() + 1
  });
}

function snow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  flakes.forEach(f => {
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();
  });

  flakes.forEach(f => {
    f.y += f.d;
    if (f.y > canvas.height) {
      f.y = 0;
      f.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(snow);
}
snow();
