// Content object is inlined in index.html script tag

function openDoor(day, door) {
    // if the door is locked, do nothing
    if (door.classList.contains("locked")) return;

    // flip the door
    door.classList.add("open");

    // create overlay
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    document.body.appendChild(overlay);

    // fill the back content
    const back = door.querySelector(".back");
    back.innerHTML = `
        <div class="back-content zoomed">
            ${content[day].full}
            <button class="back-button" onclick="closeZoom(${day})">Back</button>
        </div>
    `;
}

function closeZoom(day) {

    // remove zoom styling
    const backContent = document.querySelector('.back-content.zoomed');
    if (backContent) backContent.classList.remove('zoomed');

    // remove overlay
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) overlay.remove();

    // close the door visually
    const door = document.querySelector(`.door[data-day="${day}"]`);
    if (door) door.classList.remove("open");

    // clear inside
    const back = door.querySelector(".back");
    back.innerHTML = "";
    }
} 

  const backContent = back.querySelector(".back-content");
  const backButton = back.querySelector(".back-button");

  // Get door position and size
  const doorRect = door.getBoundingClientRect();

  // Set initial style of backContent to match door position & size
  backContent.style.position = "fixed";
  backContent.style.top = doorRect.top + "px";
  backContent.style.left = doorRect.left + "px";
  backContent.style.width = doorRect.width + "px";
  backContent.style.height = doorRect.height + "px";
  backContent.style.opacity = "1";
  backContent.style.borderRadius = "12px";
  backContent.style.boxShadow = "0 8px 25px rgba(255, 105, 180, 0.6)";
  backContent.style.background = "#fff";
  backContent.style.transition = "all 0.5s ease";
  backContent.style.overflow = "auto";
	backContent.style.zIndex = 10000

  door.classList.add("opening");

  setTimeout(() => {
    door.classList.remove("opening");
    door.classList.add("open");

    // Calculate center position and size for zoomed state
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const targetWidth = vw * 0.9;
    const targetHeight = vh * 0.8;

    const targetTop = (vh - targetHeight) / 2 - vh * 0.15;
    const targetLeft = (vw - targetWidth) / 2;

    // Animate to center + bigger size
    requestAnimationFrame(() => {
      backContent.style.top = targetTop + "px";
      backContent.style.left = targetLeft + "px";
      backContent.style.width = targetWidth + "px";
      backContent.style.height = targetHeight + "px";
      backContent.style.borderRadius = "20px";
      backContent.style.boxShadow = "0 15px 40px rgba(255, 105, 180, 0.9)";
      backContent.style.zIndex = 9999;
    });

    backButton.focus();

    backButton.addEventListener("click", (e) => {
      e.stopPropagation();

      // Animate back to door position and size
      backContent.style.top = doorRect.top + "px";
      backContent.style.left = doorRect.left + "px";
      backContent.style.width = doorRect.width + "px";
      backContent.style.height = doorRect.height + "px";
      backContent.style.borderRadius = "12px";
      backContent.style.boxShadow = "0 8px 25px rgba(255, 105, 180, 0.6)";
      backContent.style.zIndex = 100;

      backContent.addEventListener(
        "transitionend",
        function handler(event) {
          if (event.propertyName === "top" || event.propertyName === "left") {
            door.classList.remove("open");
            back.innerHTML = "";
            backContent.removeEventListener("transitionend", handler);
          }
        },
        { once: true }
      );
    });
  }, 800);
}

// Countdown timer for next door unlock (midnight next day)
function updateTimer() {
  const now = new Date();
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  );
  const diff = midnight - now;

  if (diff <= 0) {
    document.getElementById("timer").textContent =
      "A new door just unlocked! Refresh to see.";
    return;
  }

  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById(
    "timer"
  ).textContent = `Next door unlocks in ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateTimer, 1000);
updateTimer();

// --- Falling snow effect ---

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
let width, height;
let snowflakes = [];

function initSnow() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  snowflakes = [];
  for (let i = 0; i < 150; i++) {
    snowflakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      speedY: Math.random() * 1 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random(),
    });
  }
}

function updateSnow() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.beginPath();

  snowflakes.forEach((flake) => {
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);

    flake.y += flake.speedY;
    flake.x += flake.speedX;

    if (flake.y > height) {
      flake.y = 0;
      flake.x = Math.random() * width;
    }
    if (flake.x > width) flake.x = 0;
    if (flake.x < 0) flake.x = width;
  });

  ctx.fill();
  requestAnimationFrame(updateSnow);
}

window.addEventListener("resize", () => {
  initSnow();
});

initSnow();
updateSnow();