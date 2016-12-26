/**
 * 开始按钮绑定的开始游戏函数
 * @param  {[type]} cxt [画笔]
 * @return {[type]}     []
 */
function startGame(cxt) {
    // 初始化游戏界面UI
    init(cxt)
        // 初始化分数
    score = 0
        // 刷新分数
    updateScore(score)
    // 初始化步数
    step = 0
    // 刷新步数
    updateStep(step)

    zhuan=2   //朝代的转换
    lei=0     //初始累加

    // 新建两个初始方块
    newBox(cxt)
    newBox(cxt)
}

/**
 * 新建一个2或4的方块
 * @param  {[type]} cxt []
 * @return {[bool]}     [没有空格时返回false，否则返回true]
 */
function newBox(cxt) {
    // 如果没有空格，直接返回false，即无法创建新方块
    if (noSpace()) {
        return false
    }

    // 随机生成一个位置（x:0-3,y:0-3）
    var randx = parseInt(Math.floor(Math.random() * 4))
    var randy = parseInt(Math.floor(Math.random() * 4))

    // 寻找空白随机位置的优化算法
    // 随机寻找50次
    // 如果50次都没有找到的话就采用遍历寻找
    // 在遍历寻找到的第一个空位新建方块
    var times = 0
    while (times < 50) {
        if (nums[randx][randy] == 0) {
            break
        }

        randx = parseInt(Math.floor(Math.random() * 4))
        randy = parseInt(Math.floor(Math.random() * 4))
        times++
    }

    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (nums[i][j] == 0) {
                    randx = i
                    randy = j
                }
            }
        }
    }

    // 方块的数值随机2或4
    var randNumber = Math.random() < 0.9 ? 2 : 4;
    if(zhuan<randNumber){                      //zhuan《4则zhuan*2，lei+1
        zhuan=zhuan*2
        Zhuan()
        console.log(zhuan)
    }

    // randx,randy 位置的方框赋上刚才的随机初始值
    nums[randx][randy] = randNumber;

    // 绘制方块
    drawBox(cxt, randx, randy, randNumber);
    return true
}

/**
 * 方向键或触屏滑动入口函数
 * @return {[type]} []
 */
function moveKeyDown() {
    event.preventDefault()
    switch (event.keyCode) {
        // 37是方向左键
        case 37: //left
            if (moveLeft()) { //为空或者相等
                // 若可以向左移动，则创建新方块
                newBox(context)
                    // 之后判断游戏是否结束
                isGameOver()
                step++                    //触发了则步数+1
                updateStep(step)
            }
            break

            // 38是方向上键
        case 38: //up
            if (moveUp()) {
                // 若可以向上移动，则创建新方块                
                newBox(context)
                    // 之后判断游戏是否结束
                isGameOver()
                step++                         //触发了则步数+1
                updateStep(step)
            }
            break

            // 39是方向右键
        case 39: //right
            if (moveRight()) {
                // 若可以向右移动，则创建新方块
                newBox(context)
                    // 之后判断游戏是否结束
                isGameOver()
                step++                     //触发了则步数+1
                updateStep(step)
            }
            break

            // 40是方向下键
        case 40: //down
            if (moveDown()) {
                // 若可以向下移动，则创建新方块
                newBox(context)
                    // 之后判断游戏是否结束
                isGameOver()
                step++                       //触发了则步数+1
                updateStep(step)
            }
            break
        default:
            break
    }

}

// 监听“开始触摸”事件，并记录触摸点的起始坐标(startX,startY)
document.addEventListener('touchstart', function(event) {
    startX = event.touches[0].pageX
    startY = event.touches[0].pageY
})

