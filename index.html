<html><head><base href="https://cdn.jsdelivr.net/" />
<title>3D Garfield Cube Game</title>
<style>
    body { margin: 0; overflow: hidden; }
    canvas { width: 100%; height: 100%; display: block; }
    #instructions {
        position: absolute;
        top: 10px;
        left: 10px;
        color: white;
        background: linear-gradient(135deg, #ff6b2b, #ff8c42);
        padding: 10px;
        border-radius: 5px;
        font-family: Arial, sans-serif;
    }
    #healthUI {
        position: absolute;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(135deg, #ff6b2b, #ff8c42);
        padding: 10px;
        border-radius: 5px;
        color: white;
        font-family: Arial, sans-serif;
    }
    #healthBar {
        width: 200px;
        height: 20px;
        background: #ff0000;
        border-radius: 10px;
        overflow: hidden;
    }
    #healthFill {
        width: 100%;
        height: 100%;
        background: #00ff00;
        transition: width 0.3s;
    }
    .enemyHealthContainer {
        position: absolute;
        transform: translate(-50%, -100%);
        background: linear-gradient(135deg, #ff6b2b, #ff8c42);
        padding: 5px;
        border-radius: 5px;
        color: white;
        font-family: Arial, sans-serif;
        pointer-events: none;
    }
    .enemyHealthBar {
        width: 100px;
        height: 10px;
        background: #ff0000;
        border-radius: 5px;
        overflow: hidden;
    }
    .enemyHealthFill {
        width: 100%;
        height: 100%;
        background: #ff0000;
        transition: width 0.3s;
    }
    #crosshair {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 24px;
        display: none;
        pointer-events: none;
    }
    #menuScreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    #menuScreen.hidden {
        display: none;
    }
    #gameTitle {
        color: #ff6b2b;
        font-size: 48px;
        font-family: 'Arial Black', sans-serif;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 20px;
    }
    #gameTitle img {
        height: 100px;
        width: auto;
    }
    #subheading {
        color: #ffffff;
        font-size: 24px;
        font-family: Arial, sans-serif;
        margin-bottom: 30px;
    }
    #playButton {
        padding: 15px 40px;
        font-size: 24px;
        background: #ff6b2b;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: transform 0.2s;
    }
    #playButton:hover {
        transform: scale(1.1);
    }
    #playerList {
        position: absolute;
        top: 10px;
        right: 10px;
        background: linear-gradient(135deg, #ff6b2b, #ff8c42);
        padding: 10px;
        border-radius: 5px;
        color: white;
        font-family: Arial, sans-serif;
        min-width: 200px;
        display: none;
    }
    #playerList.active {
        display: block;
    }
    .player-item {
        margin: 5px 0;
        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>
</head>
<body>
<audio id="backgroundMusic" loop>
    <source src="/The Garfield Show.mp3" type="audio/mpeg">
</audio>
<div id="menuScreen">
    <div id="gameTitle">
        Garfield Royale
        <img src="/pngimg.com - garfield_PNG19.png" alt="Garfield character" width="100" height="100">
    </div>
    <div id="subheading">In Beta Testing</div>
    <button id="playButton">Play</button>
</div>
<div id="instructions">
    Use WASD to move<br>
    Arrow keys to look around<br>
    Space to jump<br>
    Press E to shoot fish<br>
    Avoid enemy fish!
</div>
<div id="healthUI">
    Health: <span id="healthText">100</span>
    <div id="healthBar">
        <div id="healthFill"></div>
    </div>
</div>
<div id="crosshair">+</div>
<div id="playerList">
    <h3>Online Players</h3>
    <div id="playerListContent"></div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
const textureLoader = new THREE.TextureLoader();
const room = new WebsimSocket();
const gravity = -0.01;
const jumpForce = 0.3;
let velocity = 0;
let isJumping = false;
const moveSpeed = 0.1;

const scene = new THREE.Scene();

// Create skybox after texture loader
const skyGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
const skyTexture = textureLoader.load('/clearance.jpg');
skyTexture.colorSpace = THREE.SRGBColorSpace;
const skyMaterial = new THREE.MeshBasicMaterial({ 
    map: skyTexture,
    side: THREE.BackSide 
});
const skybox = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(skybox);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load textures
const texture = textureLoader.load('/pngimg.com - garfield_PNG19.png');
const fishTexture = textureLoader.load('/fish.png');
const enemyTexture = textureLoader.load('/IMG_1349.jpeg');

// Create player cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture });
const player = new THREE.Mesh(geometry, material);
player.userData.direction = new THREE.Vector3(0, 0, -1);
player.userData.clientId = room.party.client.id;
player.userData.username = room.party.client.username;
scene.add(player);

// Add player tracking system
const otherPlayers = new Map(); // clientId -> THREE.Mesh

// Create enemies
const enemies = [];
const numberOfEnemies = 3;

function createEnemy() {
    const enemyGeometry = new THREE.BoxGeometry(1, 1, 1);
    const enemyMaterial = new THREE.MeshBasicMaterial({ map: enemyTexture });
    const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
    
    enemy.position.set(
        Math.random() * 40 - 20,
        0,
        Math.random() * 40 - 20
    );
    
    enemy.userData.health = 100;
    enemy.userData.shootCooldown = Math.random() * 60;
    
    scene.add(enemy);
    enemies.push(enemy);
    
    const healthContainer = document.createElement('div');
    healthContainer.className = 'enemyHealthContainer';
    healthContainer.innerHTML = `
        Health: <span class="enemyHealthText">100</span>
        <div class="enemyHealthBar">
            <div class="enemyHealthFill"></div>
        </div>
    `;
    enemy.userData.healthUI = healthContainer;
    document.body.appendChild(healthContainer);
}

// Initialize multiple enemies
for (let i = 0; i < numberOfEnemies; i++) {
    createEnemy();
}

// Create projectiles arrays
const projectiles = [];
const enemyProjectiles = [];

// Add ground
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = Math.PI / 2;
ground.position.y = -2;
scene.add(ground);

// Add obstacles
const obstacles = [];
for(let i = 0; i < 10; i++) {
    const obstacleGeometry = new THREE.BoxGeometry(2, 2, 2);
    const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0x964B00 });
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    obstacle.position.set(
        Math.random() * 40 - 20,
        0,
        Math.random() * 40 - 20
    );
    scene.add(obstacle);
    obstacles.push(obstacle);
}

