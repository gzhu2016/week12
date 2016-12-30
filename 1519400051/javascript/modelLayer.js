/**
 * Created by Venus on 2016/11/15.
 */
var documentWidth = window.screen.availWidth > 500 ? 500 : window.screen.availWidth;
var margin = 0.04*documentWidth;
var game_width = 1*documentWidth;
var box_width = 0.2*documentWidth;
var numSize = 0.12*documentWidth;

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
var v = 1;

var score = 0;
var nums = new Array();
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

function init(cxt){
    drawRoundRect(cxt , margin_left , margin_top , game_width , game_width , 5);
    cxt.fillStyle = color_bg;
    cxt.fill();

    for (var i = 0 ; i < 4 ; i++){
        nums[i] = new Array();
        for (var j = 0 ; j < 4 ; j++){
            nums[i][j] = 0;
        }
    }
    updateBoardView(cxt);
}

function drawRoundRect(cxt, x, y, w, h, r) {
    cxt.beginPath()
    cxt.arc(r + x, r + y, r, 1.0 * Math.PI, 1.5 * Math.PI, false)
    cxt.lineTo(w - r + x, y)
    cxt.arc(w - r + x, r + y, r, 1.5 * Math.PI, 2.0 * Math.PI, false)
    cxt.lineTo(w + x, h - r + y)
    cxt.arc(w - r + x, h - r + y, r, 0.0 * Math.PI, 0.5 * Math.PI, false)
    cxt.lineTo(r + x, h + y)
    cxt.arc(r + x, h - r + y, r, 0.5 * Math.PI, 1.0 * Math.PI, false)
    cxt.closePath()
}

