const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cw = canvas.width;
const w = cw / 20;
const h = w;

function drawGrid() {
    ctx.strokeStyle = "black";
    for (var x=0; x<=cw; x+=w) {
        ctx.moveTo(x,0);
        ctx.lineTo(x,cw);
    }
    for (var x=0; x<=cw; x+=w) {
        ctx.moveTo(0,x);
        ctx.lineTo(cw,x);
    }
    ctx.stroke();
}
drawGrid();



function makeSnake() {
    ctx.fillStyle = "green";
    // random starting point for head and head position going forward is x,y
    let x,y;
    let xrand = x = w*(Math.floor(Math.random()*w));
    let yrand = y = w*(Math.floor(Math.random()*w));
    // head
    fill(xrand,yrand);
    document.onkeydown = moveHead;

    function moveHead(e) {
        ctx.fillStyle = "green";
        let dx=0;
        let dy=0;
        switch (e.keyCode) {
            case 37: dx = -20; break;
            case 38: dy = -20; break;
            case 39: dx = 20; break;
            case 40: dy = 20; break;
        }
// console.log(dx,dy);
        setInterval(fill(dx,dy),500);
        
    }

    function fill(dx,dy) {
            x+=dx;
            y+=dy;
            if (x >= 400) {x=0;}
            if (y >= 400) {y=0;}
            if (x <= -20) {x=380;}
            if (y <= -20) {y=380;}
            ctx.fillRect(x,y,w,h);
        
        // setInterval(snake,500);
    }
    
    
}
makeSnake();
//setInterval(placeApple,500);


// Random placement of the apple (w,h is size) within the grid (x,y,w,h)
function placeApple() {
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(w*(Math.floor(Math.random()*w)), w*(Math.floor(Math.random()*w)), w, h);
}
placeApple();
