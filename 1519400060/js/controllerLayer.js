/**
 * 开始按钮绑定的开始游戏函数
 * @param  {[type]} cxt [画笔]
 * @return {[type]}     []
 */
function startGame(cxt) {
    // 初始化游戏界面UI
    init(cxt);
        // 初始化分数
    score = 0;
        // 刷新分数
    updateScore(score);

    // 新建两个初始方块
    for(var i=0;i<degree-2;i++){
        newBox(cxt);
    }
}

/**
 * 新建一个2或4的方块
 * @param  {[type]} cxt []
 * @return {[bool]}     [没有空格时返回false，否则返回true]
 */
function newBox(cxt) {
    // 如果没有空格，直接返回false，即无法创建新方块
    if (noSpace()) {
        return false;
    }

    // 随机生成一个位置（x:0-3,y:0-3）
    var randx = parseInt(Math.floor(Math.random() * degree));
    var randy = parseInt(Math.floor(Math.random() * degree));

    // 寻找空白随机位置的优化算法
    // 随机寻找50次
    // 如果50次都没有找到的话就采用遍历寻找
    // 在遍历寻找到的第一个空位新建方块
    var times = 0;
    var times0;
    times0=(degree-2)*50;
    while (times < times0) {
        if (nums[randx][randy] == 0) {
            break;
        }

        randx = parseInt(Math.floor(Math.random() * degree));
        randy = parseInt(Math.floor(Math.random() * degree));
        times++;
    }

    if (times == times0) {
        var temp;
        for (var i = 0; i < degree; i++) {
            for (var j = 0; j < degree; j++) {
                if (nums[i][j] == 0) {
                    randx = i;
                    randy = j;
                    temp=Math.random();
                    if(temp<Math.sqrt(0.5))
                        break;
                }
            }
            temp=Math.random();
            if(temp<Math.sqrt(0.5))
                break;
        }
    }

    // 方块的数值随机2或4
    var randNumber;
    randNumber=Math.random();
    for(var i=0;i<degree-2;i++){
        if(luckymodel==true){
            if(randNumber-0.1<0){
                randNumber=1;
                break;
            }
        }
        if(randNumber>=i/(degree-2)&&randNumber<(i+1)/(degree-2)){
            randNumber=Math.pow(2,i+1);
            break;
        }
    }

    // randx,randy 位置的方框赋上刚才的随机初始值
    nums[randx][randy] = randNumber;

    // 绘制方块
    drawBox(cxt, randx, randy, randNumber);
    return true;
}

/**
 * 方向键或触屏滑动入口函数
 * @return {[type]} []
 */
function moveKeyDown() {
    event.preventDefault();
    switch (event.keyCode) {
        // 37是方向左键
        case 37: //left
            if (moveLeft()) { //为空或者相等
                // 若可以向左移动，则创建新方块
                if(degree==3)
                    newBox(context);
                for(var i=0;i<degree-3;i++){
                    newBox(context);
                }
                    // 之后判断游戏是否结束
                isGameOver();
            }
            break;

            // 38是方向上键
        case 38: //up
            if (moveUp()) {
                // 若可以向上移动，则创建新方块
                if(degree==3)
                    newBox(context);
                for(var i=0;i<degree-3;i++){
                    newBox(context);
                }
                    // 之后判断游戏是否结束
                isGameOver();
            }
            break;

            // 39是方向右键
        case 39: //right
            if (moveRight()) {
                // 若可以向右移动，则创建新方块
                if(degree==3)
                    newBox(context);
                for(var i=0;i<degree-3;i++){
                    newBox(context);
                }
                    // 之后判断游戏是否结束
                isGameOver();
            }
            break;

            // 40是方向下键
        case 40: //down
            if (moveDown()) {
                // 若可以向下移动，则创建新方块
                if(degree==3)
                    newBox(context);
                for(var i=0;i<degree-3;i++){
                    newBox(context);
                }
                    // 之后判断游戏是否结束
                isGameOver();
            }
            break;
        default:
            break;
    }

}

// 监听“开始触摸”事件，并记录触摸点的起始坐标(startX,startY)
document.addEventListener('touchstart', function(event) {
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});

