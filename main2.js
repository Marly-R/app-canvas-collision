const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight / 2; //Dividimos entre 2 para que se vea mejor
const window_width = window.innerWidth / 2;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;

        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(circles, context) {
        this.draw(context);

        if ((this.posX + this.radius) > window_width || (this.posX - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.posY - this.radius) < 0 || (this.posY + this.radius) > window_height) {
            this.dy = -this.dy;
        }

        for (let circle of circles) {
            if (circle !== this) {
                let distance = getDistance(this.posX, circle.posX, this.posY, circle.posY);
                if (distance < (this.radius + circle.radius)) {
                    this.dx = -this.dx;
                    this.dy = -this.dy;
                    circle.dx = -circle.dx;
                    circle.dy = -circle.dy;
                    this.color = "red";
                    circle.color = "red";
                }
            }
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }
}

function getDistance(x1, x2, y1, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

const circles = [];
for (let i = 0; i < 10; i++) {
    let randomX = Math.random() * window_width;
    let randomY = Math.random() * window_height;
    let randomRadius = Math.floor(Math.random() * 100 + 30);
    circles.push(new Circle(randomX, randomY, randomRadius, "blue", i.toString(), 3));
}

let updateCircles = function () {
    requestAnimationFrame(updateCircles);
    ctx.clearRect(0, 0, window_width, window_height);
    circles.forEach(circle => circle.update(circles, ctx));
};

updateCircles();
