// 以下是ui的一些参数
var documentWidth = window.screen.availWidth > 500 ? 500 : window.screen.availWidth
var margin = 0.04 * documentWidth
var game_width = 1.36 * documentWidth
var box_width = 0.18 * documentWidth
var numSize = 0.10 * documentWidth

var margin_top = 0
var margin_left = 0

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
var color_1024 = "#FFFF00"
var color_2048 = "#26FF64"
var color_4096 = "#26FFB4"
var color_8192 = "#00FFFF"
var color_16384 = "#26A0FF"
var color_32768 = "#9926FF"
var color_65536 = "#FF26FF"

var color_text1 = "#776F64"
var color_text2 = "#F7F6F2"

// 以下是初始化游戏逻辑会用到的参数
var score = 0
var nums = new Array()
var startX = 0
var startY = 0
var endX = 0
var endY = 0


/**
 * 初始化ui和棋盘二维数组
 * @param  {[type]} cxt []
 * @return {[type]}     []
 */
function init(cxt) {
    //游戏背景
    drawRoundRect(cxt, margin_left, margin_top, game_width, game_width, 5)
    cxt.fillStyle = color_bg
    cxt.fill()

    //初始化二维数组
    for (var i = 0; i < 6; i++) {
        nums[i] = new Array()
        for (var j = 0; j < 6; j++) {
            nums[i][j] = 0
        }
    }

    //初始化16个小格子
    updateBoardView(cxt)
}

/**
 * 绘制圆角矩形
 * @param  {[type]} cxt []
 * @param  {[type]} x   []
 * @param  {[type]} y   []
 * @param  {[type]} w   []
 * @param  {[type]} h   []
 * @param  {[type]} r   []
 * @return {[type]}     []
 */
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

/**
 * 绘制方块
 * @param  {[type]} cxt  []
 * @param  {[type]} i    [方块的行]
 * @param  {[type]} j    [方块的列]
 * @param  {[type]} nums [方块的数值]
 * @return {[type]}      []
 */
function drawBox(cxt, i, j, nums) {

    var x = (i + 1) * margin + margin_left + i * box_width
    var y = (j + 1) * margin + margin_top + j * box_width

    drawRoundRect(cxt, x, y, box_width, box_width, 5)

    cxt.font = numSize + "px Arial" // 60px Arial
    cxt.textAlign = "center"
    cxt.textBaseline = "middle"

    switch (nums) {
        case 0:
            cxt.fillStyle = color_0
            break
        case 2:
            cxt.fillStyle = color_2
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text1
            cxt.fillText(1, x + box_width / 2, y + box_width / 2)
            break;
        case 4:
            cxt.fillStyle = color_4
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text1
            cxt.fillText(2, x + box_width / 2, y + box_width / 2)
            break;
        case 8:
            cxt.fillStyle = color_8
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText(3, x + box_width / 2, y + box_width / 2)
            break;
        case 16:
            cxt.fillStyle = color_16
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText(4, x + box_width / 2, y + box_width / 2)
            break;
        case 32:
            cxt.fillStyle = color_32
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText(5, x + box_width / 2, y + box_width / 2)
            break;
        case 64:
            cxt.fillStyle = color_64
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText(6, x + box_width / 2, y + box_width / 2)
            break;
        case 128:
            cxt.fillStyle = color_128
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText(7, x + box_width / 2, y + box_width / 2)
            break;
        case 256:
            cxt.fillStyle = color_256
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText(8, x + box_width / 2, y + box_width / 2)
            break;
        case 512:
            cxt.fillStyle = color_512
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText(9, x + box_width / 2, y + box_width / 2)
            break;
        case 1024:
            cxt.fillStyle = color_1024
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText('A', x + box_width / 2, y + box_width / 2)
            break;
        case 2048:
            cxt.fillStyle = color_2048
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText('B', x + box_width / 2, y + box_width / 2)
            break;
        case 4096:
            cxt.fillStyle = color_4096
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText('C', x + box_width / 2, y + box_width / 2)
            break;
        case 8192:
            cxt.fillStyle = color_8192
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText('D', x + box_width / 2, y + box_width / 2)
            break;
        case 16384:
            cxt.fillStyle = color_16384
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText('E', x + box_width / 2, y + box_width / 2)
            break;
        case 32768:
            cxt.fillStyle = color_32768
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText('F', x + box_width / 2, y + box_width / 2)
            break;
        case 65536:
            cxt.fillStyle = color_65536
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText(10, x + box_width / 2, y + box_width / 2)
            break;
        default:
            break
    }

    cxt.fill();
}

/**
 * 刷新ui（根据全局的棋盘信息nums重新绘制ui）
 * @param  {[type]} cxt []
 * @return {[type]}     []
 */
function updateBoardView(cxt) {
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            drawBox(cxt, i, j, nums[i][j])
        }
    }
}