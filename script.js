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


// ----- countdown until midnight -----
function updateCountdown(){
  const now = new Date();
  const midnight = new Date();
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
