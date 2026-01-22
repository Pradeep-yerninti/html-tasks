
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







        // Hero Card Parallax
        const card = document.getElementById('interactive-card');
        const heroSection = card.closest('section');

        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xRotation = ((clientX / innerWidth) - 0.5) * 30;
            const yRotation = ((clientY / innerHeight) - 0.5) * -30;

            card.style.setProperty('--angle-x', `${xRotation}deg`);
            card.style.setProperty('--angle-y', `${yRotation}deg`);
            
            const layers = card.querySelectorAll('.floating-layer');
            layers.forEach((layer, index) => {
                const depth = (index + 1) * 20;
                const moveX = ((clientX / innerWidth) - 0.5) * depth;
                const moveY = ((clientY / innerHeight) - 0.5) * depth;
                layer.style.transform = `translateZ(${depth * 2}px) translateX(${moveX}px) translateY(${moveY}px)`;
            });
        });

        // Solutions Section Logic
        function handleScroll() {
            const reveals = document.querySelectorAll(".reveal");
            const progressLine = document.querySelector(".line-progress");
            const container = document.querySelector(".timeline-container");
            
            if (!container || !progressLine) return;

            const scrollPos = window.scrollY + window.innerHeight / 1.5;
            const containerTop = container.offsetTop;
            const containerHeight = container.offsetHeight;
            
            // Update vertical line progress
            let progress = ((window.scrollY + window.innerHeight / 2) - containerTop) / containerHeight * 100;
            progress = Math.max(0, Math.min(100, progress));
            progressLine.style.height = `${progress}%`;

            reveals.forEach(el => {
                const elementTop = el.getBoundingClientRect().top + window.scrollY;
                if (scrollPos > elementTop) {
                    el.classList.add("active");
                }
            });
        }

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        document.addEventListener("DOMContentLoaded", handleScroll);