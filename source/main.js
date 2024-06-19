function startGame() {
    class Pacman {
        constructor(x, y, element) {
            this.x = x;
            this.y = y;
            this.element = element;
            this.direction = 'right';
            this.stepSize = 10;
            this.moveInterval = 100;
        }

        move() {
            switch (this.direction) {
                case 'up':
                    this.y -= this.stepSize;
                    break;
                case 'down':
                    this.y += this.stepSize;
                    break;
                case 'left':
                    this.x -= this.stepSize;
                    break;
                case 'right':
                    this.x += this.stepSize;
                    break;
                default:
                    break;
            }
            
            this.updatePosition();
        }

        updatePosition() {
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
        }
    }

    class Ghost {
        constructor(x, y, element) {
            this.x = x;
            this.y = y;
            this.element = element;
            this.direction = 'left';
            this.stepSize = 10;
            this.moveInterval = 0;
        }

        move() {
            const directions = ['up', 'down', 'left', 'right'];
            const randomIndex = Math.floor(Math.random() * directions.length);
            this.direction = directions[randomIndex];

            switch (this.direction) {
                case 'up':
                    this.y -= this.stepSize;
                    break;
                case 'down':
                    this.y += this.stepSize;
                    break;
                case 'left':
                    this.x -= this.stepSize;
                    break;
                case 'right':
                    this.x += this.stepSize;
                    break;
                default:
                    break;
            }
            
            this.updatePosition();
        }

        updatePosition() {
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
        }
    }

    const pacmanElement = document.createElement('div');
    pacmanElement.id = 'pacman';
    document.body.appendChild(pacmanElement);
    const pacman = new Pacman(0, 0, pacmanElement);

    const ghostsQuantity = 3;
    var ghosts = [];
    for (let i = 0; i < ghostsQuantity; i++) {
        let ghostElement = document.createElement('div');
        ghostElement.className = 'ghost';
        document.body.appendChild(ghostElement);
        let ghost = new Ghost(Math.random() * window.innerWidth, Math.random() * window.innerHeight, ghostElement);
        ghosts.push(ghost);
    }

    function movePacman() {
        pacman.move();
        if (pacman.x >= window.innerWidth || pacman.y >= window.innerHeight) {
            pacman.x = 0;
            pacman.y = 0;
            pacman.updatePosition();
        }
        setTimeout(movePacman, pacman.moveInterval);
    }

    movePacman();

    window.addEventListener("keydown", function(event){
        if (event.defaultPrevented) {
            return;
        }

        switch(event.key){
            case "ArrowDown":
            case "s":
            case "S":
                pacman.direction = 'down';
                break;

            case "ArrowUp":
            case "w":
            case "W":
                pacman.direction = 'up';
                break;

            case "ArrowLeft":
            case "a":
            case "A":
                pacman.direction = 'left';
                break;

            case "ArrowRight":
            case "d":
            case "D":
                pacman.direction = 'right';
                break;

            default:
                break;
        }
    }, true);

    setInterval(function() {
        for (let i = 0; i < ghosts.length; i++) {
            ghosts[i].move();
        }
    }, 50);
}

startGame();