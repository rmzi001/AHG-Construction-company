// Advanced Three.js 3D scene featuring buildings, cranes, particles, and interactive controls

import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adding buildings
const buildingGeometry = new THREE.BoxGeometry(1, 5, 1);
const buildingMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

for (let i = 0; i < 10; i++) {
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.x = i * 2;
    scene.add(building);
}

// Adding crane
const craneGeometry = new THREE.BoxGeometry(0.2, 3, 0.2);
const craneMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const crane = new THREE.Mesh(craneGeometry, craneMaterial);
crane.position.set(5, 1.5, 0);
scene.add(crane);

// Particles
const particleCount = 1000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = Math.random() * 20 - 10;
    positions[i * 3 + 1] = Math.random() * 20 - 10;
    positions[i * 3 + 2] = Math.random() * 20 - 10;
}

particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const particleMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.05 });
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// Setting camera position
camera.position.z = 15;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    particleSystem.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

// Interactive controls
window.addEventListener('mousemove', (event) => {
    camera.position.x = (event.clientX / window.innerWidth) * 20 - 10;
    camera.position.y = (-(event.clientY / window.innerHeight) * 20) + 10;
});