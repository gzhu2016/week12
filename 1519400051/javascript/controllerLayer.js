/**
 * Created by Venus on 2016/11/15.
 */
function startGame(cxt){
    init(cxt);
    score = 0;
    updateScore(score);
    newBox(cxt);
    newBox(cxt);
}

function newBox(cxt){
    if (noSpace()){
        return false;
    }
    var randx = parseInt( Math.floor(Math.random()*4) );
    var randy = parseInt( Math.floor(Math.random()*4) );
    var times = 0;
    while(times < 50){
        if (nums[randx][randy] == 0 ){
            break;
        }
        randx = parseInt( Math.floor(Math.random()*4) );
        randy = parseInt( Math.floor(Math.random()*4) );
        times++;
    }
    if (times == 50){
        for (var i = 0 ; i < 4 ; i++){
            for (var j = 0 ; j < 4 ; j++){
                if (nums[i][j] == 0){
                    randx = i;
                    randy = j;
                }
            }
        }
    }
    var  randNumber = Math.random() < 0.5 ? 2 : 4 ;
    nums[randx][randy] = randNumber;

    drawBox(cxt , randx , randy , randNumber);
    return true;
}

function moveKeyDown(){
    event.preventDefault();
    switch (event.keyCode){
        case 37:
            if (moveLeft()) {
                newBox(context);
                isGameOver();
            }
            break;
        case 38:
            if (moveUp()) {
                newBox(context);
                isGameOver();
            }
            break;
        case 39:
            if (moveRight()) {
                newBox(context);
                isGameOver();
            }
            break;
        case 40:
            if (moveDown()) {
                newBox(context);
                isGameOver();
            }
            break;
        default:
            break;
    }
}

document.addEventListener('touchstart' , function(event){
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});

document.addEventListener('touchend' , function(event){
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    var daltaX = endX - startX;
    var daltaY = endY - startY;

    if (Math.abs(daltaX) < 0.3 * documentWidth && Math.abs(daltaY < 0.3 * documentWidth))
        return

    if (Math.abs(daltaX) >= Math.abs(daltaY)){
        if (daltaX < 0){
            if (moveLeft()) {
                nweBox(context);
                isGameOver();
            }
        } else {
            if (moveRight()) {
                newBox(context);
                isGameOver();
            }
        }
    } else {
        if (daltaY < 0 ) {
            if (moveUp()) {
                newBox(context);
                isGameOver();
            }
        } else {
            if (moveDown()) {
                nweBox(context);
                isGameOver();
            }
        }
    }
});

function moveLeft() {
    if (!canMoveLeft()) {
        return false;
    }
    for (var j = 0 ; j < 4 ; j++) {
        for (var i = 1 ; i < 4 ; i++) {
            if (nums[i][j] != 0) {
                for (var k = 0 ; k < i ; k++){
                    if (nums[k][j] == 0) {
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0;
                    }
                    else if (nums[k][j] == nums[i][j] && noBlockHorizontal(j , k , i , nums)) {
                        nums[k][j] += nums[k][j];
                        nums[i][j] = 0;
                        score = score + nums[k][j];
                        updateScore(score);
                    }
                }
            }
        }
    }
    updateBoardView(context);
    return true;
}

function canMoveLeft() {
    for (var j = 0 ; j < 4 ; j++){
        for (var i = 1 ; i < 4 ; i++) {
            if (nums[i][j] != 0) {
                if (nums[i - 1][j] == 0 || nums[i - 1][j] == nums[i][j]) {
                    return true
                }
            }
        }
    }
    return false;
}

function moveUp() {
    if (!canMoveUp()) {
        return false;
    }
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {
            if (nums[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (nums[i][k] == 0) {
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0;
                    } else if (nums[i][k] == nums[i][j] && noBlockVertical(i, k, j, nums)) {
                        nums[i][k] += nums[i][j];
                        nums[i][j] = 0;
                        score += nums[i][k];
                        updateScore(score);
                    }
                }
            }
        }
    updateBoardView(context);
    return true;
}

