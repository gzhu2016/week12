/**
 * Created by pc on 2016/12/22.
 */
function startGame(cxt) {

    init(cxt, 1);
    init(cxt, 2);
    score1 = 0;
    score2 = 0
    updateScore(score1, 1);
    updateScore(score2, 2);

    newBox(cxt, 1);
    newBox(cxt, 1);
    newBox(cxt, 2);
    newBox(cxt, 2);
}

function newBox(cxt, player) {
    if (noSpace(player)) {
        return false;
        //if this line of code is not necessary, then how to judge whether there is no space or not
    }

    if (player == 1) {
        dis = dis1;
        nums = nums1;
    }
    else {
        dis = dis2;
        nums = nums2;
    }

    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    var times = 0;
    while (times < 50) {
        if (nums[randx][randy] == 0) {
            break;
        }
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
        times++;
    }

    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (nums[i][j] == 0) {
                    randx = i;
                    randy = j;
                }
                //maybe something can be written here to solve the last problem I wonder
            }
        }
    }

    var randNumber = Math.random() < 0.5 ? 2 : 4;
    nums[randx][randy] = randNumber;

    drawBox(cxt, randy, randx, randNumber, dis);
    return true;
}

function moveKeyDown() {   // this part is copy tpp, but I change to double
    event.preventDefault(); //in case the brower will move when you play the game
    switch (event.keyCode) {
        case  37: //left
            if (moveLeft(2)) { //为空或者相等
                // 若可以向左移动，则创建新方块
                newBox(context, 2)
                // 之后判断游戏是否结束
                gameOver(2)
            }
            break

        // 38是方向上键
        case 38: //up
            if (moveUp(2)) {
                // 若可以向上移动，则创建新方块
                newBox(context, 2)
                // 之后判断游戏是否结束
                gameOver(2)
            }
            break

        // 39是方向右键
        case 39: //right
            if (moveRight(2)) {
                // 若可以向右移动，则创建新方块
                newBox(context, 2)
                // 之后判断游戏是否结束
                gameOver(2)
            }
            break

        // 40是方向下键
        case 40: //down
            if (moveDown(2)) {
                // 若可以向下移动，则创建新方块
                newBox(context, 2)
                // 之后判断游戏是否结束
                gameOver(2)
            }
            break

        case  65: // player1 moveleft
            if (moveLeft(1)) {
                newBox(context, 1)
                gameOver(1)
            }
            break

        case 87: // player1 moveup
            if (moveUp(1)) {
                newBox(context, 1)
                gameOver(1)
            }
            break

        case 68: // player1 moveright
            if (moveRight(1)) {
                newBox(context, 1)
                gameOver(1)
            }
            break

        case 83: // player1 movedown
            if (moveDown(1)) {
                newBox(context, 1)
                gameOver(1)
            }
            break


        default:
            break
    }

}

//漏了这部分。。。但貌似是滑屏版的？
//document.addEventListener('touchstart', function (event) {
//    startX = event.touches[0].pageX;
//    startY = event.touches[0].pageY;
//})
//document.addEventListener('touchend', function (event) {
//    endX = event.changedTouches[0].pageX
//    endY = event.changedTouches[0].pageY
//
//    // 计算起始坐标和终止坐标的差值（移动的距离）
//    var daltaX = endX - startX
//    var daltaY = endY - startY
//
//    // 如果移动的距离过小，则直接中止函数，不进行方块移动
//    // 因为可能只是玩家不小心触摸到屏幕而已
//    if (Math.abs(daltaX) < 0.3 * documentWidth && Math.abs(daltaY) < 0.3 * documentWidth)
//        return
//
//    // 如果移动的水平方向距离大于竖直方向距离
//    // 则为水平滑动
//    if (Math.abs(daltaX) >= Math.abs(daltaY)) {
//        // 水平差值数值为负值，则表明向左滑动
//        if (daltaX < 0) {
//            if (moveLeft()) { //为空或者相等
//                newBox(context)
//                isGameOver()
//            }
//            // 水平差值数值为正值，则表明向右滑动
//        } else {
//            if (moveRight()) {
//                newBox(context)
//                isGameOver()
//            }
//        }
//        // 如果移动的水平方向距离下于竖直方向距离
//        // 则为竖直滑动
//    } else {
//        // 竖直差值数值为负值，则表明向上滑动
//        if (daltaY < 0) {
//            if (moveUp()) {
//                newBox(context)
//                isGameOver()
//            }
//            // 竖直差值数值为正值，则表明向下滑动
//        } else {
//            if (moveDown()) {
//                newBox(context)
//                isGameOver()
//            }
//        }
//    }
//})

function canMoveLeft(player) {
    // try to fix I&J
    if (player == 1) {
        nums = nums1;
        score = score1;
    }
    else {
        nums = nums2;
        score = score2;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (nums[i][j] != 0) {
                if (nums[i][j - 1] == 0 || nums[i][j - 1] == nums[i][j]) {
                    console.log(nums);
                    return true;
                }
            }
        }
    }
    return false;
}

function moveLeft(player) {
    if (player == 1) {
        nums = nums1;
        score = score1;
    }
    else {
        nums = nums2;
        score = score2;
    }

    if (!canMoveLeft(player)) {
        return false;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (nums[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (nums[i][k] == 0) {
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0;
                    } else if (nums[i][k] == nums[i][j] && noBlockHorizontal(i, k, j, nums)) {
                        nums[i][k] += nums[i][k];
                        nums[i][j] = 0;
                        score = score + nums[i][k];
                        updateScore(score, player);
                    }
                }
            }
        }
    }
    updateBoardView(context, player);  //we define this in modeLayer.js
    return true;
}

