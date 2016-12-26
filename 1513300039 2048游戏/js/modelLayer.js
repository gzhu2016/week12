/**
 * Created by airing on 15/10/19.
 */
var documentWidth = window.screen.availWidth >500? 500: window.screen.availWidth;
var margin = 0.04 * documentWidth;
var game_width = 0.92 * documentWidth;
var box_width = 0.18 * documentWidth;
var numSize = 0.10 * documentWidth;

var margin_top = 0;
var margin_left = 0;

var color_bg = "#BBADA0";
var color_0 = "#CDC1B3";
var color_2 = "#EEE4DA";
var color_4 = "#EEE0C6";
var color_8 = "#F3B174";
var color_16 = "#F8955C";
var color_32 = "#F87C5A";
var color_64 = "#F65E3B";
var color_128 = "#ECCF85";
var color_256 = "#EDCD62";
var color_512 = "#EEC944";
var color_1024 = "#EEC944";
var color_2048 = "#EEC944";
var color_4096 = "#EEC944";
var color_8192 = "#EEC944";
var color_text1 = "#776F64";
var color_text2 = "#F7F6F2";
var score = 0;
var nums = new Array();
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

var searchLight = {
    x: 200,
    y: 200,
    radius: 100,
    vx: Math.random()*5+10,
    vy: Math.random()*5+10
}


function init(cxt) {
    //游戏背景
    drawRoundRect(cxt, margin_left, margin_top, game_width, game_width, 5);
    cxt.fillStyle = color_bg;
    cxt.fill();

    //初始化二维数组
    for(var i = 0; i < 4; i++){
        nums[i] = new Array();
        for(var j = 0; j < 4; j++){
            nums[i][j] = 0;
        }
    }

    //初始化16个小格子
    updateBoardView(cxt);
}

function drawRoundRect(cxt, x, y, w, h, r) {
    cxt.beginPath();
    cxt.arc(r + x, r + y, r, 1.0 * Math.PI, 1.5 * Math.PI, false);
    cxt.lineTo(w - r + x, y);
    cxt.arc(w - r + x, r + y, r, 1.5 * Math.PI, 2.0 * Math.PI, false);
    cxt.lineTo(w + x, h - r + y);
    cxt.arc(w - r + x, h - r + y, r, 0.0 * Math.PI, 0.5 * Math.PI, false);
    cxt.lineTo(r + x, h + y);
    cxt.arc(r + x, h - r + y, r, 0.5 * Math.PI, 1.0 * Math.PI, false);
    cxt.closePath();
}

function drawBox(cxt, i, j, nums){

    var x = (i+1)* margin + margin_left +i * box_width;
    var y = (j+1)* margin + margin_top +j * box_width;

    drawRoundRect(cxt , x, y, box_width, box_width, 5);

    cxt.font = numSize + "px Arial";  // 60px Arial
    cxt.textAlign = "center"
    cxt.textBaseline = "middle"

    switch (nums) {
        case 0:
            cxt.fillStyle=color_0;
            break;
        case 2:
            cxt.fillStyle=color_2;
            cxt.fill();
            cxt.beginPath()
            cxt.fillStyle = color_text1;
            cxt.fillText('小班', x + box_width/2 , y+box_width/2)
            break;
        case 4:
            cxt.fillStyle = color_4;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text1;
            cxt.fillText('中班', x + box_width / 2, y + box_width / 2);
            break;
        case 8:
            cxt.fillStyle = color_8;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text2;
            cxt.fillText('大班', x + box_width / 2, y + box_width / 2);
            break;
        case 16:
            cxt.fillStyle = color_16;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text2;
            cxt.fillText('小学', x + box_width / 2, y + box_width / 2);
            break;
        case 32:
            cxt.fillStyle = color_32;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text2;
            cxt.fillText('初中', x + box_width / 2, y + box_width / 2);
            break;
        case 64:
            cxt.fillStyle = color_64;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text2;
            cxt.fillText('高中', x + box_width / 2, y + box_width / 2);
            break;
        case 128:
            cxt.fillStyle = color_128;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.95 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText('大学', x + box_width / 2, y + box_width / 2);
            break;
        case 256:
            cxt.fillStyle = color_256;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.95 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText('硕士', x + box_width / 2, y + box_width / 2);
            break;
        case 512:
            cxt.fillStyle = color_512;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.95 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText('博士', x + box_width / 2, y + box_width / 2);
            break;
        case 1024:
            cxt.fillStyle = color_1024;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.6 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText('博士后', x + box_width / 2, y + box_width / 2);
            break;
        case 2048:
            cxt.fillStyle = color_2048;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.9 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText('学霸', x + box_width / 2, y + box_width / 2);
            break;
        case 4096:
            cxt.fillStyle = color_4096;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.9 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText('学神', x + box_width / 2, y + box_width / 2);
            break;
        case 8192:
            cxt.fillStyle = color_8192;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.9 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText('学魔', x + box_width / 2, y + box_width / 2);
            break;
        default :
            break;
    }

    cxt.fill();
}

//刷新View
function updateBoardView(cxt) {

 //   cxt.clearRect();

    cxt.save();

    cxt.beginPath();
    cxt.fillStyle = "black";
    cxt.fillRect(0, 0, game_width, game_width);

    cxt.beginPath();
   // context.arc(200, 200, 150, 0, Math.PI * 2);
    cxt.arc(searchLight.x, searchLight.y, searchLight.radius, 0, Math.PI * 2)
    cxt.fillStyle = color_bg
    cxt.fill()
    cxt.clip()

    for(var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            drawBox(cxt, i, j, nums[i][j]);
        }
    }

    cxt.restore();
}

function update(canvasWidth, canvasHeight) {
    searchLight.x += searchLight.vx;
    searchLight.y += searchLight.vy;

    if(searchLight.x - searchLight.radius <= 0) {
        searchLight.vx = -searchLight.vx;
        searchLight.x = searchLight.radius;
    }

    if(searchLight.x + searchLight.radius >= canvasWidth) {
        searchLight.vx = -searchLight.vx;
        searchLight.x = canvasWidth- searchLight.radius;
    }

    if(searchLight.y - searchLight.radius <= 0) {
        searchLight.vy = -searchLight.vy;
        searchLight.y = searchLight.radius;
    }

    if(searchLight.y + searchLight.radius >= canvasHeight) {
        searchLight.vy = -searchLight.vy;
        searchLight.y = canvasHeight - searchLight.radius;
    }
}
