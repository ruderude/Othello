var canvas = document.getElementById("reversi")
var ctx = canvas.getContext("2d")
var playBoard = [
	[0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
]

ctx.fillStyle = "black"

for (let col = 0; col < 8; col++) {
    ctx.beginPath(); // Start a new path
    ctx.moveTo(40 * col, 0); // Move the pen to
    ctx.lineTo(40 * col, 320); // Draw a line to
    ctx.stroke();
}
for (let row = 0; row < 8; row++) {
    ctx.beginPath(); // Start a new path
    ctx.moveTo(0, 40 * row); // Move the pen to
    ctx.lineTo(320, 40 * row); // Draw a line to 
    ctx.stroke();
}

function canPutStoneCheck(x, y) {
    return playBoard[y][x] === 0 ? true : false
}

function putStone(x, y, color){
	ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, 2 * Math.PI);
    ctx.fill();
}

// クリックした座標に石を置く
function putStoneAt(event){
	// HTMLの中にCANVASがあるので、CANVASのどの位置をクリックしたか
 	// 調整するために、CANVASとHTMLの位置関係から補正しています
    var rect = event.target.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    x = x - x % 40 + 20 // キリが良い箇所に配置されるようにx座標を補正
    y = y - y % 40 + 20 // キリが良い箇所に配置されるようにy座標を補正
    var posX = (x-20) / 40
    var posY = (y-20) / 40
    if (canPutStoneCheck(posX, posY)) {
        putStone(x, y, "white")
    } else {
        console.log('そこに石は置けません！')
        return false
    }
    
    // どこに石を置いたか記憶する
    playBoard[posY][posX] = 1 // 1:white 2:black とする
    console.log(playBoard)
}

// 初期配置を行う関数
function initialize(){
    putStone(140, 140, "white")
    putStone(180, 140, "black")
    putStone(140, 180, "black")
    putStone(180, 180, "white")
    playBoard[3][3] = 1
    playBoard[3][4] = 2
    playBoard[4][3] = 2
    playBoard[4][4] = 1
}

// 初期配置を実装
initialize()