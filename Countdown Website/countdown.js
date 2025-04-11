/* -------------------------------
   Countdown Overlay & Reveal Logic
   ------------------------------- */

// Set your target date/time.
const targetDate = new Date("April 11, 2025 15:05:00").getTime();
//const targetDate = new Date("April 11, 2025 13:39:00").getTime();

// Define countdownInterval variable in global scope
let countdownInterval = null;

/**
 * updateNumber()
 * Updates the given number element with a sliding animation.
 */
function updateNumber(id, newVal) {
  const container = document.getElementById(id);
  const oldSlide = container.querySelector(".slide");

  // If the number hasn't changed, do nothing.
  if (oldSlide && oldSlide.innerText === newVal) return;

  // Create a new slide for the updated number.
  const newSlide = document.createElement("div");
  newSlide.className = "slide";
  newSlide.innerText = newVal;
  newSlide.style.position = "absolute";
  newSlide.style.transform = "translateY(100%)";
  newSlide.style.opacity = "0";

  container.appendChild(newSlide);
  // Force reflow so the browser picks up the new element.
  newSlide.offsetHeight;

  // Animate: new slide comes in while the old slide slides out.
  requestAnimationFrame(() => {
    newSlide.style.transform = "translateY(0)";
    newSlide.style.opacity = "1";
    if (oldSlide) {
      oldSlide.style.transform = "translateY(-100%)";
      oldSlide.style.opacity = "0";
    }
  });

  // Clean up the old slide after the animation.
  setTimeout(() => {
    container.innerHTML = "";
    container.appendChild(newSlide);
  }, 550);
}

/**
 * updateCountdown()
 * Calculates the time remaining and updates each number.
 */
function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // When the countdown is finished, clear the interval and reveal content.
  if (distance < 0) {
    clearInterval(countdownInterval);
    revealMainContent();
    return;
  }

  // Calculate remaining days, hours, minutes, and seconds.
  const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0");
  const hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
  const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0");

  updateNumber("days", days);
  updateNumber("hours", hours);
  updateNumber("minutes", minutes);
  updateNumber("seconds", seconds);
}

/**
 * revealMainContent()
 * Fades out the overlay and reveals the main website content.
 * It now only removes the container-level hidden class, preserving
 * the hidden-left/hidden-bottom classes for later animations.
 */
function revealMainContent() {
  console.log("Revealing main site...");

  const overlay = document.getElementById("countdown-overlay");
  if (overlay) {
    // Start the fade-out animation.
    overlay.classList.add("fade-out");

    // After the fade-out animation ends, hide the overlay and show the main site.
    setTimeout(() => {
      overlay.style.display = "none";
      
      const mainSite = document.getElementById("main-site");
      if (mainSite) {
        mainSite.classList.remove("hidden-under-overlay");
        mainSite.classList.add("visible-site");
        // Do not remove the hidden-left/hidden-bottom classes so that Intersection Observer will animate them.
      }
    }, 1000); // Duration should match your CSS transition time.
  }
}

// Immediately check if the target date is already passed.
if (new Date().getTime() >= targetDate) {
  // If the countdown time has already expired, reveal the main site immediately.
  revealMainContent();
} else {
  // Otherwise, update the countdown now and start the countdown interval.
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

/*
// Listen for the "b" key; when pressed, clear the countdown interval and reveal the main site.
document.addEventListener("keydown", function(event) {
  if (event.key.toLowerCase() === "b") {
    clearInterval(countdownInterval);
    revealMainContent();
  }
});*/


const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log("prom")
      if (entry.target.classList.contains('hidden-bottom')) {
        entry.target.classList.add('show-bottom');
        console.log("sorry")
      } else if (entry.target.classList.contains('hidden-left')) {
        entry.target.classList.add('show-left');
      }
    }
     //Optionally, avoid removing the show classes if you want one-time animations:
     else {
       entry.target.classList.remove('show-bottom', 'show-left');
     }
  });
});

const hiddenElements = document.querySelectorAll('.hidden-bottom, .hidden-left');
hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener("keydown", function(event) {
  if (event.key.toLowerCase() === "c") {
    "runninginginginging"
  }
});


