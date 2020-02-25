const img = document.getElementById("apple"); // apple image
const canvas = document.getElementById("canvas"); // canvas (game board)
const ctx = canvas.getContext("2d"); // using 2d canvas
const cw = canvas.width; // defined in html (400 x 400)
const w = cw / 20; // since the grid is square, it's dimensions are w x w
const apple = {x:280,y:200}; // apple's initial position
const snake = [[120,200],[100,200],[80,200],[60,200]]; // snake's initial position
let dir = 39; // holds direction snake is heading as a keycode (e.g. 39 is right, corresponding to right arrow key)
let mi = 250; // move interval (time in ms between snake moves)
let ll = 4; // number of body segments for the snake

// KEYBOARD LISTENER
document.onkeydown = move; // listen for keyboard

// RANDOM POSITION
// gets a random xy position in grid to correspond to cell's top-left corner
function rand(cb) {
    var cb = {
        x:(w*Math.floor(Math.random()*w)),
        y:(w*(Math.floor(Math.random()*w)))
    };
    return cb;
}

// GAME SETUP
function setup() {
    drawApple();
    // DRAW SNAKE
    ctx.fillStyle = "green"; // snake color
    for (let i=0; i<snake.length; i++) {
        ctx.fillRect(snake[i][0],snake[i][1],w,w); // draw snake
    }
}
setup();

function drawApple() {
    // DRAW APPLE
    ctx.drawImage(img,apple.x,apple.y); // draw apple
}


// MOVEMENT
let mm = setInterval(move,mi); // start the snake moving


function move(e) {
    if (e === undefined) {e = dir;} else {e = e.keyCode}
    
    var dx=0, dy=0;
    switch (e) {
        case 37: dx = -20; if (dir === 39) {return;} else {dir = 37}; break;
        case 38: dy = -20; if (dir === 40) {return;} else {dir = 38}; break;
        case 39: dx = 20; if (dir === 37) {return;} else {dir = 39}; break;
        case 40: dy = 20; if (dir === 38) {return;} else {dir = 40}; break;
    }

    ctx.fillStyle = "#111";
    ctx.fillRect(snake[snake.length-1][0],snake[snake.length-1][1],w,w); // erase last segment as snake moves on

    snake.splice(0, 0, [snake[0][0] + dx, snake[0][1] + dy]); // add new head to 0 on snake array
    snake.pop(); // remove snake last segment

    ctx.fillStyle = "green";
    ctx.fillRect(snake[0][0],snake[0][1],w,w); // draw new snake head

    // CHECK FOR EATING AN APPLE (i.e. scoring)
    if (snake[0][0] === apple.x && snake[0][1] === apple.y) { // if snake head coincides with an apple, score & lengthen
        let score = Number(document.getElementById("apples").innerHTML); // score at top-left of gameboard
        score += 1; // increment score
        document.getElementById("apples").innerHTML = score; // write new score
        newApple(); // place a new, random apple
        snake.push([snake[snake.length-1][0],snake[snake.length-1][1]]); // make snake longer by doubling last element
        mi -= 5; // decrement move interval counter (used later to speed up snake)
        ll += 1; // increase snake length counter
        clearInterval(mm);
        mm = setInterval(move,mi);
        document.getElementById("tt").innerHTML = mi;
        document.getElementById("ll").innerHTML = ll;
    }
}

// NEW APPLE
function newApple() {
    let newLoc = rand();
    for (let i=0; i<ll; i++) {
        if (snake[i][0] === newLoc.x && snake[i][1] === newLoc.y) {
            newLoc = rand();
            i = 0;
        }
    }
    apple.x = newLoc.x;
    apple.y = newLoc.y;
    drawApple();
}

// CHECK FOR COLLISIONS (SELF-INTERSECT OR WALL)
let int = setInterval(()=>{
    for (let i=1; i<snake.length; i++) {
        if (snake[0][0] === snake[i][0] && snake[0][1] === snake[i][1]) {endgame();return}
        if (snake[0][0] <= -20 || snake[0][0] >= 400) {endgame();return}
        if (snake[0][1] <= -20 || snake[0][1] >= 400) {endgame();return}
    }
},100);

// END GAME
function endgame() {
    moving = false;
    document.onkeydown = null;
    clearInterval(int);
    clearInterval(mm);
}

