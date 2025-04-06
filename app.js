const targetDate = new Date("April 11, 2025 15:05:00").getTime();

function updateNumber(id, newVal) {
  const container = document.getElementById(id);
  const oldSlide = container.querySelector(".slide");

  // If the current digit is already the new value, do nothing.
  if (oldSlide && oldSlide.innerText === newVal) return;

  // Create the new slide and position it below the visible area.
  const newSlide = document.createElement("div");
  newSlide.className = "slide";
  newSlide.innerText = newVal;
  newSlide.style.position = "absolute";
  newSlide.style.transform = "translateY(100%)";
  newSlide.style.opacity = "0";

  container.appendChild(newSlide);

  // Force reflow to ensure the browser registers the new element.
  newSlide.offsetHeight;

  // Animate: new digit slides up into place, old digit slides up and fades.
  requestAnimationFrame(() => {
    newSlide.style.transform = "translateY(0)";
    newSlide.style.opacity = "1";
    if (oldSlide) {
      oldSlide.style.transform = "translateY(-100%)";
      oldSlide.style.opacity = "0";
    }
  });

  // After the transition, clear out any old digits.
  setTimeout(() => {
    container.innerHTML = "";
    container.appendChild(newSlide);
  }, 550);
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    clearInterval(countdownFunc);
    document.querySelector(".countdown").innerHTML =
      "<div class='number'><div class='slide'>It's Time!</div></div>";
    return;
  }

  const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0");
  const hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
  const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0");

  updateNumber("days", days);
  updateNumber("hours", hours);
  updateNumber("minutes", minutes);
  updateNumber("seconds", seconds);
}

// Initialize countdown immediately and then update every second.
updateCountdown();
const countdownFunc = setInterval(updateCountdown, 1000);
