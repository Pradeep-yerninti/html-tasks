const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".right");
const prev = document.querySelector(".left");

let index = 0;

function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
}

next.onclick = () => {
    index = (index + 1) % slides.length;
    showSlide(index);
};

prev.onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
};

// Auto slide every 5 seconds
setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
}, 4000);
showSlide(index);


const track = document.querySelector(".testimonial-track");
let cards = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".testimonial-dots span");

const cardWidth = 33.333;
let a = 1;
let isTransitioning = false;

/* CLONE FIRST & LAST */
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

firstClone.classList.add("clone");
lastClone.classList.add("clone");

track.appendChild(firstClone);
track.insertBefore(lastClone, cards[0]);

cards = document.querySelectorAll(".testimonial-card");

/* INITIAL POSITION */
track.style.transform = `translateX(-${cardWidth * a}%)`;

/* UPDATE ACTIVE STATES */
function updateActive(realIndex) {
    cards.forEach(c => c.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    cards[realIndex + 1].classList.add("active");
    dots[realIndex].classList.add("active");
}

/* MOVE SLIDER */
function moveSlider() {
    if (isTransitioning) return;
    isTransitioning = true;

    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${cardWidth * a}%)`;
}

/* AUTO SLIDE */
let autoSlide = setInterval(() => {
    a++;
    moveSlider();
}, 4000);

/* TRANSITION END */
track.addEventListener("transitionend", () => {
    if (cards[a].classList.contains("clone")) {
        track.style.transition = "none";
        a = a === 0 ? cards.length - 2 : 1;
        track.style.transform = `translateX(-${cardWidth * a}%)`;
    }

    updateActive(a - 1);
    isTransitioning = false;
});

/* ✅ DOT CLICK (FIXED) */
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        clearInterval(autoSlide);   // stop auto
        a = i + 1;
        moveSlider();

        autoSlide = setInterval(() => {
            a++;
            moveSlider();
        }, 9000);
    });
});

/* INIT */
updateActive(0);


document.addEventListener("DOMContentLoaded", () => {
    const aboutLeft = document.querySelector(".about-left");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // add animation when visible
                    aboutLeft.classList.add("show");
                } else {
                    // remove animation when out of view
                    aboutLeft.classList.remove("show");
                }
            });
        },
        {
            threshold: 0.3
        }
    );

    observer.observe(aboutLeft);
});


// Simple scroll animation trigger
const boxes = document.querySelectorAll('.footer-box');

window.addEventListener('scroll', () => {
    boxes.forEach(box => {
        const pos = box.getBoundingClientRect().top;
        if (pos < window.innerHeight - 100) {
            box.style.opacity = 1;
            box.style.transform = 'translateY(0)';
        }
    });
});