function canMoveUp() {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (nums[i][j] != 0) {
                if (nums[i][j - 1] == 0 || nums[i][j - 1] == nums[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function moveRight() {
    if (!canMoveRight()) {
        return false;
    }

    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--) {
            if (nums[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (nums[k][j] == 0 && noBlockHorizontal(j, i, k, nums)) {
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0;
                    } else if (nums[k][j] == nums[i][j] && noBlockHorizontal(j, i, k, nums)) {
                        nums[k][j] += nums[i][j];
                        nums[i][j] = 0;
                        score += nums[k][j];
                        updateScore(score);
                    }
                }
            }
        }
    updateBoardView(context);
    return true;
}

function canMoveRight() {
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (nums[i][j] != 0) {
                if (nums[i + 1][j] == 0 || nums[i + 1][j] == nums[i][j]) {
                    return true;
                }

            }
        }
    }
    return false;
}

function moveDown() {
    if (!canMoveDown()) {
        return false;
    }
    //moveDown
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--) {
            if (nums[i][j] != 0) {
                for (var k = 3; k > j; k--) {

                    if (nums[i][k] == 0 && noBlockVertical(i, j, k, nums)) {
                        nums[i][k] = nums[i][j]
                        nums[i][j] = 0
                    } else if (nums[i][k] == nums[i][j] && noBlockVertical(i, j, k, nums)) {
                        nums[i][k] += nums[i][j]
                        nums[i][j] = 0
                        score += nums[i][k]
                        updateScore(score)
                    }
                }
            }
        }
    updateBoardView(context)
    return true
}

function canMoveDown() {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (nums[i][j] != 0) {
                if (nums[i][j + 1] == 0 || nums[i][j + 1] == nums[i][j]) {
                    return true;
                }

            }
        }
    }
    return false;
}

/**
 * 判断同一列某两个格子中间有没有其他格子
 * @param  {[int]} col  [格子1与格子2共同的列]
 * @param  {[int]} row1 [格子1的行]
 * @param  {[int]} row2 [格子2的行]
 * @param  {[int[][]]} nums [棋盘数组（所有格子）]
 * @return {[bool]}      [有空格就返回true，否则返回false]
 */
function noBlockVertical(col, row1, row2, nums) {
    for (var i = row1 + 1; i < row2; i++) {
        if (nums[col][i] != 0) {
            return false
        }
    }
    return true
}

/**
 * 判断同一行某两个格子中间有没有其他格子
 * @param  {[int]} row  [格子1与格子2共同的行]
 * @param  {[int]} col1 [格子1的列]
 * @param  {[int]} col2 [格子2的列]
 * @param  {[int[][]]} nums [棋盘数组（所有格子）]
 * @return {[bool]}      [有空格就返回true，否则返回false]
 */
function noBlockHorizontal(row, col1, col2, nums) {
    for (var i = col1 + 1; i < col2; i++) {
        if (nums[i][row] != 0) {
            return false
        }
    }
    return true
}

/**
 * 在HTML页面中更新分数score
 * @param  {[type]} score [最新的分数]
 * @return {[type]}       []
 */
function updateScore(score) {
    document.getElementById("score").innerText = score
}

/**
 * 判断有没有空的格子
 * @return {[bool]} [有空的格子就返回false，否则返回true]
 */
function noSpace() {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (nums[i][j] == 0)
                return false;

    return true;
}

/**
 * 判断能否继续移动
 * @return {[bool]} [可以继续移动返回true，否则返回false]
 */
function noMove() {
    if (canMoveLeft() ||
        canMoveRight() ||
        canMoveUp() ||
        canMoveDown())
        return false

    return true
}

/**
 * 判读游戏结束：条件是既没有空的格子，也没法移动
 * @return {bool} [游戏结束返回true，否则返回false]
 */
function isGameOver() {
    if (noMove() && noSpace()) {
        alert("GameOver.Score:" + score);
        return true
    }
    return false
}