const scrollElements = document.querySelectorAll('.scroll');

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    },
    { threshold: 0.2 }
);

scrollElements.forEach(el => observer.observe(el));


// Subtle hover elevation (optional UX polish)
const cards = document.querySelectorAll('.office-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.transition = '0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});
