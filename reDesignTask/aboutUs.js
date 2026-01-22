
        document.addEventListener('DOMContentLoaded', () => {
            const menuToggle = document.getElementById('menu-toggle');
            const menuClose = document.getElementById('menu-close');
            const mobileMenu = document.getElementById('mobile-menu');
            const overlay = document.getElementById('overlay');
            const menuFooter = document.getElementById('menu-footer');
            const servicesParent = document.getElementById('services-parent');
            const servicesDropdown = document.getElementById('services-dropdown');
            const chevron = document.getElementById('chevron');

            const openMenu = () => {
                mobileMenu.classList.add('active');
                overlay.classList.add('active');
                menuToggle.classList.add('is-active');
                menuFooter.classList.remove('opacity-0', 'translate-y-10');
                document.body.style.overflow = 'hidden';
            };

            const closeMenu = () => {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                menuToggle.classList.remove('is-active');
                menuFooter.classList.add('opacity-0', 'translate-y-10');
                servicesDropdown.classList.remove('show');
                chevron.style.transform = 'rotate(0deg)';
                document.body.style.overflow = '';
            };

            menuToggle.addEventListener('click', openMenu);
            menuClose.addEventListener('click', closeMenu);
            overlay.addEventListener('click', closeMenu);

            servicesParent.addEventListener('click', () => {
                servicesDropdown.classList.toggle('show');
                chevron.style.transform = servicesDropdown.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
            });
        });

        const slides = [
            {
                number: "",
                title: "BPO",
                description: "Streamlining your business operations with high-efficiency outsourcing solutions. We handle the complexity so you can focus on core growth.",
                color: 0x60a5fa,
                type: 'knot'
            },
            {
                number: "",
                title: "E-commerce",
                description: "Building scalable digital marketplaces. From seamless checkout experiences to robust inventory management, we power the future of retail.",
                color: 0x818cf8,
                type: 'box'
            },
            {
                number: "",
                title: "Web Development",
                description: "Crafting high-performance web applications with cutting-edge tech stacks. We turn complex requirements into elegant digital realities.",
                color: 0xa855f7,
                type: 'icosahedron'
            }
        ];

        let currentSlide = 0;
        let scene, camera, renderer, currentMesh;

        function initThree() {
            const container = document.getElementById('canvas-container');
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.appendChild(renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
            scene.add(ambientLight);

            const pointLight = new THREE.PointLight(0xffffff, 2);
            pointLight.position.set(10, 10, 10);
            scene.add(pointLight);

            camera.position.z = 5;
            
            update3DObject();
            animate();
        }

        function update3DObject() {
            if (currentMesh) {
                scene.remove(currentMesh);
                if (currentMesh.geometry) currentMesh.geometry.dispose();
                if (currentMesh.material) currentMesh.material.dispose();
                // If it's a group, dispose children
                if(currentMesh.children) {
                    currentMesh.children.forEach(child => {
                        child.geometry.dispose();
                        child.material.dispose();
                    });
                }
            }

            const slide = slides[currentSlide];
            let geometry;
            let material = new THREE.MeshStandardMaterial({ 
                color: slide.color, 
                roughness: 0.1, 
                metalness: 0.9,
                emissive: slide.color,
                emissiveIntensity: 0.3
            });

            if (slide.type === 'knot') {
                geometry = new THREE.TorusKnotGeometry(1.3, 0.4, 150, 24);
                currentMesh = new THREE.Mesh(geometry, material);
            } else if (slide.type === 'box') {
                // E-commerce: A "package" or shipping crate representation
                const group = new THREE.Group();
                const boxGeo = new THREE.BoxGeometry(2, 2, 2);
                const boxMat = new THREE.MeshStandardMaterial({ 
                    color: slide.color, 
                    roughness: 0.4, 
                    metalness: 0.2,
                    emissive: slide.color,
                    emissiveIntensity: 0.1
                });
                const box = new THREE.Mesh(boxGeo, boxMat);
                
                // Add "tape" or details to make it look like e-commerce packaging
                const tapeGeo = new THREE.BoxGeometry(2.1, 0.4, 2.1);
                const tapeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
                const tape = new THREE.Mesh(tapeGeo, tapeMat);
                
                group.add(box);
                group.add(tape);
                currentMesh = group;
            } else {
                geometry = new THREE.IcosahedronGeometry(2, 2);
                material.wireframe = true;
                material.emissiveIntensity = 1;
                currentMesh = new THREE.Mesh(geometry, material);
            }

            currentMesh.scale.set(0.01, 0.01, 0.01);
            scene.add(currentMesh);
        }

        function animate() {
            requestAnimationFrame(animate);
            if (currentMesh) {
                currentMesh.rotation.y += 0.007;
                currentMesh.rotation.x += 0.004;
                
                if (currentMesh.scale.x < 1) {
                    currentMesh.scale.x += (1 - currentMesh.scale.x) * 0.08;
                    currentMesh.scale.y += (1 - currentMesh.scale.y) * 0.08;
                    currentMesh.scale.z += (1 - currentMesh.scale.z) * 0.08;
                }
                
                currentMesh.position.y = Math.sin(Date.now() * 0.0015) * 0.15;
            }
            renderer.render(scene, camera);
        }

        function updateUI() {
            const content = document.getElementById('content-area');
            const slide = slides[currentSlide];
            content.classList.add('fade-out');
            
            setTimeout(() => {
                const titleElement = document.getElementById('title');
                const slideNumElement = document.getElementById('slide-number');
                
                slideNumElement.innerText = slide.number;
                titleElement.innerText = slide.title;
                
                titleElement.className = `text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tighter bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent`;
                
                document.getElementById('description').innerText = slide.description;
                
                update3DObject();
                renderDots();
                
                content.classList.remove('fade-out');
                content.classList.add('fade-in');
            }, 350);
        }

        function renderDots() {
            const dotsContainer = document.getElementById('dots');
            dotsContainer.innerHTML = '';
            slides.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.className = `h-1.5 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-8 bg-blue-400' : 'w-2 bg-slate-700'}`;
                dotsContainer.appendChild(dot);
            });
        }

        window.nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateUI();
        };

        window.prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateUI();
        };

        window.addEventListener('resize', () => {
            const container = document.getElementById('canvas-container');
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });

        window.onload = () => {
            initThree();
            renderDots();
        };



        function toggleContent() {
            const grid = document.getElementById('awards-grid');
            const detail = document.getElementById('detailed-content');
            const header = document.getElementById('section-header');

            if (detail.classList.contains('hidden')) {
                grid.classList.add('hidden');
                header.classList.add('hidden');
                detail.classList.remove('hidden');
                
                setTimeout(() => {
                    detail.classList.remove('opacity-0', 'translate-y-8');
                    detail.classList.add('opacity-100', 'translate-y-0');
                }, 50);
                window.scrollTo({ top: document.getElementById('awards-component').offsetTop - 50, behavior: 'smooth' });
            } else {
                detail.classList.add('opacity-0', 'translate-y-8');
                detail.classList.remove('opacity-100', 'translate-y-0');
                
                setTimeout(() => {
                    detail.classList.add('hidden');
                    grid.classList.remove('hidden');
                    header.classList.remove('hidden');
                    window.scrollTo({ top: document.getElementById('awards-component').offsetTop - 50, behavior: 'smooth' });
                }, 500);
            }
        }