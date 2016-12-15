// 以下是ui的一些参数
var degree=4;
var luckymodel=false;
var documentWidth = window.screen.availWidth > 400 ? 400 : window.screen.availWidth;
var game_width=0.99*documentWidth;
var box_width=game_width/(11*4/9+2/9);
var margin=2*box_width/9;
var numSize=5*box_width/9;

var margin_top = 0;
var margin_left = 0;

var color_bg = "#BBADA0";
var color_0 = "#CDC1B3";
var color_1 = "yellow";
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
var color_16384 = "#EEC944";
var color_32768 = "#EEC944";
var color_text1 = "#776F64";
var color_text2 = "#F7F6F2";

// 以下是初始化游戏逻辑会用到的参数
var Erecord=0;
var Mrecord=0;
var Hrecord=0;
var ELrecord=0;
var MLrecord=0;
var HLrecord=0;
var score = 0;
var nums = new Array();
var rnums=new Array();
var rscore=new Array();
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

function uiredefine(t) {
    documentWidth = window.screen.availWidth > t*100 ? t*100 : window.screen.availWidth;
    game_width=0.99*documentWidth;
    box_width=game_width/(11*t/9+2/9);
    margin=2*box_width/9;
    numSize=5*box_width/9;

    canvas.width = game_width;
    canvas.height = game_width;
}
function DoD(cxt,t) {
    switch(t){
        case 0:
            if(luckymodel==false){
                if(window.confirm("Turn on LUCKY MODEL？")){
                    //alert("确定");
                    luckymodel=true;
                    document.getElementById("LMstatus").innerText="on";
                    startGame(cxt);
                }else{
                    //alert("取消");
                }
            }
            else{
                if(window.confirm("Turn off LUCKY MODEL？")){
                    //alert("确定");
                    luckymodel=false;
                    document.getElementById("LMstatus").innerText="off";
                    startGame(cxt);
                }else{
                    //alert("取消");
                }
            }
            break;
        case 1:
            do{
                if(!(degree=parseInt(prompt("输入阶数（范围3-10之间,系统自动取最大整）：","4")))) {
                    degree=4;
                }
                else if(degree<3){
                    alert("阶数不能小于3！");
                }
                else if(degree>10){
                    alert("会崩的啊，放过我吧!");
                }
            }while(degree<3||degree>10);
            uiredefine(degree);
            startGame(cxt);
            break;
        case 4:
            degree=4;
            uiredefine(degree);
            startGame(cxt);
            break;
        case 5:
            degree=5;
            uiredefine(degree);
            startGame(cxt);
            break;
        case 6:
            degree=6;
            uiredefine(degree);
            startGame(cxt);
            break;
    }
}

function recall(cxt) {
    if(!recalljudge()){
        alert("无法退步或已达退步上限（十步）！");
        return false;
    }
    else{
        for (var i = 0; i < degree; i++) {
            for (var j = 0; j < degree; j++) {
                nums[i][j]=rnums[i][j][9];
                for(var k=9;k>0;k--){
                    rnums[i][j][k]=rnums[i][j][k-1];
                }
                rnums[i][j][0]=0;
            }

        }
        if (degree == 4 && luckymodel == false) {
            if(Erecord==score){
                Erecord=rscore[9];
                document.getElementById("Erecord").innerText = Erecord;
            }
        }
        else if (degree == 5 && luckymodel == false) {
            if(Mrecord==score){
                Mrecord=rscore[9];
                document.getElementById("Mrecord").innerText = Mrecord;
            }
        }
        else if (degree == 6 && luckymodel == false) {
            if(Hrecord==score){
                Hrecord=rscore[9];
                document.getElementById("Hrecord").innerText = Hrecord;
            }
        }
        else if (degree == 4 && luckymodel == true) {
            if(ELrecord==score){
                ELrecord=rscore[9];
                document.getElementById("ELrecord").innerText = ELrecord;
            }
        }
        else if(degree == 5 && luckymodel == true){
            if(MLrecord==score){
                MLrecord=rscore[9];
                document.getElementById("MLrecord").innerText = MLrecord;
            }
        }
        else if(degree == 6 && luckymodel == true){
            if(HLrecord==score){
                HLrecord=rscore[9];
                document.getElementById("HLrecord").innerText = HLrecord;
            }
        }
        score=rscore[9];
        for(i=9;i>0;i--){
            rscore[i]=rscore[i-1]
        }
        rscore[0]=0;
        updateScore(score);
        drawBackGround(cxt);
        updateBoardView(cxt);
    }
}