// 监听“结束触摸”事件，并记录触摸点的终止坐标(endX,endY)
document.addEventListener('touchend', function(event) {
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    // 计算起始坐标和终止坐标的差值（移动的距离）
    var daltaX = endX - startX;
    var daltaY = endY - startY;

    // 如果移动的距离过小，则直接中止函数，不进行方块移动
    // 因为可能只是玩家不小心触摸到屏幕而已
    if (Math.abs(daltaX) < 0.3 * documentWidth && Math.abs(daltaY) < 0.3 * documentWidth)
        return;

    // 如果移动的水平方向距离大于竖直方向距离
    // 则为水平滑动
    if (Math.abs(daltaX) >= Math.abs(daltaY)) {
        // 水平差值数值为负值，则表明向左滑动
        if (daltaX < 0) {
            if (moveLeft()) { //为空或者相等
                if(degree==3)
                    newBox(context);
                for(var i=0;i<degree-3;i++){
                    newBox(context);
                }
                isGameOver();
            }
            // 水平差值数值为正值，则表明向右滑动
        } else {
            if (moveRight()) {
                if(degree==3)
                    newBox(context);
                for(var i=0;i<degree-3;i++){
                    newBox(context);
                }
                isGameOver();
            }
        }
        // 如果移动的水平方向距离下于竖直方向距离
        // 则为竖直滑动
    } else {
        // 竖直差值数值为负值，则表明向上滑动
        if (daltaY < 0) {
            if (moveUp()) {
                if(degree==3)
                    newBox(context);
                for(var i=0;i<degree-3;i++){
                    newBox(context);
                }
                isGameOver();
            }
            // 竖直差值数值为正值，则表明向下滑动
        } else {
            if (moveDown()) {
                if(degree==3)
                    newBox(context);
                for(var i=0;i<degree-3;i++){
                    newBox(context);
                }
                isGameOver();
            }
        }
    }
});

