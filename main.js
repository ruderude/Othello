
// 定数の宣言
const WHITE = 1;
const BLACK = 2;
const COLUMN_SIZE = 8;
const FIELD_SIZE = 400;
const BLOCK_SIZE = FIELD_SIZE / COLUMN_SIZE;
// canvas取得
const canvas = document.getElementById("canvas");
// 描画する機能を持ったオブジェクトを取り出す
const ctx = canvas.getContext("2d");

// 誰の手番か
let currentPlayer = "white";
// 手番の交代時に呼び出す関数
function changePlayer() {
    currentPlayer = currentPlayer === "white" ? "black" : "white";
}

// 方向の配列を定義する
// ここが一番のポイントかもしれません
// これが配列として定義してあることで、コード全体がすっきりします
const directions = [
    { name: "上方向", x: 0, y: -1 },
    { name: "下方向", x: 0, y: 1 },
    { name: "左方向", x: -1, y: 0 },
    { name: "右方向", x: 1, y: 0 },
    { name: "左上方向", x: -1, y: -1 },
    { name: "左下方向", x: -1, y: 1 },
    { name: "右下方向", x: 1, y: 1 },
    { name: "右上方向", x: 1, y: -1 },
];

// ---------- 盤面データ
// banmenの二次元配列データを元に、canvasに石を実際に配置する
// 基本的に、この配列を操作して、この配列データを元にデータを描画すれば
// あらゆるオセロの盤面が表現できます
const banmen = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
];
// 8 x 8 => 64区画を描画する
banmen.drawReversiFiledLines = () => {
    // 線の幅
    ctx.fillStyle = "green"
    ctx.fillRect(0, 0, FIELD_SIZE, FIELD_SIZE)
    ctx.lineWidth = 1;
    for (let i = 1; i < COLUMN_SIZE; i++) {
        ctx.beginPath();
        // 横の線
        ctx.moveTo(0, BLOCK_SIZE * i);
        ctx.lineTo(FIELD_SIZE, BLOCK_SIZE * i);
        // 縦の線
        ctx.moveTo(BLOCK_SIZE * i, 0);
        ctx.lineTo(BLOCK_SIZE * i, FIELD_SIZE);
        ctx.closePath();
        ctx.stroke();
    }
};

// banmenデータから石を描画
// 全ての配列データを取り出して、石を配置する関数を呼び出している
banmen.refresh = function () {
    banmen.drawReversiFiledLines()
    for (let x = 0; x < COLUMN_SIZE; x++) {
        for (let y = 0; y < COLUMN_SIZE; y++) {
            drawStone(x, y, this[y][x]);
        }
    }
};

// banmenデータから石が置けるマスを目立たせる
// 石が置けるマスをハイライト表示するための関数
// 通常のマスより少し小さく描画しています
banmen.highlight = function () {
    const MARGIN_SIZE = 2;
    let playerColor = currentPlayer === "white" ? 1 : 2; 
    for (let x = 0; x < COLUMN_SIZE; x++) {
        for (let y = 0; y < COLUMN_SIZE; y++) {
            if(canPutStone(x, y, playerColor, true)){
                // 石が置ける場合はハイライト表示する
                ctx.fillStyle = "#3cb371";
                ctx.fillRect(x * BLOCK_SIZE + MARGIN_SIZE, y * BLOCK_SIZE + MARGIN_SIZE, 46, 46);
            }
        }
    }
};

// 特定の方向に配置してあるひっくり返せる石の情報を集める
banmen.collectStones = function (x, y, color, direction) {
    const stoneColorToReverse = color === WHITE ? BLACK : WHITE; // 手番ではない石の色
    const FIRST_COLUMN_INDEX = 0
    const LAST_COLUMN_INDEX = 7
    const stones = [];
    // 最大7回繰り返し、石の情報を集める
    for (let i = FIRST_COLUMN_INDEX; i < LAST_COLUMN_INDEX; i++) {
        x += direction.x;
        y += direction.y;

        // 盤面の外なので、ループ処理を抜ける
        if (x > LAST_COLUMN_INDEX || x < FIRST_COLUMN_INDEX || y > LAST_COLUMN_INDEX || y < FIRST_COLUMN_INDEX) break;
        // 何も置いてないマスがある場合、ループ処理を抜ける
        if (this[y][x] === 0) break;
        // 石の情報を配列に追加
        stones.push(new Stone(x, y, this[y][x]));
        // 先頭以外で、自分の色が出たらその時点でループ処理を抜ける
        if (this[y][x] === color) break;
    }
    
    // 一つ以下しか配列がない場合、ひっくり返せない
    // ひっくり返せない状況の場合は、空の配列を返す
    if (stones.length <= 1) return [];
    // 配列の先頭が相手の石の色でない場合、ひっくり返せない
    if (stones[0].color !== stoneColorToReverse) return []; 
    // 末尾の石の色が自分と同じ色でない場合、ひっくり返せない
    if (stones[stones.length - 1].color !== color) return [];

    return stones;
}

// banmen.drawReversiFiledLines();
banmen.refresh();
// 盤面データ ----------

class Stone {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
}

// 石がその位置に置けるかを調べる関数
function canPutStone(originX, originY, color, simulation = false) {
    let allStones = []; // ひっくり返せる石を格納しておく配列

    if(banmen[originY][originX] !== 0) return false; // 空じゃないマスには置けない
    
    // 石を置きたい場所の八方向それぞれについて石がどのように配置されているか調べる
    directions.forEach((direction) => {
        // 特定方向で、ひっくり返せる石の情報を配列に貯める
        const stones = banmen.collectStones(originX, originY, color, direction);
        // console.log('stones:' + stones)
        // ひっくり返せる全ての石の配列を作る
        //allStones = [...allStones, ...stones]
        allStones = allStones.concat(stones)
    });

    // ひっくり返せる石があるか？
    const canReverse = allStones.length > 0
    // シミュレーションの場合は、ひっくり返せるかだけ返す
    // この機能を使って、ひっくり返せる位置をユーザーに知らせる仕組みが作れる
    if (simulation) return canReverse;
        
    // 本番(実際に石を引っくり返す)
    if (canReverse) {
        // ひっくり返せる場合の処理
        allStones.push(new Stone(originX, originY, color));
        allStones.forEach(stone => drawStone(stone.x, stone.y, color)); // 自分の色にひっくりかえす

        // 手番の交代
        changePlayer();
        // 石の配置を盤面に反映する
        banmen.refresh();
        // ハイライト表示する
        banmen.highlight();
    }
    return canReverse;
}

// クリックした時に石を置く関数
canvas.onclick = (e) => {
    var rect = e.target.getBoundingClientRect();
    mouseX = e.clientX - Math.floor(rect.left);
    mouseY = e.clientY - Math.floor(rect.top);
    const posX = Math.round((mouseX - BLOCK_SIZE/2) / BLOCK_SIZE);
    const posY = Math.round((mouseY - BLOCK_SIZE/2) / BLOCK_SIZE);

    // 石を置けるか判定
    if (!canPutStone(posX, posY, currentPlayer === "white" ? 1 : 2, false)) {
        alert("そこには置けません 手番: " + currentPlayer); // 置ける場合は置く
    }
};

// x,y座標を指定して石を置く関数
function drawStone(x, y, color) {
    if (color === 1) {
        ctx.fillStyle = "white";
    } else if (color === 2) {
        ctx.fillStyle = "black";
    } else {
        return; // 何もしない
    }
    banmen[y][x] = color;
    ctx.beginPath();
    ctx.arc(25 + x * 50, 25 + y * 50, 22, 0, 2 * Math.PI);
    ctx.fill();
}