camera.position.z = 5;
camera.position.y = 2;

let isFirstPerson = false;
const crosshair = document.getElementById('crosshair');
const thirdPersonOffset = new THREE.Vector3(0, 2, 5);
const firstPersonOffset = new THREE.Vector3(0, 0.5, 0);

// Add spawn point
const spawnPoint = new THREE.Vector3(0, 0, 0);

function respawnPlayer() {
    player.position.copy(spawnPoint);
    playerHealth = 100;
    updateHealthUI();
}

// Key state tracking
const keys = {};
document.addEventListener('keydown', (e) => {
    if(e.key.toLowerCase() === ' ' && !isJumping) {
        velocity = jumpForce;
        isJumping = true;
    }
    if(e.key.toLowerCase() === 'q') {
        isFirstPerson = true;
        crosshair.style.display = 'block';
    }
    keys[e.key.toLowerCase()] = true;
});
document.addEventListener('keyup', (e) => {
    if(e.key.toLowerCase() === 'q') {
        isFirstPerson = false;
        crosshair.style.display = 'none';
    }
    keys[e.key.toLowerCase()] = false;
});

function createOtherPlayer(clientId, username) {
    const otherPlayerGeometry = new THREE.BoxGeometry(1, 1, 1);
    const otherPlayerMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const otherPlayer = new THREE.Mesh(otherPlayerGeometry, otherPlayerMaterial);
    otherPlayer.userData.clientId = clientId;
    otherPlayer.userData.username = username;
    otherPlayer.userData.health = 100;
    
    const healthContainer = document.createElement('div');
    healthContainer.className = 'enemyHealthContainer';
    healthContainer.innerHTML = `
        ${username}: <span class="enemyHealthText">100</span>
        <div class="enemyHealthBar">
            <div class="enemyHealthFill"></div>
        </div>
    `;
    otherPlayer.userData.healthUI = healthContainer;
    document.body.appendChild(healthContainer);
    
    scene.add(otherPlayer);
    otherPlayers.set(clientId, otherPlayer);
}

// Player list management
const playerList = document.getElementById('playerList');
const playerListContent = document.getElementById('playerListContent');

function updatePlayerList() {
    playerListContent.innerHTML = '';
    
    // Add local player
    const localPlayerDiv = document.createElement('div');
    localPlayerDiv.className = 'player-item';
    localPlayerDiv.innerHTML = `
        ${room.party.client.username} (You) - HP: ${playerHealth}
    `;
    playerListContent.appendChild(localPlayerDiv);
    
    // Add other players
    otherPlayers.forEach((player, clientId) => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-item';
        playerDiv.innerHTML = `
            ${player.userData.username} - HP: ${player.userData.health}
        `;
        playerListContent.appendChild(playerDiv);
    });
}