// 监听“结束触摸”事件，并记录触摸点的终止坐标(endX,endY)
document.addEventListener('touchend', function(event) {
    endX = event.changedTouches[0].pageX
    endY = event.changedTouches[0].pageY

    // 计算起始坐标和终止坐标的差值（移动的距离）
    var daltaX = endX - startX
    var daltaY = endY - startY

    // 如果移动的距离过小，则直接中止函数，不进行方块移动
    // 因为可能只是玩家不小心触摸到屏幕而已
    if (Math.abs(daltaX) < 0.3 * documentWidth && Math.abs(daltaY) < 0.3 * documentWidth)
        return

    // 如果移动的水平方向距离大于竖直方向距离
    // 则为水平滑动
    if (Math.abs(daltaX) >= Math.abs(daltaY)) {
        // 水平差值数值为负值，则表明向左滑动
        if (daltaX < 0) {
            if (moveLeft()) { //为空或者相等
                newBox(context)
                isGameOver()
            }
            // 水平差值数值为正值，则表明向右滑动
        } else {
            if (moveRight()) {
                newBox(context)
                isGameOver()
            }
        }
        // 如果移动的水平方向距离下于竖直方向距离
        // 则为竖直滑动
    } else {
        // 竖直差值数值为负值，则表明向上滑动
        if (daltaY < 0) {
            if (moveUp()) {
                newBox(context)
                isGameOver()
            }
            // 竖直差值数值为正值，则表明向下滑动
        } else {
            if (moveDown()) {
                newBox(context)
                isGameOver()
            }
        }
    }
})

/**
 * 向左移动
 * （其他三个方向是一样的，注释我就不详细写了）
 * （所以请仔细研读这个向左移动的函数）
 * @return {[bool]} [可以向左移动就返回true，否则返回false]
 */
function moveLeft() {
    // 首先判断能不能向左移动
    // 如果不能就返回 false
    if (!canMoveLeft()) {
        return false
    }

    // 从竖直方向第二行开始向左遍历所有位置
    // 因为左边第一行肯定没法向左移动
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            // 如果有位置不是空的
            if (nums[i][j] != 0) {
                // 再次遍历这个位置的左边的所有位置
                for (var k = 0; k < i; k++) {
                    // 如果它左边的格子是0，就直接移动到那个是0的位置
                    // 自己原本的位置再变成0
                    if (nums[k][j] == 0) {
                        nums[k][j] = nums[i][j]
                        nums[i][j] = 0
                    }
                    // 如果它左边的格子和自己一样
                    // 并且这两个格子中间（同一行）没有其他格子
                    // 就合并这两个格子于左边的位置，原本的位置变成0
                    // 并且记分，分值就是原本数值的2倍，再刷新分数
                    else if (nums[k][j] == nums[i][j] && noBlockHorizontal(j, k, i, nums)) {
                        nums[k][j] += nums[k][j]
                        nums[i][j] = 0
                        score = score + nums[k][j]
                        updateScore(score)
                        console.log(nums[k][j])
                        if(zhuan<nums[k][j]){                        //zhuan《nums则转*2，lei+1
                            zhuan=zhuan*2
                            Zhuan()
                            console.log(zhuan)
                        }

                    }
                }
            }
        }
    }
    // 更新UI
    updateBoardView(context)
    return true
}

/**
 * 判断能否向左移动
 * （其他三个方向是一样的，注释我就不详细写了）
 * （所以请仔细研读这个向左移动的函数）
 * @return {[bool]} [可以向左移动就返回true，否则返回false]
 */
function canMoveLeft() {
    // 从竖直方向第二行开始向左遍历所有位置
    // 因为左边第一行肯定没法向左移动
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            // 如果有格子不是零
            if (nums[i][j] != 0) {
                // 看它相邻左边的格子是不是0
                // 或者是不是和它一样的数值
                // 二者满足其一，就可以移动
                if (nums[i - 1][j] == 0 || nums[i - 1][j] == nums[i][j]) {
                    return true
                }

            }
        }
    }
    return false
}

/**
 * 向上移动
 * @return {[bool]} [可以向上移动就返回true，否则返回false]
 */
