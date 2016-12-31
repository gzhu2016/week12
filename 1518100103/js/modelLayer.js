/**
 * Created by pc on 2016/12/22.
 */

var documentWidth = window.screen.availWidth > 400 ? 400 : window.screen.availWidth;
var margin = 0.04 * documentWidth;
var game_width = 0.92 * documentWidth;
var box_width = 0.18 * documentWidth;
var numSize = 0.10 * documentWidth;
// it seems that it is not allowed to use this name ?

var margin_top = 0;
var margin_left = 0;
var dis1 = documentWidth * 3 / 4;
var dis2 = documentWidth * 2;
//I copy this part
var color_bg = "#BBADA0"
var color_0 = "#CDC1B3"
var color_2 = "#EEE4DA"
var color_4 = "#EEE0C6"
var color_8 = "#F3B174"
var color_16 = "#F8955C"
var color_32 = "#F87C5A"
var color_64 = "#F65E3B"
var color_128 = "#ECCF85"
var color_256 = "#EDCD62"
var color_512 = "#EEC944"
var color_1024 = "#EEC944"
var color_2048 = "#EEC944"
var color_4096 = "#EEC944"
var color_8192 = "#EEC944"
var color_text1 = "#776F64"//数字的颜色 2/4都是偏黑色 其他都是白色
var color_text2 = "#F7F6F2"//

var score1 = 0;
var score2 = 0;
var nums = new Array();
var nums1 = new Array();
var nums2 = new Array();
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;
var win = 0;

function init(cxt, player) {
    var dis = 0;
    if (player == 1) {
        nums = nums1;
        dis = dis1;
    }
    else {
        nums = nums2;
        dis = dis2
    }

    drawRoundRect(cxt, margin_left, margin_top, game_width, game_width, 5, dis);
    cxt.fillStyle = color_bg;
    cxt.fill();

    for (var i = 0; i < 4; i++) {
        nums[i] = new Array();
        for (var j = 0; j < 4; j++) {
            nums[i][j] = 0;
        }
    }
    // in JS, you can't directly new a two dimensional array
    updateBoardView(cxt, player);
}

function drawRoundRect(cxt, x, y, w, h, r, dis) {
    cxt.beginPath();
    cxt.arc(r + x + dis, r + y, r, 1.0 * Math.PI, 1.5 * Math.PI, false);
    cxt.lineTo(w - r + x + dis, y);
    cxt.arc(w - r + x + dis, r + y, r, 1.5 * Math.PI, 2.0 * Math.PI, false)
    cxt.lineTo(w + x + dis, h - r + y)
    cxt.arc(w - r + x + dis, h - r + y, r, 0.0 * Math.PI, 0.5 * Math.PI, false)
    cxt.lineTo(r + x + dis, h + y)
    cxt.arc(r + x + dis, h - r + y, r, 0.5 * Math.PI, 1.0 * Math.PI, false)
    cxt.closePath()
    //those without ";" are copied...
}

function drawBox(cxt, i, j, num, dis) {
    //I try to fix the I and J
    var x = (i + 1) * margin + margin_left + i * box_width;
    var y = (j + 1) * margin + margin_top + j * box_width;

    drawRoundRect(cxt, x, y, box_width, box_width, 5, dis);

    cxt.font = numSize + "px Arial"; //this is an useful expression
    cxt.textAlign = "center";
    cxt.textBaseline = "middle";

    //this part is copied too
    switch (num) {
        case 0:
            cxt.fillStyle = color_0
            break
        case 2:
            cxt.fillStyle = color_2
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text1
            cxt.fillText(num, x + box_width / 2 + dis, y + box_width / 2)
            break;
        case 4:
            cxt.fillStyle = color_4
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text1
            cxt.fillText(num, x + box_width / 2 + dis, y + box_width / 2)
            break;
        case 8:
            cxt.fillStyle = color_8
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText(num, x + box_width / 2 + dis, y + box_width / 2)
            break;
        case 16:
            cxt.fillStyle = color_16
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText(num, x + box_width / 2 + dis, y + box_width / 2)
            break;
        case 32:
            cxt.fillStyle = color_32
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText(num, x + box_width / 2 + dis, y + box_width / 2)
            break;
        case 64:
            cxt.fillStyle = color_64
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText(num, x + box_width / 2 + dis, y + box_width / 2)
            break;
        case 128:
            cxt.fillStyle = color_128
            cxt.fill()
            cxt.beginPath()
            cxt.font = (0.95 * numSize) + "px Arial"
            cxt.fillStyle = color_text2
            cxt.fillText(num, x + box_width / 2 + dis, y + box_width / 2)
            break;
        case 256:
            cxt.fillStyle = color_256
            cxt.fill()
            cxt.beginPath()
            cxt.font = (0.95 * numSize) + "px Arial"
            cxt.fillStyle = color_text2
            cxt.fillText(num, x + box_width / 2 + dis, y + box_width / 2)
            break;
        case 512:
            cxt.fillStyle = color_512
            cxt.fill()
            cxt.beginPath()
            cxt.font = (0.95 * numSize) + "px Arial"
            cxt.fillStyle = color_text2
            cxt.fillText(num, x + box_width / 2 + dis, y + box_width / 2)
            break;
        case 1024:
            cxt.fillStyle = color_1024
            cxt.fill()
            cxt.beginPath()
            cxt.font = (0.9 * numSize) + "px Arial"
            cxt.fillStyle = color_text2
            cxt.fillText(num, x + box_width / 2 + dis, y + box_width / 2)
            break;
        case 2048:
            cxt.fillStyle = color_2048
            cxt.fill()
            cxt.beginPath()
            cxt.font = (0.9 * numSize) + "px Arial"
            cxt.fillStyle = color_text2
            cxt.fillText(num, x + box_width / 2 + dis, y + box_width / 2)
            break;
        case 4096:
            cxt.fillStyle = color_4096
            cxt.fill()
            cxt.beginPath()
            cxt.font = (0.9 * numSize) + "px Arial"
            cxt.fillStyle = color_text2
            cxt.fillText(num, x + box_width / 2 + dis, y + box_width / 2)
            break;
        case 8192:
            cxt.fillStyle = color_8192
            cxt.fill()
            cxt.beginPath()
            cxt.font = (0.9 * numSize) + "px Arial"
            cxt.fillStyle = color_text2
            cxt.fillText(num, x + box_width / 2 + dis, y + box_width / 2)
            break
        default:
            break
    }

    cxt.fill();
}

function updateBoardView(cxt, player) {
    var dis;
    if (player == 1) {
        nums = nums1;
        dis = dis1;
    }
    else {
        nums = nums2;
        dis = dis2
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            drawBox(cxt, j, i, nums[i][j], dis);
        }
    }
}