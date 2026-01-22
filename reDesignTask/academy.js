
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


        // Main Background Scene
        let scene, camera, renderer, particles;
        function initMainScene() {
            const container = document.getElementById('canvas-container');
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 5;
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);

            const geometry = new THREE.BufferGeometry();
            const vertices = [];
            for (let i = 0; i < 2000; i++) {
                vertices.push((Math.random()-0.5)*20, (Math.random()-0.5)*20, (Math.random()-0.5)*20);
            }
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            const material = new THREE.PointsMaterial({ color: 0x2563eb, size: 0.04, transparent: true, opacity: 0.6 });
            particles = new THREE.Points(geometry, material);
            scene.add(particles);
            
            function animateMain() {
                requestAnimationFrame(animateMain);
                particles.rotation.y += 0.0008;
                renderer.render(scene, camera);
            }
            animateMain();
        }

        // Helper for Course Micro-Animations
        function createCourseAnim(elementId, type) {
            const container = document.getElementById(elementId);
            if (!container) return;
            const scene = new THREE.Scene();
            const width = container.clientWidth;
            const height = container.clientHeight;
            const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
            camera.position.z = 4;
            
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(width, height);
            container.appendChild(renderer.domElement);

            let mesh;

            if(type === 'ds') { // Data Visualization (Bars)
                mesh = new THREE.Group();
                for(let i=0; i<5; i++) {
                    const h = Math.random() * 2 + 1;
                    const geo = new THREE.BoxGeometry(0.4, h, 0.4);
                    const mat = new THREE.MeshPhongMaterial({ color: 0x2563eb });
                    const bar = new THREE.Mesh(geo, mat);
                    bar.position.x = (i - 2) * 0.6;
                    bar.position.y = h/4 - 1;
                    mesh.add(bar);
                }
            } else if(type === 'ml') { // Neural Nodes
                mesh = new THREE.Group();
                const geo = new THREE.SphereGeometry(0.2, 16, 16);
                const mat = new THREE.MeshPhongMaterial({ color: 0x2563eb });
                for(let i=0; i<6; i++) {
                    const node = new THREE.Mesh(geo, mat);
                    node.position.set(Math.cos(i)*1.2, Math.sin(i)*1.2, 0);
                    mesh.add(node);
                }
            } else if(type === 'ai') { // Core Intelligence
                const geo = new THREE.IcosahedronGeometry(1, 1);
                const mat = new THREE.MeshPhongMaterial({ color: 0x2563eb, wireframe: true });
                mesh = new THREE.Mesh(geo, mat);
            } else if(type === 'dl') { // Neural Layers
                mesh = new THREE.Group();
                for(let i=0; i<3; i++) {
                    const geo = new THREE.TorusGeometry(0.5 + i*0.4, 0.02, 16, 100);
                    const mat = new THREE.MeshPhongMaterial({ color: 0x2563eb });
                    const ring = new THREE.Mesh(geo, mat);
                    mesh.add(ring);
                }
            }

            const light = new THREE.PointLight(0xffffff, 1);
            light.position.set(5, 5, 5);
            scene.add(light);
            scene.add(new THREE.AmbientLight(0x404040));
            scene.add(mesh);

            function animateCourse() {
                requestAnimationFrame(animateCourse);
                if(type === 'ds') {
                    mesh.children.forEach((b, i) => b.scale.y = 1 + Math.sin(Date.now()*0.002 + i)*0.3);
                } else {
                    mesh.rotation.y += 0.01;
                    mesh.rotation.x += 0.005;
                }
                renderer.render(scene, camera);
            }
            animateCourse();
        }

        // Circular Carousel
        const carousel = document.getElementById('carousel');
        const engineCards = document.querySelectorAll('.engine-stage');
        let currentIndex = 0;
        
        function rotateCarousel(direction) {
            currentIndex += direction;
            const theta = (2 * Math.PI) / engineCards.length;
            carousel.style.transform = `rotateY(${-currentIndex * theta}rad)`;
            
            engineCards.forEach((card, i) => {
                const normalized = ((currentIndex % engineCards.length) + engineCards.length) % engineCards.length;
                card.style.opacity = (i === normalized) ? "1" : "0.4";
                card.style.boxShadow = (i === normalized) ? "0 0 70px rgba(37,99,235,0.5)" : "none";
            });
        }

        window.onload = () => {
            initMainScene();
            createCourseAnim('ds-anim', 'ds');
            createCourseAnim('ml-anim', 'ml');
            createCourseAnim('ai-anim', 'ai');
            createCourseAnim('dl-anim', 'dl');
            
            // Layout placement engine cards in circle
            const theta = (2 * Math.PI) / engineCards.length;
            const r = window.innerWidth > 768 ? 500 : 350;
            engineCards.forEach((card, i) => {
                card.style.transform = `rotateY(${i * theta}rad) translateZ(${r}px)`;
            });
            rotateCarousel(0);

            // Handle Resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        };