function drawBox(cxt , i , j , num){
    var x = (i + 1) * margin + margin_left + i * box_width;
    var y = (j + 1) * margin + margin_top + j * box_width;
    drawRoundRect(cxt , x , y , box_width , box_width , 5);
    cxt.font = numSize + "px Arial";
    cxt.textAlign = "center";
    cxt.textBaseline = "middle";

    switch(num){
        case 0:
            cxt.fillStyle = color_0;
            break;
        case 2:
        function drawStyle_2() {
            cxt.fillStyle = color_2;
            drawRoundRect(cxt , x+box_width/2-1*v , y+box_width/2-1*v , 2*v , 2*v ,5);
            cxt.fill();
            v+=2;
            if (v > 50 ) {
                clearInterval(int);
                v = 1;

                cxt.fillStyle = color_text1;
                cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            }
        }
            var int = setInterval(drawStyle_2,20);
            break;
        case 4:
            function drawStyle_4() {
                cxt.fillStyle = color_4;
                drawRoundRect(cxt , x+box_width/2-1*v , y+box_width/2-1*v , 2*v , 2*v ,5);
                cxt.fill();
                v+=2;
                if (v > 50 ) {
                    clearInterval(int);
                    v = 1;

                    cxt.fillStyle = color_text1;
                    cxt.fillText(num, x + box_width / 2, y + box_width / 2);
                }
            }
            var int = setInterval(drawStyle_4,20);
            break;
        case 8:
        function drawStyle_8() {
            cxt.fillStyle = color_8;
            drawRoundRect(cxt , x+box_width/2-1*v , y+box_width/2-1*v , 2*v , 2*v ,5);
            cxt.fill();
            v++;
            if (v > 50 ) {
                clearInterval(int);
                v = 1;
                cxt.beginPath();
                cxt.fillStyle = color_text2;
                cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            }
        }
            var int = setInterval(drawStyle_8,20);
            break;
        case 16:
        function drawStyle_16() {
            cxt.fillStyle = color_16;
            drawRoundRect(cxt , x+box_width/2-1*v , y+box_width/2-1*v , 2*v , 2*v ,5);
            cxt.fill();
            v++;
            if (v > 50 ) {
                clearInterval(int);
                v = 1;
                cxt.beginPath();
                cxt.fillStyle = color_text2;
                cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            }
        }
            var int = setInterval(drawStyle_16,20);
            break;
        case 32:
        function drawStyle_32() {
            cxt.fillStyle = color_32;
            drawRoundRect(cxt , x+box_width/2-1*v , y+box_width/2-1*v , 2*v , 2*v ,5);
            cxt.fill();
            v++;
            if (v > 50 ) {
                clearInterval(int);
                v = 1;
                cxt.beginPath();
                cxt.fillStyle = color_text2;
                cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            }
        }
            var int = setInterval(drawStyle_32,20);
            break;
        case 64:
        function drawStyle_64() {
            cxt.fillStyle = color_64;
            drawRoundRect(cxt , x+box_width/2-1*v , y+box_width/2-1*v , 2*v , 2*v ,5);
            cxt.fill();
            v++;
            if (v > 50 ) {
                clearInterval(int);
                v = 1;
                cxt.beginPath();
                cxt.fillStyle = color_text2;
                cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            }
        }
            var int = setInterval(drawStyle_64,20);
            break;
        case 128:
        function drawStyle_128() {
            cxt.fillStyle = color_128;
            drawRoundRect(cxt , x+box_width/2-1*v , y+box_width/2-1*v , 2*v , 2*v ,5);
            cxt.fill();
            v++;
            if (v > 50 ) {
                clearInterval(int);
                v = 1;
                cxt.beginPath();
                cxt.font = (0.95 * numSize) + "px Arial";
                cxt.fillStyle = color_text2;
                cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            }
        }
            var int = setInterval(drawStyle_128,20);
            break;
        case 256:
        function drawStyle_256() {
            cxt.fillStyle = color_256;
            drawRoundRect(cxt , x+box_width/2-1*v , y+box_width/2-1*v , 2*v , 2*v ,5);
            cxt.fill();
            v++;
            if (v > 50 ) {
                clearInterval(int);
                v = 1;
                cxt.beginPath();
                cxt.font = (0.95 * numSize) + "px Arial";
                cxt.fillStyle = color_text2;
                cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            }
        }
            var int = setInterval(drawStyle_256,20);
            break;
        case 512:
        function drawStyle_512() {
            cxt.fillStyle = color_512;
            drawRoundRect(cxt , x+box_width/2-1*v , y+box_width/2-1*v , 2*v , 2*v ,5);
            cxt.fill();
            v++;
            if (v > 50 ) {
                clearInterval(int);
                v = 1;
                cxt.beginPath();
                cxt.font = (0.95 * numSize) + "px Arial";
                cxt.fillStyle = color_text2;
                cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            }
        }
            var int = setInterval(drawStyle_512,20);
            break;
        case 1024:
            function drawStyle_1024() {
            cxt.fillStyle = color_1024;
            drawRoundRect(cxt , x+box_width/2-1*v , y+box_width/2-1*v , 2*v , 2*v ,5);
            cxt.fill();
            v++;
            if (v > 50 ) {
                clearInterval(int);
                v = 1;
                cxt.beginPath();
                cxt.font = (0.7 * numSize) + "px Arial";
                cxt.fillStyle = color_text2;
                cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            }
        }
            var int = setInterval(drawStyle_1024,20);
            break;
        case 2048:
        function drawStyle_2048() {
            cxt.fillStyle = color_2048;
            drawRoundRect(cxt , x+box_width/2-1*v , y+box_width/2-1*v , 2*v , 2*v ,5);
            cxt.fill();
            v++;
            if (v > 50 ) {
                clearInterval(int);
                v = 1;
                cxt.beginPath();
                cxt.font = (0.7 * numSize) + "px Arial";
                cxt.fillStyle = color_text2;
                cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            }
        }
            var int = setInterval(drawStyle_2048,20);
            break;
        case 4096:
        function drawStyle_4096() {
            cxt.fillStyle = color_4096;
            drawRoundRect(cxt , x+box_width/2-1*v , y+box_width/2-1*v , 2*v , 2*v ,5);
            cxt.fill();
            v++;
            if (v > 50 ) {
                clearInterval(int);
                v = 1;
                cxt.beginPath();
                cxt.font = (0.7 * numSize) + "px Arial";
                cxt.fillStyle = color_text2;
                cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            }
        }
            var int = setInterval(drawStyle_4096,20);
            break;
        case 8192:
        function drawStyle_8192() {
            cxt.fillStyle = color_8192;
            drawRoundRect(cxt , x+box_width/2-1*v , y+box_width/2-1*v , 2*v , 2*v ,5);
            cxt.fill();
            v++;
            if (v > 50 ) {
                clearInterval(int);
                v = 1;
                cxt.beginPath();
                cxt.font = (0.7 * numSize) + "px Arial";
                cxt.fillStyle = color_text2;
                cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            }
        }
            var int = setInterval(drawStyle_8192,20);
            break;
        default:
            break;
    }
    cxt.fill();
}

function updateBoardView(cxt){
    for (var i = 0 ; i < 4 ; i++){
        for (var j = 0 ; j < 4 ; j++){
            drawBox(cxt , i , j , nums[i][j]);
        }
    }
}