// Show player list when game starts
const playButton = document.getElementById('playButton');
playButton.addEventListener('click', () => {
    gameStarted = true;
    menuScreen.classList.add('hidden');
    instructionsDiv.style.display = 'block';
    healthUI.style.display = 'block';
    playerList.classList.add('active');
    
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play().catch(error => {
        console.log("Audio playback failed:", error);
    });
});

// Update peer list when players join/leave
room.onPeersChanged = (peers) => {
    updatePlayerList();
};

room.onmessage = (event) => {
    const data = event.data;
    if (data.type === "playerUpdate") {
        let otherPlayer = otherPlayers.get(data.clientId);
        if (!otherPlayer && data.clientId !== room.party.client.id) {
            // Create new player if doesn't exist
            createOtherPlayer(data.clientId, data.username);
            otherPlayer = otherPlayers.get(data.clientId);
        }
        if (otherPlayer) {
            otherPlayer.position.set(data.x, data.y, data.z);
            otherPlayer.rotation.set(data.rotX, data.rotY, data.rotZ);
            if (data.health !== undefined) {
                otherPlayer.userData.health = data.health;
            }
        }
    } else if (data.type === "connected") {
        if (!otherPlayers.has(data.clientId) && data.clientId !== room.party.client.id) {
            createOtherPlayer(data.clientId, data.username);
            updatePlayerList();
            
            // Send current player state to new player
            room.send({
                type: "playerUpdate",
                clientId: room.party.client.id,
                username: room.party.client.username,
                x: player.position.x,
                y: player.position.y,
                z: player.position.z,
                rotX: player.rotation.x,
                rotY: player.rotation.y,
                rotZ: player.rotation.z,
                health: playerHealth
            });
        }
    } else if (data.type === "playerDamage") {
        if (data.targetId === room.party.client.id) {
            playerHealth = Math.max(0, playerHealth - 10);
            updateHealthUI();
            if (playerHealth <= 0) {
                respawnPlayer();
            }
        }
    } else if (data.type === "disconnected") {
        const otherPlayer = otherPlayers.get(data.clientId);
        if (otherPlayer) {
            scene.remove(otherPlayer);
            if (otherPlayer.userData.healthUI) {
                document.body.removeChild(otherPlayer.userData.healthUI);
            }
            otherPlayers.delete(data.clientId);
            updatePlayerList();
        }
    } else if (data.type === "connected") {
        if (!otherPlayers.has(data.clientId) && data.clientId !== room.party.client.id) {
            createOtherPlayer(data.clientId, data.username);
            updatePlayerList();
        }
    }
};

// Modify broadcastPosition to include more info
function broadcastPosition() {
    room.send({
        type: "playerUpdate",
        clientId: room.party.client.id,
        username: room.party.client.username,
        x: player.position.x,
        y: player.position.y,
        z: player.position.z,
        rotX: player.rotation.x,
        rotY: player.rotation.y,
        rotZ: player.rotation.z,
        health: playerHealth
    });
}

function shoot(shooter, isEnemy = false) {
    const projectileGeometry = new THREE.PlaneGeometry(0.5, 0.5);
    const projectileMaterial = new THREE.MeshBasicMaterial({ 
        map: fishTexture,
        transparent: true,
        side: THREE.DoubleSide
    });
    const projectile = new THREE.Mesh(projectileGeometry, projectileMaterial);
    
    projectile.position.copy(shooter.position);
    
    let direction;
    if (isEnemy) {
        direction = new THREE.Vector3()
            .subVectors(player.position, shooter.position)
            .normalize();
    } else {
        direction = new THREE.Vector3(0, 0, -1);
        direction.applyQuaternion(shooter.quaternion);
    }
    
    projectile.userData.direction = direction;
    projectile.userData.speed = 0.5;
    projectile.userData.isEnemy = isEnemy;
    
    projectile.lookAt(projectile.position.clone().add(direction));
    
    scene.add(projectile);
    if (isEnemy) {
        enemyProjectiles.push(projectile);
    } else {
        projectiles.push(projectile);
    }

    if(shooter === player) {
        room.send({
            type: "playerShoot",
            clientId: room.party.client.id,
            position: shooter.position.clone(),
            direction: direction.clone()
        });
    }
}

// Add to room.onmessage handler:
room.onmessage = (event) => {
    const data = event.data;
    if (data.type === "playerShoot") {
        const shooter = otherPlayers.get(data.clientId);
        if (shooter) {
            shoot(shooter);
        }
    }
};

document.addEventListener('keydown', (e) => {
    if(e.key.toLowerCase() === 'e') {
        shoot(player);
    }
});