// why, can we directly
function canMoveRight(player) {
    if (player == 1) {
        nums = nums1;
        score = score1;
    }
    else {
        nums = nums2;
        score = score2;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 2; j > -1; j--) {
            if (nums[i][j] != 0) {
                if (nums[i][j + 1] == 0 || nums[i][j] == nums[i][j + 1]) {
                    console.log(nums);
                    return true;
                }
            }
        }
    }
    return false;
}

function moveRight(player) {
    if (player == 1) {
        nums = nums1;
        score = score1;
    }
    else {
        nums = nums2;
        score = score2;
    }

    if (!canMoveRight(player)) {
        return false;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 2; j > -1; j--) {
            if (nums[i][j] != 0) {
                for (var k = 3; k > j; k--) { //我一开始写的是var k = j - 1; k > -1; k--
                    if (nums[i][k] == 0) {
                        nums[i][k] = nums[i][j]; //这些步骤有太多都是重复的，是因为没有类？这个可以说还是面向过程的吗
                        nums[i][j] = 0;
                    } else if (nums[i][k] == nums[i][j] && noBlockHorizontal(i, j, k, nums)) {
                        nums[i][k] += nums[i][k];
                        nums[i][j] = 0;
                        score = score + nums[i][k];
                        updateScore(score, player);
                    }
                }
            }
        }
    }
    updateBoardView(context, player);
    return true;
}

function canMoveUp(player) {
    if (player == 1) {
        nums = nums1;
        score = score1;
    }
    else {
        nums = nums2;
        score = score2;
    }

    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (nums[i][j] != 0) {
                if (nums[i][j] == nums[i - 1][j] || nums[i - 1][j] == 0) {
                    console.log(nums);
                    return true;
                }
            }
        }
    }
    console.log(nums);
    console.log("can not canmoveup");
    return false;
}

function moveUp(player) {
    if (player == 1) {
        nums = nums1;
        score = score1;
    }
    else {
        nums = nums2;
        score = score2;
    }

    if (!canMoveUp(player)) {
        return false;
    }

    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (nums[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (nums[k][j] == 0) {
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0;
                    } else if (nums[k][j] == nums[i][j] && noBlockVertical(j, k, i, nums)) {
                        nums[k][j] += nums[k][j];
                        nums[i][j] = 0;
                        score = score + nums[k][j];
                        updateScore(score, player);
                    }
                }
            }
        }
    }
    updateBoardView(context, player);
    return true;
}

function canMoveDown(player) {
    if (player == 1) {
        nums = nums1;
        score = score1;
    }
    else {
        nums = nums2;
        score = score2;
    }

    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (nums[i][j] != 0) {
                if (nums[i + 1][j] == 0 || nums[i][j] == nums[i + 1][j]) {
                    console.log(nums);
                    return true;
                }
            }
        }
    }
    return false;
}

function moveDown(player) {
    if (player == 1) {
        nums = nums1;
        score = score1;
    }
    else {
        nums = nums2;
        score = score2;
    }

    if (!canMoveDown(player)) {  // when canMoveDown returns false, moveDown will return false
        return false;
    }

    //for (var i = 2; i > -1; i--) {
    //    for (var j = 0; j < 4; j++) {  //这个顺序不能一直相同？。。
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (nums[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (nums[k][j] == 0) {
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0;
                    } else if (nums[k][j] == nums[i][j] && noBlockVertical(j, i, k, nums)) { //好像有点get到为什么这里一定要有noBlock的判断，因为不是之间肯定没空格，因为有的合并不了，所以就会跳过
                        nums[k][j] += nums[k][j];
                        nums[i][j] = 0;
                        score += nums[k][j];
                        updateScore(score, player);
                    }
                }
            }
        }
    }
    updateBoardView(context, player);
    return true;
}


function noBlockHorizontal(row, col1, col2, nums) { //column -->列 对应的是 j
    for (var j = col1 + 1; j < col2; j++) {
        if (nums[row][j] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockVertical(col, row1, row2, nums) { //row-->行 对应的是 i
    for (var i = row1 + 1; i < row2; i++) {
        if (nums[i][col] != 0) {
            return false;
        }
    }
    return true;
}


function updateScore(score, player) {
    if (player == 1) {
        score1 = score;
        document.getElementById("score1").innerText = score;
    }//what is the "innerText" for? and why no we need to GEBYID
    else {
        score2 = score;
        document.getElementById("score2").innerText = score;
    }
}

function noSpace(player) {
    if (player == 1) {
        nums = nums1;
    }
    else {
        nums = nums2;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (nums[i][j] == 0)
                return false;
        }
    }
    return true;
}
// I think as long as the function noMove() reture true, game over
//however, I found that there was a bug, because noSpace() influence whether to newBox

function noMove(player) {
    if (canMoveLeft(player) ||
        canMoveRight(player) ||
        canMoveUp(player) ||
        canMoveDown(player))
        return false;
    return true;
}

function gameOver(player) {
    if (player == 1) {
        nums = nums1;
        score = score1;
    }
    else {
        nums = nums2;
        score = score2;
    }

    if (noMove(player) && noSpace(player)) {
        alert("GameOver.Score: " + score);
        console.log("game over");
        console.log(nums);
        win++;
        winner(win);
        return true;
    }
    return false
}

function winner(winner) {
    if (winner == 2) {
        var who = score1 > score2 ? 1 : 2;
        alert("The winner is player" + who);
    }
}