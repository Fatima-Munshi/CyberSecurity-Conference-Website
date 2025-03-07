// Variables
let currentSlide = 0;
const slides = document.querySelectorAll('.event-slide');
const dots = document.querySelectorAll('.dot');
const togglePill = document.querySelector('.toggle-pill');
let day = 1;

// Initialize touch events
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', function () {
    // Add touch event listeners
    document.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    // Add drag event listeners
    let isDragging = false;
    let startDragX = 0;

    document.addEventListener('mousedown', function (e) {
        isDragging = true;
        startDragX = e.clientX;
        document.body.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;

        const diff = startDragX - e.clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToSlide(currentSlide + 1);
            } else {
                goToSlide(currentSlide - 1);
            }
            isDragging = false;
            document.body.style.cursor = 'default';
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
        document.body.style.cursor = 'default';
    });

    // Add day toggle functionality
    togglePill.addEventListener('click', function () {
        this.classList.toggle('day-2');
        day = this.classList.contains('day-2') ? 2 : 1;
        // Here you would load the day 2 content
        console.log(`Switched to Day ${day}`);
    });
});

// Handle swipe
function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left
        goToSlide(currentSlide + 1);
    } else if (touchEndX > touchStartX + 50) {
        // Swipe right
        goToSlide(currentSlide - 1);
    }
}

// Navigate to slide with smooth animation
function goToSlide(index) {
    // Validate index
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    // Skip if already on this slide
    if (index === currentSlide) return;

    // Hide any open details before transitioning
    hideAllDetails();

    // Set slide classes with direction-aware animations
    const direction = index > currentSlide ? 'next' : 'prev';

    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev', 'next');

        if (i === currentSlide) {
            slide.classList.add(direction === 'next' ? 'prev' : 'next');
        } else if (i === index) {
            slide.classList.add('active');
        } else if (
            (direction === 'next' && i > currentSlide && i < index) ||
            (direction === 'next' && index < currentSlide && i > currentSlide) ||
            (direction === 'prev' && i < currentSlide && i > index) ||
            (direction === 'prev' && index > currentSlide && i < currentSlide)
        ) {
            slide.classList.add(direction);
        } else {
            slide.classList.add(i < index ? 'prev' : 'next');
        }
    });

    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    // Update current slide
    currentSlide = index;
}

// Show details and hide the show button
function showDetails(id) {
    const details = document.getElementById(`details-${id}`);
    const button = document.getElementById(`show-button-${id}`);

    details.classList.add('show');
    button.style.display = 'none';
}

// Hide details and show the show button
function hideDetails(id) {
    const details = document.getElementById(`details-${id}`);
    const button = document.getElementById(`show-button-${id}`);

    details.classList.remove('show');
    button.style.display = 'inline-block';
}

// Hide all details when changing slides
function hideAllDetails() {
    const allDetails = document.querySelectorAll('.event-details');
    const allButtons = document.querySelectorAll('[id^="show-button-"]');

    allDetails.forEach(detail => {
        detail.classList.remove('show');
    });

    allButtons.forEach(button => {
        button.style.display = 'inline-block';
    });
}

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
        goToSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft') {
        goToSlide(currentSlide - 1);
    }
});

// Enable auto-rotate functionality with reduced time
let autoplayInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
}, 4000); // Reduced from 5000 to 4000ms

// Pause autoplay when user interacts with slider
document.querySelector('.event-slides').addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

document.querySelector('.event-slides').addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 4000); // Reduced from 8000 to 4000ms
});