// Add player health variables
let playerHealth = 100;
const healthText = document.getElementById('healthText');
const healthFill = document.getElementById('healthFill');

function updateHealthUI() {
    healthText.textContent = playerHealth;
    healthFill.style.width = `${playerHealth}%`;
}

function keepInBounds(position) {
    const bounds = 45;
    position.x = Math.max(-bounds, Math.min(bounds, position.x));
    position.z = Math.max(-bounds, Math.min(bounds, position.z));
    return position;
}

function checkObstacleCollision(position) {
    for (const obstacle of obstacles) {
        const obstacleMin = {
            x: obstacle.position.x - 1,
            z: obstacle.position.z - 1
        };
        const obstacleMax = {
            x: obstacle.position.x + 1,
            z: obstacle.position.z + 1
        };
        
        if (position.x >= obstacleMin.x && position.x <= obstacleMax.x &&
            position.z >= obstacleMin.z && position.z <= obstacleMax.z) {
            return true;
        }
    }
    return false;
}

function checkEnemyObstacleCollision(position) {
    for (const obstacle of obstacles) {
        const obstacleMin = {
            x: obstacle.position.x - 1,
            z: obstacle.position.z - 1
        };
        const obstacleMax = {
            x: obstacle.position.x + 1,
            z: obstacle.position.z + 1
        };
        
        if (position.x >= obstacleMin.x && position.x <= obstacleMax.x &&
            position.z >= obstacleMin.z && position.z <= obstacleMax.z) {
            return true;
        }
    }
    return false;
}

function checkProjectileObstacleCollision(projectile) {
    for (const obstacle of obstacles) {
        const obstacleMin = {
            x: obstacle.position.x - 1,
            z: obstacle.position.z - 1
        };
        const obstacleMax = {
            x: obstacle.position.x + 1,
            z: obstacle.position.z + 1
        };
        
        if (projectile.position.x >= obstacleMin.x && projectile.position.x <= obstacleMax.x &&
            projectile.position.z >= obstacleMin.z && projectile.position.z <= obstacleMax.z) {
            return true;
        }
    }
    return false;
}

function updateEnemies() {
    enemies.forEach(enemy => {
        const directionToPlayer = new THREE.Vector3()
            .subVectors(player.position, enemy.position)
            .normalize();
            
        const possibleDirections = [
            directionToPlayer,
            new THREE.Vector3(directionToPlayer.z, 0, -directionToPlayer.x),
            new THREE.Vector3(-directionToPlayer.z, 0, directionToPlayer.x),
            new THREE.Vector3(directionToPlayer.x + directionToPlayer.z, 0, directionToPlayer.z - directionToPlayer.x),
            new THREE.Vector3(directionToPlayer.x - directionToPlayer.z, 0, directionToPlayer.z + directionToPlayer.x)
        ];

        let moved = false;
        for (const direction of possibleDirections) {
            direction.normalize();
            const newPosition = enemy.position.clone().add(direction.multiplyScalar(0.05));
            
            if (!checkEnemyObstacleCollision(newPosition)) {
                enemy.position.copy(newPosition);
                moved = true;
                break;
            }
        }
        
        enemy.position.copy(keepInBounds(enemy.position));
        enemy.lookAt(player.position);
        
        enemy.userData.shootCooldown--;
        if(enemy.userData.shootCooldown <= 0) {
            shoot(enemy, true);
            enemy.userData.shootCooldown = 60;
        }
        
        const screenPosition = enemy.position.clone();
        screenPosition.project(camera);
        const healthUI = enemy.userData.healthUI;
        healthUI.style.left = (screenPosition.x * .5 + .5) * window.innerWidth + 'px';
        healthUI.style.top = (-screenPosition.y * .5 + .5) * window.innerHeight + 'px';
        healthUI.querySelector('.enemyHealthText').textContent = enemy.userData.health;
        healthUI.querySelector('.enemyHealthFill').style.width = `${enemy.userData.health}%`;
    });
}

