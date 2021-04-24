
var canvas = document.getElementById("reversi")
var ctx = canvas.getContext("2d")
　　
ctx.fillStyle = "black"
// 縦の線を引く
// `線` は 「二点間を結ぶ直線」 でしたね？
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

function clickfunc (event) {
	var x = y = 0;

	x = event.clientX - canvas.offsetLeft;
	y = event.clientY - canvas.offsetTop;

	const x_point = checkXY2(x)
    const y_point = checkXY2(y)
    putStone(x_point,y_point, 'white')

}


function checkXY(num) {
    let zahyou = 20
    switch (num) {
        case 0:
            zahyou = 20
            break;
        case 1:
            zahyou = 60
            break;
        case 2:
            zahyou = 100
            break;
        case 3:
            zahyou = 140
            break;
        case 4:
            zahyou = 180
            break;
        case 5:
            zahyou = 220
            break;
        case 6:
            zahyou = 260
            break;
        case 7:
            zahyou = 300
                break;
        default:
            zahyou = 20
    }
    return zahyou
}

function checkXY2(num) {
    if (num >= 0 && num <= 40) {
        return 0
    } else if(num >= 41 && num <= 80) {
        return 1
    } else if(num>=81 && num<=120) {
        return 2
    } else if(num>=121 && num<=160) {
        return 3
    } else if(num>=161 && num<=200) {
        return 4
    } else if(num>=201 && num<=240) {
        return 5
    } else if(num>=241 && num<=820) {
        return 6
    } else if(num>=281 && num<=320) {
        return 7
    } else {
        return 0
    }
}


function putStone(x, y, color) {
    const x_point = checkXY(x)
    const y_point = checkXY(y)
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x_point, y_point, 16, 0, 2 * Math.PI);
    ctx.fill();
}

putStone(3, 3, "white")
putStone(4, 3, "black")
putStone(3, 4, "black")
putStone(4, 4, "white")
