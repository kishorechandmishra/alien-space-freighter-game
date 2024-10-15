const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
let score = 0;

let playerPosition = gameArea.clientWidth / 2 - 20;
let aliens = [];
let projectiles = [];
let gameInterval;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        playerPosition -= 15;
        if (playerPosition < 0) playerPosition = 0;
    } else if (e.key === 'ArrowRight') {
        playerPosition += 15;
        if (playerPosition > gameArea.clientWidth - 40) playerPosition = gameArea.clientWidth - 40;
    } else if (e.key === ' ') {
        shootProjectile();
    }
    player.style.left = playerPosition + 'px';
});

function shootProjectile() {
    const projectile = document.createElement('div');
    projectile.classList.add('projectile');
    projectile.style.left = playerPosition + 17 + 'px';
    projectile.style.bottom = '50px';
    gameArea.appendChild(projectile);
    projectiles.push(projectile);
    moveProjectile(projectile);
}

function moveProjectile(projectile) {
    const moveInterval = setInterval(() => {
        const projectileBottom = parseInt(projectile.style.bottom);
        if (projectileBottom < gameArea.clientHeight) {
            projectile.style.bottom = projectileBottom + 5 + 'px';
        } else {
            clearInterval(moveInterval);
            gameArea.removeChild(projectile);
            projectiles = projectiles.filter(p => p !== projectile);
        }
    }, 20);
}

function spawnAlien() {
    const alien = document.createElement('div');
    alien.classList.add('alien');
    alien.style.left = Math.random() * (gameArea.clientWidth - 30) + 'px';
    alien.style.top = '0px';
    gameArea.appendChild(alien);
    aliens.push(alien);
    moveAlien(alien);
}

function moveAlien(alien) {
    const moveInterval = setInterval(() => {
        const alienTop = parseInt(alien.style.top);
        if (alienTop < gameArea.clientHeight) {
            alien.style.top = alienTop + 2 + 'px';
        } else {
            clearInterval(moveInterval);
            gameArea.removeChild(alien);
            aliens = aliens.filter(a => a !== alien);
        }
        checkCollision(alien);
    }, 50);
}

function checkCollision(alien) {
    projectiles.forEach(projectile => {
        const alienRect = alien.getBoundingClientRect();
        const projectileRect = projectile.getBoundingClientRect();
        if (
            projectileRect.left < alienRect.right &&
            projectileRect.right > alienRect.left &&
            projectileRect.top < alienRect.bottom &&
            projectileRect.bottom > alienRect.top
        ) {
            gameArea.removeChild(alien);
            gameArea.removeChild(projectile);
            aliens = aliens.filter(a => a !== alien);
            projectiles = projectiles.filter(p => p !== projectile);
            score++;
            scoreDisplay.innerText = 'Score: ' + score;
        }
    });
}

function startGame() {
    gameInterval = setInterval(spawnAlien, 2000);
}

startGame();
