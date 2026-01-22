

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
    






        let scene, camera, renderer, clock;
        let mainGroup, earth, networkLines = [];
        let towers = [], dataSignals = [];

        function init() {
            const container = document.getElementById('three-js-canvas');
            const width = container.clientWidth;
            const height = container.clientHeight;

            scene = new THREE.Scene();
            clock = new THREE.Clock();
            
            camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
            camera.position.set(0, 25, 50);
            camera.lookAt(0, 0, 0);

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(width, height);
            renderer.setClearColor(0x000000, 0); 
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.appendChild(renderer.domElement);

            mainGroup = new THREE.Group();
            scene.add(mainGroup);

            // 1. Digital Earth Sphere
            const earthGeo = new THREE.SphereGeometry(10, 64, 64);
            const earthMat = new THREE.MeshPhongMaterial({
                color: 0x0f172a,
                emissive: 0x1e293b,
                specular: 0x3b82f6,
                shininess: 40,
                transparent: true,
                opacity: 0.9
            });
            earth = new THREE.Mesh(earthGeo, earthMat);
            mainGroup.add(earth);

            const wireGeo = new THREE.SphereGeometry(10.1, 32, 32);
            const wireMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.1 });
            earth.add(new THREE.Mesh(wireGeo, wireMat));

            // 2. Telecom Towers
            const towerCount = 12;
            for (let i = 0; i < towerCount; i++) {
                const towerGroup = new THREE.Group();
                const baseGeo = new THREE.CylinderGeometry(0.1, 0.3, 2, 8);
                const baseMat = new THREE.MeshPhongMaterial({ color: 0x94a3b8 });
                const base = new THREE.Mesh(baseGeo, baseMat);
                towerGroup.add(base);

                const dishGeo = new THREE.TorusGeometry(0.3, 0.05, 8, 16);
                const dishMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
                const dish = new THREE.Mesh(dishGeo, dishMat);
                dish.position.y = 1;
                dish.rotation.x = Math.PI / 2;
                towerGroup.add(dish);

                const phi = Math.acos(-1 + (2 * i) / towerCount);
                const theta = Math.sqrt(towerCount * Math.PI) * phi;
                
                towerGroup.position.setFromSphericalCoords(10, phi, theta);
                towerGroup.lookAt(0,0,0);
                towerGroup.rotateX(Math.PI/2);
                
                earth.add(towerGroup);
                towers.push(towerGroup);
            }

            // 3. Network Connection Lines
            const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.2 });
            for (let i = 0; i < towers.length; i++) {
                for (let j = i + 1; j < towers.length; j++) {
                    if (Math.random() > 0.6) {
                        const points = [];
                        const start = towers[i].position.clone();
                        const end = towers[j].position.clone();
                        for (let k = 0; k <= 20; k++) {
                            const p = new THREE.Vector3().lerpVectors(start, end, k / 20);
                            p.normalize().multiplyScalar(10.5 + Math.sin(k / 20 * Math.PI) * 2);
                            points.push(p);
                        }
                        const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
                        const line = new THREE.Line(curveGeo, lineMat);
                        earth.add(line);
                        networkLines.push(line);
                    }
                }
            }

            // 4. Data Pulse Signals
            const signalGeo = new THREE.SphereGeometry(0.15, 8, 8);
            const signalMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
            for (let i = 0; i < 15; i++) {
                const signal = new THREE.Mesh(signalGeo, signalMat);
                scene.add(signal);
                dataSignals.push({
                    mesh: signal,
                    startTower: towers[Math.floor(Math.random() * towers.length)],
                    endTower: towers[Math.floor(Math.random() * towers.length)],
                    progress: Math.random(),
                    speed: 0.005 + Math.random() * 0.01
                });
            }

            // 5. Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
            scene.add(ambientLight);
            const pointLight = new THREE.PointLight(0x38bdf8, 2, 100);
            pointLight.position.set(20, 20, 20);
            scene.add(pointLight);

            animate();
        }

        function animate() {
            requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();

            earth.rotation.y += 0.0015;
            earth.rotation.x = Math.sin(elapsed * 0.1) * 0.1;

            dataSignals.forEach(s => {
                s.progress += s.speed;
                if (s.progress > 1) {
                    s.progress = 0;
                    s.startTower = s.endTower;
                    s.endTower = towers[Math.floor(Math.random() * towers.length)];
                }
                const startPos = new THREE.Vector3();
                const endPos = new THREE.Vector3();
                s.startTower.getWorldPosition(startPos);
                s.endTower.getWorldPosition(endPos);
                const mid = new THREE.Vector3().lerpVectors(startPos, endPos, s.progress);
                mid.normalize().multiplyScalar(11 + Math.sin(s.progress * Math.PI) * 1.5);
                s.mesh.position.copy(mid);
                s.mesh.scale.setScalar(0.5 + Math.sin(elapsed * 10) * 0.5);
            });

            renderer.render(scene, camera);
        }

        window.addEventListener('resize', () => {
            const container = document.getElementById('three-js-canvas');
            if (container) {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            }
        });

        window.onload = init;
    




         function setPlan(plan) {
            const monthlyPlans = document.getElementById('monthly-plans');
            const yearlyPlans = document.getElementById('yearly-plans');
            const monthlyBtn = document.getElementById('monthly-btn');
            const yearlyBtn = document.getElementById('yearly-btn');

            if (plan === 'monthly') {
                monthlyPlans.classList.remove('hidden');
                yearlyPlans.classList.add('hidden');
                monthlyBtn.classList.add('active');
                yearlyBtn.classList.remove('active');
            } else {
                monthlyPlans.classList.add('hidden');
                yearlyPlans.classList.remove('hidden');
                monthlyBtn.classList.remove('active');
                yearlyBtn.classList.add('active');
            }
        }

        // Scroll Reveal Logic
        const reveal = () => {
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(el => {
                const windowHeight = window.innerHeight;
                const revealTop = el.getBoundingClientRect().top;
                const revealPoint = 100;
                if (revealTop < windowHeight - revealPoint) {
                    el.classList.add('active');
                }
            });
        };

        // 3D Tilt Effect Logic
        const cards = document.querySelectorAll('.location-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `rotateX(0deg) rotateY(0deg) translateY(0)`;
            });
        });

        window.addEventListener('scroll', reveal);
        window.addEventListener('load', reveal);


        