function NoNumBjAk(i,j,k,t) {
    var a;
    switch(t){
        case 1://左
            for(a=j+1;a<k;a++){
                if(nums[a][i]!=0){
                    return false;
                }
            }
            return true;
        case 2://上
            for(a=i+1;a<k;a++){
                if(nums[j][a]!=0){
                    return false;
                }
            }
            return true;
        default:
            break;
    }
}

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
        return false;
    }

    //记录当前格局
    numsrecord();

    //逐行进行
    for (var i = 0; i < degree; i++) {
        //有内容格子数初始化
        var t=0;
        //该行有内容的格子数
        for (var j = 0; j < degree; j++) {
            if(nums[j][i]!=0){
                //操作数自增；
                t++;
            }
            //如果该格子为幸运星
            if(nums[j][i]==1){
                //就近寻找移动方向的有内容格子
                for(var k=j-1;k>-1;k--){
                    if(nums[k][i]!=0){
                        //如该格子同为幸运星，则跳过；
                        if(nums[k][i]==1){}
                        //否则，幸运星变为该格子内容，分数加该格子数值
                        else{
                            nums[j][i]=nums[k][i];
                            score+=nums[k][i];
                            break;
                        }
                    }
                    //如果遍历到尽头都没有有内容格子，则幸运星消失！
                    else if(k==0)
                        nums[j][i]=nums[k][i];
                }
            }
        }
        //该行有内容格子数为0时
        if(t==0){}
        //该行有内容格子数不为0时
        else {
            //根据有内容格子数操作的列数
            for(j=0;j<t;j++){
                //该列无内容时
                if(nums[j][i]==0){
                    //将最近列的内容剪切过来
                    for(k=j+1;k<degree;k++){
                        if(nums[k][i]!=0){
                            nums[j][i]=nums[k][i];
                            nums[k][i]=0;
                            //将该列与后续可合并列合并
                            for(k=j+1;k<degree;k++){
                                if(nums[j][i]==nums[k][i]&&(k-j==1||NoNumBjAk(i,j,k,1)==true)){
                                    nums[j][i]+=nums[j][i];
                                    nums[k][i]=0;
                                    score = score + nums[j][i];
                                    updateScore(score);
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
                //该列有内容时
                else{
                    //将该列与后续可合并列合并
                    for(k=j+1;k<degree;k++){
                        if(nums[j][i]==nums[k][i]&&(k-j==1||NoNumBjAk(i,j,k,1)==true)){
                            nums[j][i]+=nums[j][i];
                            nums[k][i]=0;
                            score = score + nums[j][i];
                            updateScore(score);
                            break;
                        }
                    }
                }
            }
        }
    }

    // 更新UI
    drawBackGround(context);
    updateBoardView(context);
    return true;
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
    for (var j = 0; j < degree; j++) {
        for (var i = 1; i < degree; i++) {
            // 如果有格子不是零
            if (nums[i][j] != 0) {
                // 看它相邻左边的格子是不是0
                // 或者是不是和它一样的数值
                // 二者满足其一，就可以移动
                if (nums[i - 1][j] == 0 || nums[i - 1][j] == nums[i][j])
                    return true;
                else if(nums[i][j]==1)
                    return true;
            }
        }
    }
    return false;
}

/**
 * 向上移动
 * @return {[bool]} [可以向上移动就返回true，否则返回false]
 */
function moveUp() {
    if (!canMoveUp()) {
        return false
    }

    numsrecord();

    for (var j = 0; j < degree; j++) {
        var t=0;
        for (var i = 0; i < degree; i++) {
            if(nums[j][i]!=0){
                t++;
            }
            if(nums[j][i]==1){
                for(var k=j-1;k>-1;k--){
                    if(nums[j][k]!=0){
                        if(nums[j][k]==1);
                        else {
                            nums[j][i] = nums[j][k];
                            score += nums[j][k];
                            break;
                        }
                    }
                    else if(k==0)
                        nums[j][i]=nums[j][k];
                }
            }
        }
        if(t==0){}
        else {
            for(i=0;i<t;i++){
                if(nums[j][i]==0){
                    for(var k=i+1;k<degree;k++){
                        if(nums[j][k]!=0){
                            nums[j][i]=nums[j][k];
                            nums[j][k]=0;
                            for(k=i+1;k<degree;k++){
                                if(nums[j][i]==nums[j][k]&&(k-i==1||NoNumBjAk(i,j,k,2)==true)){
                                    nums[j][i]+=nums[j][i];
                                    nums[j][k]=0;
                                    score = score + nums[j][i];
                                    updateScore(score);
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
                else{
                    for(k=i+1;k<degree;k++){
                        if(nums[j][i]==nums[j][k]&&(k-i==1||NoNumBjAk(i,j,k,2)==true)){
                            nums[j][i]+=nums[j][i];
                            nums[j][k]=0;
                            score = score + nums[j][i];
                            updateScore(score);
                            break;
                        }
                    }
                }
            }
        }
    }

    drawBackGround(context);
    updateBoardView(context);
    return true;
}

/**
 * 判断能否向上移动
 * @return {[bool]} [可以向上移动就返回true，否则返回false]
 */
function canMoveUp() {
    for (var i = 0; i < degree; i++) {
        for (var j = 1; j < degree; j++) {
            if (nums[i][j] != 0) {
                if (nums[i][j - 1] == 0 || nums[i][j - 1] == nums[i][j])
                    return true;
                else if(nums[i][j]==1)
                    return true;
            }
        }
    }
    return false;
}

/**
 * 向右移动
 * @return {[bool]} [可以向右移动就返回true，否则返回false]
 */
function moveRight() {
    if (!canMoveRight()) {
        return false;
    }

    numsrecord();

    for (var i = degree-1; i > -1; i--) {
        var t=0;
        for (var j = degree-1; j >-1; j--) {
            if(nums[j][i]!=0){
                t++;
            }
            if(nums[j][i]==1){
                for(var k=j+1;k<degree;k++){
                    if(nums[k][i]!=0){
                        if(nums[k][i]==1){}
                        else {
                            nums[j][i] = nums[k][i];
                            score += nums[k][i];
                            break;
                        }
                    }
                    else if(k==degree-1)
                        nums[j][i]=nums[k][i];
                }
            }
        }
        if(t==0){}
        else {
            for(j=degree-1;j>degree-1-t;j--){
                if(nums[j][i]==0){
                    for(var k=j-1;k>-1;k--){
                        if(nums[k][i]!=0){
                            nums[j][i]=nums[k][i];
                            nums[k][i]=0;
                            for(k=j-1;k>-1;k--){
                                if(nums[j][i]==nums[k][i]&&(k-j==-1||NoNumBjAk(i,k,j,1)==true)){
                                    nums[j][i]+=nums[j][i];
                                    nums[k][i]=0;
                                    score = score + nums[j][i];
                                    updateScore(score);
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
                else{
                    for(k=j-1;k>-1;k--){
                        if(nums[j][i]==nums[k][i]&&(k-j==-1||NoNumBjAk(i,k,j,1)==true)){
                            nums[j][i]+=nums[j][i];
                            nums[k][i]=0;
                            score = score + nums[j][i];
                            updateScore(score);
                            break;
                        }
                    }

                }
            }
        }
    }

    drawBackGround(context);
    updateBoardView(context);
    return true;
}

/**
 * 判断能否向右移动
 * @return {[bool]} [可以向右移动就返回true，否则返回false]
 */
function canMoveRight() {
    for (var j = 0; j < degree; j++) {
        // 注意，这里不能写：for(var i = 0; i <= 3; i++){
        // 自己思考一下为什么
        for (var i = degree-2; i >= 0; i--) {
            if (nums[i][j] != 0) {
                if (nums[i + 1][j] == 0 || nums[i + 1][j] == nums[i][j])
                    return true;
                else if(nums[i][j]==1)
                    return true;
            }
        }
    }
    return false;
}


/**
 * 向下移动
 * @return {[bool]} [可以向下移动就返回true，否则返回false]
 */
function moveDown() {
    if (!canMoveDown()) {
        return false;
    }

    numsrecord();

    for (var j = degree-1; j >-1; j--) {
        var t=0;
        for (var i = degree-1; i >-1; i--) {
            if(nums[j][i]!=0){
                t++;
            }
            if(nums[j][i]==1){
                for(k=j+1;k<degree;k++){
                    if(nums[j][k]!=0){
                        if(nums[j][k]==1){}
                        else {
                            nums[j][i] = nums[j][k];
                            score += nums[j][k];
                            break;
                        }
                    }
                    else if(k==degree-1)
                        nums[j][i]=nums[j][k];
                }
            }
        }
        if(t==0){}
        else {
            for(i=degree-1;i>degree-1-t;i--){
                if(nums[j][i]==0){
                    for(var k=i-1;k>-1;k--){
                        if(nums[j][k]!=0){
                            nums[j][i]=nums[j][k];
                            nums[j][k]=0;
                            for(k=i-1;k>-1;k--){
                                if(nums[j][i]==nums[j][k]&&(k-i==1||NoNumBjAk(k,j,i,2)==true)){
                                    nums[j][i]+=nums[j][i];
                                    nums[j][k]=0;
                                    score = score + nums[j][i];
                                    updateScore(score);
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
                else{
                    for(k=i-1;k>-1;k--){
                        if(nums[j][i]==nums[j][k]&&(k-i==1||NoNumBjAk(k,j,i,2)==true)){
                            nums[j][i]+=nums[j][i];
                            nums[j][k]=0;
                            score = score + nums[j][i];
                            updateScore(score);
                            break;
                        }
                    }
                }
            }
        }
    }

    drawBackGround(context);
    updateBoardView(context);
    return true;
}

/**
 * 判断能否向下移动
 * @return {[bool]} [可以向下移动就返回true，否则返回false]
 */
function canMoveDown() {
    for (var i = 0; i < degree; i++) {
        for (var j = degree-2; j >= 0; j--) {
            if (nums[i][j] != 0) {
                if (nums[i][j + 1] == 0 || nums[i][j + 1] == nums[i][j])
                    return true;
                else if(nums[i][j]==1)
                    return true;
            }
        }
    }
    return false;
}

/**
 * 在HTML页面中更新分数score
 * @param  {[type]} score [最新的分数]
 * @return {[type]}       []
 */
function updateScore(score) {
    if (degree == 4 && luckymodel == false) {
        if (score > Erecord) {
            Erecord = score;
            document.getElementById("Erecord").innerText = score;
        }
    }
    else if (degree == 5 && luckymodel == false) {
        if (score > Mrecord) {
            Mrecord = score;
            document.getElementById("Mrecord").innerText = score;
        }
    }
    else if (degree == 6 && luckymodel == false) {
        if (score > Hrecord) {
            Hrecord = score;
            document.getElementById("Hrecord").innerText = score;
        }
    }
    else if (degree == 4 && luckymodel == true) {
        if (score > ELrecord) {
            ELrecord = score;
            document.getElementById("ELrecord").innerText = score;
        }
    }
    else if (degree == 5 && luckymodel == true) {
        if (score > MLrecord) {
            MLrecord = score;
            document.getElementById("MLrecord").innerText = score;
        }
    }
    else if (degree == 6 && luckymodel == true) {
        if (score > HLrecord) {
            HLrecord = score;
            document.getElementById("HLrecord").innerText = score;
        }
    }
    document.getElementById("score").innerText = score;
}

/**
 * 判断有没有空的格子
 * @return {[bool]} [有空的格子就返回false，否则返回true]
 */
function noSpace() {
    for (var i = 0; i < degree; i++)
        for (var j = 0; j < degree; j++)
            if (nums[i][j] == 0)
                return false;
    return true;
}

/**
 * 判断能否继续移动
 * @return {[bool]} [可以继续移动返回true，否则返回false]
 */
function noMove() {
    if (canMoveLeft() || canMoveRight() || canMoveUp() || canMoveDown())
        return false;
    else
        return true;
}

/**
 * 判读游戏结束：条件是既没有空的格子，也没法移动
 * @return {bool} [游戏结束返回true，否则返回false]
 */
function isGameOver() {
    if (noMove()) {
        updateScore(score);
        updateBoardView(context);
        //settimeout修正alert不在最后执行bug。
        setTimeout(
            function () {
                switch(degree){
                    case 4:
                        if(luckymodel==false){
                            if(window.confirm("GameOver\nYour Score:" + score+"\nHighest Score"+Erecord+"\nContinue？")){
                                //alert("确定");
                                window.onload();
                            }else{
                                //alert("取消");
                            }
                        }
                        else{
                            if(window.confirm("GameOver\nYour Score:" + score+"\nHighest Score"+ELrecord+"\nContinue？")){
                                //alert("确定");
                                window.onload();
                            }else{
                                //alert("取消");
                            }
                        }
                        break;
                    case 5:
                        if(luckymodel==false){
                            if(window.confirm("GameOver\nYour Score:" + score+"\nHighest Score"+Mrecord+"\nContinue？")){
                                //alert("确定");
                                window.onload();
                            }else{
                                //alert("取消");
                            }
                        }
                        else{
                            if(window.confirm("GameOver\nYour Score:" + score+"\nHighest Score"+MLrecord+"\nContinue？")){
                                //alert("确定");
                                window.onload();
                            }else{
                                //alert("取消");
                            }
                        }
                        break;
                    case 6:
                        if(luckymodel==false){
                            if(window.confirm("GameOver\nYour Score:" + score+"\nHighest Score"+Hrecord+"\nContinue？")){
                                //alert("确定");
                                window.onload();
                            }else{
                                //alert("取消");
                            }
                        }
                        else{
                            if(window.confirm("GameOver\nYour Score:" + score+"\nHighest Score"+HLrecord+"\nContinue？")){
                                //alert("确定");
                                window.onload();
                            }else{
                                //alert("取消");
                            }
                        }
                        break;
                    default:
                        if(window.confirm("GameOver\nYour Score:" + score+"\nContinue？")){
                            //alert("确定");
                            window.onload();
                        }else{
                            //alert("取消");
                        }
                        break;
                }
            },100)
    }
}

function numsrecord() {
    for(i=0;i<degree;i++){
        for(j=0;j<degree;j++){
            for(var k=0;k<9;k++){
                rnums[i][j][k]=rnums[i][j][k+1];
            }
        }
    }
    for(i=0;i<9;i++){
        rscore[i]=rscore[i+1];
    }
    for(var i=0;i<degree;i++){
        for(var j=0;j<degree;j++){
            rnums[i][j][9]=nums[i][j];
        }
    }
    rscore[9]=score;
}