function recalljudge() {
    for (var i = 0; i < degree; i++) {
        for (var j = 0; j < degree; j++) {
            if(rnums[i][j][9]!=0){
                return true;
            }
        }
    }
}

function drawBackGround(cxt) {
    drawRoundRect(cxt, margin_left, margin_top, game_width, game_width, 5);
    cxt.fillStyle = color_bg;
    cxt.fill();
}
/**
 * 初始化ui和棋盘二维数组
 * @param  {[type]} cxt []
 * @return {[type]}     []
 */
function init(cxt) {
    //游戏背景
    drawBackGround(cxt);

    //初始化二维数组
    for (var i = 0; i < degree; i++) {
        nums[i] = new Array();
        for (var j = 0; j < degree; j++) {
            nums[i][j] = 0
        }
    }

    //初始化撤销数组
    for (i = 0; i < degree; i++) {
        rnums[i] = new Array();
        for (j = 0; j < degree; j++) {
            rnums[i][j] = new Array();
            for(var k=0;k<10;k++){
                rnums[i][j][k]=0;
            }
        }
    }
    for(i=0;i<10;i++){
        rscore[i]=0;
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

/**
 * 绘制方块
 * @param  {[type]} cxt  []
 * @param  {[type]} i    [方块的行]
 * @param  {[type]} j    [方块的列]
 * @param  {[type]} nums [方块的数值]
 * @return {[type]}      []
 */
function drawBox(cxt, i, j, nums) {

    var x = (i + 1) * margin + margin_left + i * box_width;
    var y = (j + 1) * margin + margin_top + j * box_width;

    drawRoundRect(cxt, x, y, box_width, box_width, 5);

    cxt.font = numSize + "px Arial"; // 60px Arial
    cxt.textAlign = "center";
    cxt.textBaseline = "middle";

    switch (nums) {
        case 0:
            cxt.fillStyle = color_0;
            break;
        case 1:
            cxt.fillStyle = color_0;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_1;
            drawStar(cxt , x + box_width / 2,y + box_width / 2,box_width/2,72*Math.random());
            break;
        case 2:
            cxt.fillStyle = color_2;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text1;
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2);
            break;
        case 4:
            cxt.fillStyle = color_4;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text1;
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2);
            break;
        case 8:
            cxt.fillStyle = color_8;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text2;
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2);
            break;
        case 16:
            cxt.fillStyle = color_16;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text2;
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2);
            break;
        case 32:
            cxt.fillStyle = color_32;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text2;
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2);
            break;
        case 64:
            cxt.fillStyle = color_64;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text2;
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2);
            break;
        case 128:
            cxt.fillStyle = color_128;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.95 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2);
            break;
        case 256:
            cxt.fillStyle = color_256;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.95 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2);
            break;
        case 512:
            cxt.fillStyle = color_512;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.95 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2);
            break;
        case 1024:
            cxt.fillStyle = color_1024;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.8 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2);
            break;
        case 2048:
            cxt.fillStyle = color_2048;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.8 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2);
            break;
        case 4096:
            cxt.fillStyle = color_4096;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.8 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2);
            break;
        case 8192:
            cxt.fillStyle = color_8192;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.8 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2);
            break;
        case 16384:
            cxt.fillStyle = color_16384;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.65 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2);
            break;
        case 32768:
            cxt.fillStyle = color_32768;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.65 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText(nums, x + box_width / 2, y + box_width / 2);
            break;
        default:
            break;
    }

    cxt.fill();
}

function drawStar(cxt, x, y, R, rot) {
    cxt.beginPath();
    for (var i = 0; i < 5; i++) {
        cxt.lineTo(
            Math.cos((18 + i * 72 - rot) / 180 * Math.PI) * R + x,
            -Math.sin((18 + i * 72 - rot) / 180 * Math.PI) * R + y
        );
        cxt.lineTo(
            Math.cos((54 + i * 72 - rot) / 180 * Math.PI) * R/2 + x,
            -Math.sin((54 + i * 72 - rot) / 180 * Math.PI) * R/2 + y
        );
    }
    cxt.closePath();
}

/**
 * 刷新ui（根据全局的棋盘信息nums重新绘制ui）
 * @param  {[type]} cxt []
 * @return {[type]}     []
 */
function updateBoardView(cxt) {
    for (var i = 0; i < degree; i++) {
        for (var j = 0; j < degree; j++) {
            drawBox(cxt, i, j, nums[i][j])
        }
    }
}
