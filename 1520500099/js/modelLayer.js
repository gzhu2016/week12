// 以下是ui的一些参数
var documentWidth = window.screen.availWidth > 800 ? 800 : window.screen.availWidth
var margin = 0.04 * documentWidth
var game_width = 0.92 * documentWidth
var box_width = 0.18 * documentWidth
var numSize = 0.10 * documentWidth

var margin_top = 0
var margin_left = 0

var color_bg = "#FFB6C1"
var color_0 = "#FFC0CB"
var color_2 = "#DC143C"
var color_4 = "#FFF0F5"
var color_8 = "#DB7093"
var color_16 = "#F8955C"
var color_32 = "#FF69B4"
var color_64 = "#C71585"
var color_128 = "#ECCF85"
var color_256 = "#EE82EE"
var color_512 = "#EEC944"
var color_1024 = "#FF00FF"
var color_2048 = "#8B008B"
var color_4096 = "#EEC944"
var color_8192 = "#4B0082"
var color_text1 = "#191970"
var color_text2 = "#000000"

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
    for (var i = 0; i < 4; i++) {
        nums[i] = new Array()
        for (var j = 0; j < 4; j++) {
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
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2)
            break;
        case 4:
            cxt.fillStyle = color_4
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text1
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2)
            break;
        case 8:
            cxt.fillStyle = color_8
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2)
            break;
        case 16:
            cxt.fillStyle = color_16
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2)
            break;
        case 32:
            cxt.fillStyle = color_32
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2)
            break;
        case 64:
            cxt.fillStyle = color_64
            cxt.fill()
            cxt.beginPath()
            cxt.fillStyle = color_text2
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2)
            break;
        case 128:
            cxt.fillStyle = color_128
            cxt.fill()
            cxt.beginPath()
            cxt.font = (0.95 * numSize) + "px Arial"
            cxt.fillStyle = color_text2
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2)
            break;
        case 256:
            cxt.fillStyle = color_256
            cxt.fill()
            cxt.beginPath()
            cxt.font = (0.95 * numSize) + "px Arial"
            cxt.fillStyle = color_text2
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2)
            break;
        case 512:
            cxt.fillStyle = color_512
            cxt.fill()
            cxt.beginPath()
            cxt.font = (0.95 * numSize) + "px Arial"
            cxt.fillStyle = color_text2
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2)
            break;
        case 1024:
            cxt.fillStyle = color_1024
            cxt.fill()
            cxt.beginPath()
            cxt.font = (0.9 * numSize) + "px Arial"
            cxt.fillStyle = color_text2
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2)
            break;
        case 2048:
            cxt.fillStyle = color_2048
            cxt.fill()
            cxt.beginPath()
            cxt.font = (0.9 * numSize) + "px Arial"
            cxt.fillStyle = color_text2
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2)
            break;
        case 4096:
            cxt.fillStyle = color_4096
            cxt.fill()
            cxt.beginPath()
            cxt.font = (0.9 * numSize) + "px Arial"
            cxt.fillStyle = color_text2
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2)
            break;
        case 8192:
            cxt.fillStyle = color_8192
            cxt.fill()
            cxt.beginPath()
            cxt.font = (0.9 * numSize) + "px Arial"
            cxt.fillStyle = color_text2
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2)
            break
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
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            drawBox(cxt, i, j, nums[i][j])
        }
    }
}