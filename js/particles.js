let bNum = 2; // Número de partículas generadas por movimiento del ratón
let bSize = 8; // Tamaño máximo de las partículas
let bSpeed = 3; // Velocidad de las partículas
let bDep = 0.01; // Desaparición de las partículas (decremento de tamaño)
let bDist = 40; // Distancia a la que las partículas se conectan

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = []; // Cambio de nombre a la variable para mayor claridad
let hue = 0;

const mouse = {
    x: undefined,
    y: undefined
};

canvas.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

    for (let i = 0; i < bNum; i++) {
        particles.push(new Particle());
    }
});

window.addEventListener("resize", function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight; // Corregido innerheight a innerHeight
    init(); // Asegurarse de que la función init exista si se usa
});

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * bSize + 0.1;
        this.speedX = Math.random() * bSpeed - bSpeed / 2;
        this.speedY = Math.random() * bSpeed - bSpeed / 2;
        this.color = "hsl(" + hue + ", 100%, 50%)";
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > bDep) this.size -= bDep; // Corregido bbep a bDep
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < bDist) {
                ctx.beginPath();
                ctx.strokeStyle = particles[i].color;
                ctx.lineWidth = particles[i].size / 3;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y); // Corregido para conectar con la posición correcta
                ctx.stroke();
            }
        }
        if (particles[i].size <= bDep) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue++;
    requestAnimationFrame(animate);
}

animate(); // Corregido para llamar la función
