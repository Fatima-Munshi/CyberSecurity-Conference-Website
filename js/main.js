// main.js

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menuIcon');
    sidebar.classList.toggle('open');
    menuIcon.textContent = sidebar.classList.contains('open') ? 'close' : 'menu';
  }
  
  // Animate Flip for Countdown
  function animateFlip(cardId, newVal) {
    const container = document.getElementById(cardId);
    const card = container.querySelector('.card');
    const currentVal = container.getAttribute('data-value');
    if (currentVal === newVal) return;
    card.classList.add('flip');
    setTimeout(() => {
      card.querySelector('span').textContent = newVal;
      container.setAttribute('data-value', newVal);
    }, 300);
    card.addEventListener('animationend', function handler() {
      card.classList.remove('flip');
      card.removeEventListener('animationend', handler);
    });
  }
  
  // Countdown Timer
  function startCountdown(endTime) {
    function updateCountdown() {
      const now = Date.now();
      const distance = endTime - now;
      if (distance < 0) {
        clearInterval(interval);
        document.getElementById('countdown').innerHTML = '<h2>Event Started!</h2>';
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      const fDays = days < 10 ? '0' + days : days.toString();
      const fHours = hours < 10 ? '0' + hours : hours.toString();
      const fMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
      const fSeconds = seconds < 10 ? '0' + seconds : seconds.toString();
      
      animateFlip('days', fDays);
      animateFlip('hours', fHours);
      animateFlip('minutes', fMinutes);
      animateFlip('seconds', fSeconds);
    }
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
  }
  
  // Initialize Countdown with Event Date (June 20, 2025)
  const eventDate = new Date("June 20, 2025 00:00:00").getTime();
  startCountdown(eventDate);
  
  // Intersection Observer for Section Animations
  const sections = document.querySelectorAll('.section-container');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(section => observer.observe(section));
  
  // Dashboard Toggle for Day 1 / Day 2
  function toggleDay(day) {
    const day1 = document.getElementById('day1-dashboard');
    const day2 = document.getElementById('day2-dashboard');
    const btnDay1 = document.getElementById('day1-btn');
    const btnDay2 = document.getElementById('day2-btn');
    if (day === 'day1') {
      day1.style.display = 'flex';
      day2.style.display = 'none';
      btnDay1.classList.add('active');
      btnDay2.classList.remove('active');
    } else {
      day1.style.display = 'none';
      day2.style.display = 'flex';
      btnDay1.classList.remove('active');
      btnDay2.classList.add('active');
    }
  }

// about section//
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});


// Select all elements with class "reveal"
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add("visible");
        }
    });
}

// Run function when scrolling
window.addEventListener("scroll", revealOnScroll);

// Run on page load to check initial position
window.onload = revealOnScroll;
  
