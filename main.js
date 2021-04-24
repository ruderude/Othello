
var canvas = document.getElementById("reversi")
var ctx = canvas.getContext("2d")
　　
ctx.fillStyle = "black"

for (let col = 0; col < 8; col++) {
    ctx.beginPath(); // Start a new path
    ctx.moveTo(40 * col, 0); // Move the pen to
    ctx.lineTo(40 * col, 320); // Draw a line to
    ctx.stroke();
}
// 横の線を引く
for (let row = 0; row < 8; row++) {
    ctx.beginPath(); // Start a new path
    ctx.moveTo(0, 40 * row); // Move the pen to
    ctx.lineTo(320, 40 * row); // Draw a line to 
    ctx.stroke();
}

canvas.addEventListener('click', clickfunc, true);

function clickfunc (e) {
	var x = y = 0;

	var rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;

    putStone(x, y, 'white')

}

function chengeXY(num) {
    if (num >= 0 && num <= 40) {
        return 20
    } else if(num > 40 && num <= 80) {
        return 60
    } else if(num > 80 && num <= 120) {
        return 100
    } else if(num > 120 && num <= 160) {
        return 140
    } else if(num > 160 && num <= 200) {
        return 180
    } else if(num > 200 && num <= 240) {
        return 220
    } else if(num > 240 && num <= 280) {
        return 260
    } else if(num > 280 && num <= 320) {
        return 300
    } else {
        return 20
    }
}

function putStone(x, y, color) {
    const x_point = chengeXY(x)
    const y_point = chengeXY(y)
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x_point, y_point, 16, 0, 2 * Math.PI);
    ctx.fill();
}

putStone(140, 140, "white")
putStone(180, 140, "black")
putStone(140, 180, "black")
putStone(180, 180, "white")
