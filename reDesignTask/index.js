
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#6366f1" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#6366f1", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true } },
            "retina_detect": true
        });

        // Menu Logic
        const menuToggle = document.getElementById('menu-toggle');
        const menuClose = document.getElementById('menu-close');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuFooter = document.getElementById('menu-footer');
        const servicesParent = document.getElementById('services-parent');
        const servicesDropdown = document.getElementById('services-dropdown');
        const chevron = document.getElementById('chevron');

        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            menuFooter.classList.remove('opacity-0', 'translate-y-10');
        });

        menuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuFooter.classList.add('opacity-0', 'translate-y-10');
            servicesDropdown.classList.remove('show');
            chevron.style.transform = 'rotate(0deg)';
        });

        servicesParent.addEventListener('click', () => {
            servicesDropdown.classList.toggle('show');
            chevron.style.transform = servicesDropdown.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
        });

        // Carousel logic
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const totalSlides = slides.length;

        function updateCarousel() {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                dots[index].classList.remove('active');
                if (index === currentSlide) {
                    slide.classList.add('active');
                    dots[index].classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }

        let slideInterval = setInterval(nextSlide, 5000);

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-item, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));
    
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-1').forEach(el => {
            observer.observe(el);
        });


 function positionCompanyInfoOrbitItems() {
            const container = document.querySelector('.company-info-circular-container');
            const items = document.querySelectorAll('.company-info-orbit-item');
            
            if (!container || items.length === 0) return;

            // Use container bounds to calculate radius dynamically
            const rect = container.getBoundingClientRect();
            const radius = rect.width / 2; 
            const centerX = radius; 
            const centerY = radius;

            items.forEach((item, i) => {
                // Calculate position on the circle
                const angle = (i / items.length) * (2 * Math.PI);
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                
                // Position absolute from top-left, then use transform to center the item element itself on that point
                item.style.left = `${x}px`;
                item.style.top = `${y}px`;
                item.style.transform = 'translate(-50%, -50%)';
            });
        }

        // Initialize and handle window changes
        window.addEventListener('load', positionCompanyInfoOrbitItems);
        window.addEventListener('resize', positionCompanyInfoOrbitItems);

        // Content Data
        const companyData = [
            {
                title: "1.Discover Your Needs",
                desc: "  Analyze your business goals with our experts to identify tailored IT and AI solutions for maximum impact.We foster an environment where creativity meets technology. Our teams are empowered to build solutions that define the next generation of digital excellence Discovering your needs involves self-reflection, body awareness, and asking key questions about your feelings, desires, and what brings you fulfillment or frustration, often using frameworks like safety."
            },
            {
                title: "2. Strategize & Plan",
                desc: "Collaborate with our experts to craft a customized strategy aligning IT and AI solutions with your business objectives.To strategize and plan, first define your big-picture vision and goals (strategy), answering what and why, then create detailed steps (plan), answering how, when, and who, to achieve those goals"
            },
            {
                title: "3. Implement Solutions",
                desc: "Deploy secure IT, BPO, e-commerce, or web development services with seamless integration. To implement a solution, you must plan and prepare (define scope, resources, stakeholders, create action plan with tasks/metrics/deadlines), execute the plan, starting with small tests or the most affected groups, and then monitor, review, and adjust the solution to ensure it solves the problem effectively, communicating all steps to stakeholders for buy-in and accountability"
            },
            {
                title: "4. Optimize Performance",
                desc: "Leverage AI-driven insights and AIOps to enhance operations and reduce downtime.Optimizing performance means making systems, applications, or processes more efficient, faster, and effective by reducing bottlenecks, improving resource use, and enhancing user experience"
            },
            {
                title: "Global Reach",
                desc: "Serving millions of users across 40+ countries. Our infrastructure is built for scale, reliability, and world-class performance."
            }
        ];

        function updateCompanyInfo(index) {
            const container = document.getElementById('company-info-content');
            const title = document.getElementById('company-info-title');
            const desc = document.getElementById('company-info-desc');

            container.classList.add('company-info-content-hidden');

            setTimeout(() => {
                title.innerText = companyData[index].title;
                desc.innerText = companyData[index].desc;
                container.classList.remove('company-info-content-hidden');
            }, 300);
        }

        const headingText = "About Oppty TechHub: Pioneering Your Success";
    const paragraphText = "At Oppty TechHub, we blend innovation and expertise to empower businesses with transformative IT, BPO, e-commerce, web development, and AI solutions. Committed to excellence, we build opportunities for growth, collaboration, and success in a dynamic digital world.";

    function createWaveContent(elementId, text, baseDelay) {
        const container = document.getElementById(elementId);
        const words = text.split(" ");
        
        words.forEach((word, i) => {
            const span = document.createElement("span");
            span.textContent = word;
            span.className = "word animate-wave";
            span.style.animationDelay = `${baseDelay + (i * 0.05)}s`;
            container.appendChild(span);
        });
    }

    window.onload = () => {
        // Initialize wave text
        createWaveContent("wave-heading", headingText, 0);
        createWaveContent("wave-paragraph", paragraphText, 0.5);

        // Card Entrance Logic
        const cards = document.querySelectorAll('.water-card');
        cards.forEach((card, index) => {
            card.classList.add('animate-in');
            card.addEventListener('animationend', (e) => {
                if (e.animationName === 'entranceFlip') {
                    card.classList.remove('animate-in');
                    card.style.opacity = '1';
                    card.style.transform = 'rotateY(0deg)';
                    card.classList.add('floating-active');
                    card.style.animationDelay = `${index * 0.3}s`;
                }
            });
        });
    };