function checkProjectileCollisions() {
    for(let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i];
        
        for(let j = enemies.length - 1; j >= 0; j--) {
            const enemy = enemies[j];
            if(projectile.position.distanceTo(enemy.position) < 1) {
                scene.remove(projectile);
                projectiles.splice(i, 1);
                enemy.userData.health = Math.max(0, enemy.userData.health - 10);
                
                if(enemy.userData.health <= 0) {
                    scene.remove(enemy);
                    if (enemy.userData.healthUI && enemy.userData.healthUI.parentNode) {
                        document.body.removeChild(enemy.userData.healthUI);
                    }
                    enemies.splice(j, 1);
                    createEnemy();
                }
                break;
            }
        }
        
        otherPlayers.forEach((otherPlayer, clientId) => {
            if(projectile.position.distanceTo(otherPlayer.position) < 1) {
                scene.remove(projectile);
                projectiles.splice(i, 1);
                
                room.send({
                    type: "playerDamage",
                    targetId: clientId
                });
            }
        });
        
        if (checkProjectileObstacleCollision(projectile)) {
            scene.remove(projectile);
            projectiles.splice(i, 1);
        }
    }
    
    for(let i = enemyProjectiles.length - 1; i >= 0; i--) {
        const projectile = enemyProjectiles[i];
        if(projectile.position.distanceTo(player.position) < 1) {
            scene.remove(projectile);
            enemyProjectiles.splice(i, 1);
            playerHealth = Math.max(0, playerHealth - 10);
            updateHealthUI();
            
            if(playerHealth <= 0) {
                respawnPlayer();
            }
        } else if (checkProjectileObstacleCollision(projectile)) {
            scene.remove(projectile);
            enemyProjectiles.splice(i, 1);
        }
    }
}

// Add position broadcast in animate loop
let gameStarted = false;

const menuScreen = document.getElementById('menuScreen');
const instructionsDiv = document.getElementById('instructions');
const healthUI = document.getElementById('healthUI');

instructionsDiv.style.display = 'none';
healthUI.style.display = 'none';

function animate() {
    requestAnimationFrame(animate);
    
    if (!gameStarted) {
        renderer.render(scene, camera);
        return;
    }
    
    const moveVector = new THREE.Vector3();
    if(keys['w']) moveVector.z -= moveSpeed;
    if(keys['s']) moveVector.z += moveSpeed;
    if(keys['a']) moveVector.x -= moveSpeed;
    if(keys['d']) moveVector.x += moveSpeed;
    moveVector.applyQuaternion(player.quaternion);
    
    const newPosition = player.position.clone().add(moveVector);
    if (!checkObstacleCollision(newPosition)) {
        player.position.copy(newPosition);
        player.position.copy(keepInBounds(player.position));
    }

    const rotationSpeed = 0.05;
    if(keys['arrowleft']) player.rotation.y += rotationSpeed;
    if(keys['arrowright']) player.rotation.y -= rotationSpeed;

    updateEnemies();
    
    for(let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i];
        projectile.position.add(projectile.userData.direction.clone().multiplyScalar(projectile.userData.speed));
        projectile.rotation.z += 0.1;
        
        if(checkProjectileObstacleCollision(projectile)) {
            scene.remove(projectile);
            projectiles.splice(i, 1);
            continue;
        }
        
        if(projectile.position.length() > 100) {
            scene.remove(projectile);
            projectiles.splice(i, 1);
        }
    }

    for(let i = enemyProjectiles.length - 1; i >= 0; i--) {
        const projectile = enemyProjectiles[i];
        projectile.position.add(projectile.userData.direction.clone().multiplyScalar(projectile.userData.speed));
        projectile.rotation.z += 0.1;
        
        if(checkProjectileObstacleCollision(projectile)) {
            scene.remove(projectile);
            enemyProjectiles.splice(i, 1);
            continue;
        }
        
        if(projectile.position.length() > 100) {
            scene.remove(projectile);
            enemyProjectiles.splice(i, 1);
        }
    }
    
    checkProjectileCollisions();
    broadcastPosition();

    velocity += gravity;
    player.position.y += velocity;

    if(player.position.y <= 0) {
        player.position.y = 0;
        velocity = 0;
        isJumping = false;
    }

    let cameraOffset = isFirstPerson ? firstPersonOffset : thirdPersonOffset;
    
    if (isFirstPerson) {
        camera.position.copy(player.position).add(firstPersonOffset);
        camera.rotation.copy(player.rotation);
    } else {
        let rotatedOffset = thirdPersonOffset.clone().applyQuaternion(player.quaternion);
        camera.position.copy(player.position).add(rotatedOffset);
        camera.lookAt(player.position);
    }

    updateHealthUI();
    updatePlayerList();
    
    otherPlayers.forEach(otherPlayer => {
        const screenPosition = otherPlayer.position.clone();
        screenPosition.project(camera);
        const healthUI = otherPlayer.userData.healthUI;
        healthUI.style.left = (screenPosition.x * .5 + .5) * window.innerWidth + 'px';
        healthUI.style.top = (-screenPosition.y * .5 + .5) * window.innerHeight + 'px';
    });

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
</script>
</body></html>
