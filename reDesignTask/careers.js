
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




          // Hero Slider Logic
        const slides = document.querySelectorAll('.hero-slide');
        let currentSlide = 0;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, 5000);

        // Intersection Observer for Reveal Animations
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-reveal').forEach(el => observer.observe(el));

        // Interaction Feedback
        function showMessage() {
            const feedback = document.getElementById('feedback');
            feedback.classList.remove('hidden');
            setTimeout(() => {
                feedback.classList.add('hidden');
            }, 3000);
        }

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        









        // Form Logic
        const btnStudent = document.getElementById('form-btn-student');
        const btnCollege = document.getElementById('form-btn-college');
        const studentFields = document.getElementById('form-student-fields');
        const collegeFields = document.getElementById('form-college-fields');
        const enrollmentForm = document.getElementById('form-enrollment');
        const mainContent = document.getElementById('form-main-content');
        const successMsg = document.getElementById('form-success-message');

        btnStudent.addEventListener('click', () => {
            btnStudent.classList.add('form-active');
            btnCollege.classList.remove('form-active', 'text-sky-400');
            btnCollege.classList.add('text-gray-500');
            studentFields.classList.remove('form-hidden-section');
            collegeFields.classList.add('form-hidden-section');
            document.querySelectorAll('.form-student-input').forEach(i => i.required = true);
            document.querySelectorAll('.form-college-input').forEach(i => i.required = false);
        });

        btnCollege.addEventListener('click', () => {
            btnCollege.classList.add('form-active');
            btnStudent.classList.remove('form-active');
            btnStudent.classList.add('text-gray-500');
            collegeFields.classList.remove('form-hidden-section');
            studentFields.classList.add('form-hidden-section');
            document.querySelectorAll('.form-student-input').forEach(i => i.required = false);
            document.querySelectorAll('.form-college-input').forEach(i => i.required = true);
        });

        enrollmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            mainContent.classList.add('hidden');
            successMsg.classList.remove('hidden');
            document.getElementById('enroll').scrollIntoView({ behavior: 'smooth' });
        });

        // Intersection Observer
        const observer1 = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate-reveal').forEach(el => observer1.observe(el));