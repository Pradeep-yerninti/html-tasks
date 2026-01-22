
        document.addEventListener('DOMContentLoaded', () => {
            const menuToggle = document.getElementById('menu-toggle');
            const menuClose = document.getElementById('menu-close');
            const mobileMenu = document.getElementById('mobile-menu');
            const overlay = document.getElementById('overlay');
            const servicesParent = document.getElementById('services-parent');
            const servicesDropdown = document.getElementById('services-dropdown');
            const chevron = document.getElementById('chevron');

            const openMenu = () => {
                mobileMenu.classList.add('active');
                overlay.classList.add('active');
                menuToggle.classList.add('is-active');
                document.body.style.overflow = 'hidden';
            };

            const closeMenu = () => {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                menuToggle.classList.remove('is-active');
                servicesDropdown.classList.remove('show');
                servicesDropdown.style.height = "0";
                chevron.style.transform = 'rotate(0deg)';
                document.body.style.overflow = '';
            };

            menuToggle.addEventListener('click', openMenu);
            menuClose.addEventListener('click', closeMenu);
            overlay.addEventListener('click', closeMenu);

            servicesParent.addEventListener('click', () => {
                const isOpening = !servicesDropdown.classList.contains('show');
                
                if (isOpening) {
                    servicesDropdown.classList.add('show');
                    // Calculate exact height for a smooth transition
                    servicesDropdown.style.height = servicesDropdown.scrollHeight + "px";
                    chevron.style.transform = 'rotate(180deg)';
                    servicesParent.style.color = 'var(--primary)';
                } else {
                    servicesDropdown.classList.remove('show');
                    servicesDropdown.style.height = "0";
                    chevron.style.transform = 'rotate(0deg)';
                    servicesParent.style.color = 'white';
                }
            });
        });


        //section-1
         let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-item');
        const dots = document.querySelectorAll('.dot');
        const ctaButton = document.getElementById('fixed-cta');

        const buttonConfigs = [
            { color: 'bg-blue-600', hover: 'hover:bg-blue-700' },
            { color: 'bg-blue-600', hover: 'hover:bg-blue-700' },
            { color: 'bg-blue-600', hover: 'hover:bg-blue-700' }
        ];

        function updateCarousel() {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                dots[index].classList.remove('bg-white');
                dots[index].classList.add('bg-white/40');
                if (index === currentSlide) {
                    slide.classList.add('active');
                    dots[index].classList.add('bg-white');
                    dots[index].classList.remove('bg-white/40');
                    
                    const config = buttonConfigs[index];
                    ctaButton.innerText = 'Learn More';
                    ctaButton.className = `text-white font-bold py-3 px-10 rounded-full shadow-lg transition duration-300 transform hover:scale-105 ${config.color} ${config.hover}`;
                }
            });
        }

        function changeSlide(direction) {
            currentSlide = (currentSlide + direction + slides.length) % slides.length;
            updateCarousel();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
        }

        setInterval(() => {
            changeSlide(1);
        }, 6000);

        updateCarousel();





         const revealCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, {
            threshold: 0.1
        });

        document.querySelectorAll('.reveal').forEach(el => {
            revealObserver.observe(el);
        });








        const modal = document.getElementById('reviewModal');
        const openBtn = document.getElementById('openReviewBtn');
        const closeBtn = document.getElementById('closeModal');
        const form = document.getElementById('reviewForm');
        const stars = document.querySelectorAll('.rating-star');
        const toast = document.getElementById('toast');
        let selectedRating = 0;

        // Modal Toggle
        openBtn.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Rating Selection
        stars.forEach(star => {
            star.addEventListener('click', () => {
                selectedRating = parseInt(star.getAttribute('data-rating'));
                updateStars(selectedRating);
            });

            star.addEventListener('mouseover', () => {
                updateStars(parseInt(star.getAttribute('data-rating')));
            });

            star.addEventListener('mouseout', () => {
                updateStars(selectedRating);
            });
        });

        function updateStars(rating) {
            stars.forEach((s, idx) => {
                if (idx < rating) {
                    s.classList.remove('text-slate-700');
                    s.classList.add('text-yellow-500');
                } else {
                    s.classList.add('text-slate-700');
                    s.classList.remove('text-yellow-500');
                }
            });
        }

        // Form Submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (selectedRating === 0) {
                alert('Please select a rating before submitting.');
                return;
            }

            const submitBtn = form.querySelector('button');
            submitBtn.disabled = true;
            submitBtn.innerText = 'Submitting...';

            setTimeout(() => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                toast.classList.remove('translate-y-32');
                form.reset();
                selectedRating = 0;
                updateStars(0);
                submitBtn.disabled = false;
                submitBtn.innerText = 'Submit Review';

                setTimeout(() => {
                    toast.classList.add('translate-y-32');
                }, 3000);
            }, 1000);
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });