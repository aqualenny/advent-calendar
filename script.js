// ========== OPEN DOOR (modal + flip) ==========
function openDoor(day, door) {

    // prevent opening locked doors
    if (door.classList.contains("locked")) return;

    // visually flip
    door.classList.add("open");

    // dark background
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    document.body.appendChild(overlay);

    // insert zoom content
    const back = door.querySelector(".back");
    back.innerHTML = `
        <div class="back-content zoomed">
            ${content[day].full}
            <button class="back-button" onclick="closeZoom(${day})">Back</button>
        </div>
    `;
}



// ========== CLOSE ZOOM ==========
function closeZoom(day) {

    // remove zoom
    const zoom = document.querySelector(".back-content.zoomed");
    if (zoom) zoom.remove();

    // remove overlay
    const overlay = document.querySelector(".modal-overlay");
    if (overlay) overlay.remove();

    // unflip door
    const door = document.querySelector(\`.door[data-day="${day}"]\`);
    if (door) {
        door.classList.remove("open");

        // clear backside
        const back = door.querySelector(".back");
        if (back) back.innerHTML = "";
    }
}



// ========== YOUR ORIGINAL BUSINESS LOGIC ==========

// Auto-lock future days
(function lockFutureDoors(){
    const today = new Date().getDate();
    document.querySelectorAll('.door').forEach(door => {
        const day = parseInt(door.getAttribute('data-day'));
        if (day > today) door.classList.add('locked');
    });
})();

// Test unlock day 9
(function unlockDay9(){
    const door9 = document.querySelector('.door[data-day="9"]');
    if (door9) door9.classList.remove('locked');
})();


// ========== SIMPLE COUNTDOWN TIMER ==========
function updateTimer() {
  const christmas = new Date("December 25, " + new Date().getFullYear()).getTime();
  const now = new Date().getTime();
  const distance = christmas - now;

  if (distance < 0) {
    document.getElementById("timer").textContent = "MERRY CHRISTMAS!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("timer").textContent =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

updateTimer();
setInterval(updateTimer, 1000);