function moveUp() {
    if (!canMoveUp()) {
        return false
    }
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {
            if (nums[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (nums[i][k] == 0) {
                        nums[i][k] = nums[i][j]
                        nums[i][j] = 0
                    } else if (nums[i][k] == nums[i][j] && noBlockVertical(i, k, j, nums)) {
                        nums[i][k] += nums[i][j]
                        nums[i][j] = 0
                        score += nums[i][k]
                        updateScore(score)
                        if(zhuan<nums[i][k]){
                            zhuan=zhuan*2
                            Zhuan()
                            console.log(zhuan)
                        }
                    }
                }
            }
        }
    updateBoardView(context);
    return true;
}

/**
 * 判断能否向上移动
 * @return {[bool]} [可以向上移动就返回true，否则返回false]
 */
function canMoveUp() {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (nums[i][j] != 0) {
                if (nums[i][j - 1] == 0 || nums[i][j - 1] == nums[i][j]) {
                    return true
                }

            }
        }
    }
    return false
}

/**
 * 向右移动
 * @return {[bool]} [可以向右移动就返回true，否则返回false]
 */
function moveRight() {
    if (!canMoveRight()) {
        return false;
    }

    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--) {
            if (nums[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (nums[k][j] == 0 && noBlockHorizontal(j, i, k, nums)) {
                        nums[k][j] = nums[i][j]
                        nums[i][j] = 0
                    } else if (nums[k][j] == nums[i][j] && noBlockHorizontal(j, i, k, nums)) {
                        nums[k][j] += nums[i][j]
                        nums[i][j] = 0
                        score += nums[k][j]
                        updateScore(score)
                        if(zhuan<nums[k][j]){
                            zhuan=zhuan*2
                            Zhuan()
                            console.log(zhuan)
                        }
                    }
                }
            }
        }
    updateBoardView(context);
    return true;
}

/**
 * 判断能否向右移动
 * @return {[bool]} [可以向右移动就返回true，否则返回false]
 */
function canMoveRight() {
    for (var j = 0; j < 4; j++) {
        // 注意，这里不能写：for(var i = 0; i <= 3; i++){
        // 自己思考一下为什么
        for (var i = 2; i >= 0; i--) {
            if (nums[i][j] != 0) {
                if (nums[i + 1][j] == 0 || nums[i + 1][j] == nums[i][j]) {
                    return true
                }

            }
        }
    }
    return false
}


/**
 * 向下移动
 * @return {[bool]} [可以向下移动就返回true，否则返回false]
 */
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
                        if(zhuan<nums[i][k]){
                            zhuan=zhuan*2
                            Zhuan()
                            console.log(zhuan)
                        }
                    }
                }
            }
        }
    updateBoardView(context)
    return true
}

/**
 * 判断能否向下移动
 * @return {[bool]} [可以向下移动就返回true，否则返回false]
 */
function canMoveDown() {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (nums[i][j] != 0) {
                if (nums[i][j + 1] == 0 || nums[i][j + 1] == nums[i][j]) {
                    return true
                }

            }
        }
    }
    return false
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

function updateStep(step){
    document.getElementById("step").innerText = step
}

function updateZi(zi){
    document.getElementById("zi").innerText = zi
}


function Zhuan(){                         //定义zhuan函数 输出标题朝代的变化
    lei++
        console.log(lei)
        switch (lei) {
            case 1:
                zi = "商";
                updateZi(zi);
                break;
            case 2:
                zi = "周";
                updateZi(zi);
                break
            case 3:
                zi = "秦";
                updateZi(zi);
                break
            case 4:
                zi = "汉";
                updateZi(zi);
                break
            case 5:
                zi = "晋";
                updateZi(zi);
                break
            case 6:
                zi = "北";
                updateZi(zi);
                break
            case 7:
                zi = "隋";
                updateZi(zi);
                break
            case 8:
                zi = "唐";
                updateZi(zi);
                break
            case 9:
                zi = "宋";
                updateZi(zi);
                break
            case 10:
                zi = "元";
                updateZi(zi);
                break
            case 11:
                zi = "明";
                updateZi(zi);
                break
            case 12:
                zi = "清";
                updateZi(zi);
                break
            default:
                break
        }
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
        alert("GameOver.你创造的GDP:" + score+"万");
        return true
    }
    return false
}