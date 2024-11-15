// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up controls
const controls = new THREE.PointerLockControls(camera, document.body);
document.body.addEventListener('click', () => controls.lock());
camera.position.y = 1; // Set initial camera height

// Health bar
let playerHealth = 100;
const healthBar = document.getElementById('health-bar');
healthBar.style.width = playerHealth + 'px';

// Crosshair
const crosshair = document.getElementById('crosshair');

// Environment (flat ground and obstacles)
const groundGeometry = new THREE.PlaneGeometry(500, 500);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = Math.PI / -2;
scene.add(ground);

// Create a simple skybox
const skyboxGeometry = new THREE.BoxGeometry(500, 500, 500);
const skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x87CEEB, side: THREE.BackSide });
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);

// Enemy setup (simple cubes)
let enemies = [];
function createEnemy() {
  const enemyGeometry = new THREE.BoxGeometry(1, 1, 1);
  const enemyMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
  enemy.position.set(Math.random() * 50 - 25, 0.5, Math.random() * 50 - 25);
  scene.add(enemy);
  enemies.push(enemy);
}
for (let i = 0; i < 5; i++) {
  createEnemy();
}

// Movement
const moveSpeed = 0.1;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
function movePlayer() {
  const speed = moveSpeed;
  direction.set(0, 0, 0);
  if (keys.w) direction.z -= speed;
  if (keys.s) direction.z += speed;
  if (keys.a) direction.x -= speed;
  if (keys.d) direction.x += speed;
  velocity.add(direction);
  camera.position.add(velocity);
}

// Shooting
let bullets = [];
function shoot() {
  const bulletGeometry = new THREE.SphereGeometry(0.1, 10, 10);
  const bulletMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
  bullet.position.set(camera.position.x, camera.position.y, camera.position.z);
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  bullet.velocity = direction.multiplyScalar(1);
  scene.add(bullet);
  bullets.push(bullet);
}

// Simple enemy movement and shooting
function moveEnemies() {
  enemies.forEach(enemy => {
    const direction = new THREE.Vector3(camera.position.x - enemy.position.x, 0, camera.position.z - enemy.position.z).normalize();
    enemy.position.add(direction.multiplyScalar(0.02));
  });
}

// Basic collision detection between bullets and enemies
function checkCollisions() {
  bullets.forEach(bullet => {
    enemies.forEach(enemy => {
      if (bullet.position.distanceTo(enemy.position) < 1) {
        enemy.position.set(Math.random() * 50 - 25, 0.5, Math.random() * 50 - 25); // Respawn enemy
        bullet.position.set(0, -100, 0); // Remove bullet
        playerHealth -= 10; // Player damage
        healthBar.style.width = playerHealth + 'px';
      }
    });
  });
}

// Key controls
const keys = { w: false, a: false, s: false, d: false, space: false };
document.addEventListener('keydown', (e) => {
  if (e.code === 'KeyW') keys.w = true;
  if (e.code === 'KeyA') keys.a = true;
  if (e.code === 'KeyS') keys.s = true;
  if (e.code === 'KeyD') keys.d = true;
  if (e.code === 'Space') keys.space = true;
});
document.addEventListener('keyup', (e) => {
  if (e.code === 'KeyW') keys.w = false;
  if (e.code === 'KeyA') keys.a = false;
  if (e.code === 'KeyS') keys.s = false;
  if (e.code === 'KeyD') keys.d = false;
  if (e.code === 'Space') keys.space = false;
});

// Main game loop
function animate() {
  requestAnimationFrame(animate);
  movePlayer();
  moveEnemies();
  checkCollisions();
  renderer.render(scene, camera);
}

animate();

// Event listener for shooting
document.addEventListener('mousedown', shoot);

// Sound effects
const shootSound = new Howl({ src: ['shoot.mp3'] });
const enemyHitSound = new Howl({ src: ['hit.mp3'] });
