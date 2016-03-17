/**
 * Created by Administrator on 16-3-16.
 */
var Window_Width = 1024;
var Window_Height = 768;
var radius = 8;
var margintop = 60;
var marginleft = 30;
//const endTime = new Date(2016, 2, 18, 18, 47, 52);
var showTimeSeconds = 0;
var balls = [];
//var endTime =new Date();
//endTime.setTime(endTime.getTime() +3600*1000);
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]
//绘制canvas
window.onload = function () {
    var canvas = document.getElementById("canvas");

    var context = canvas.getContext("2d");
    Window_Width = document.body.clientWidth;
    Window_Height = document.body.clientHeight;

    marginleft = Math.round(Window_Width /10);
    radius = Math.round(Window_Width * 4 / 5 / 108)-1;

    margintop = Math.round(Window_Height /5);
    canvas.width = Window_Width;
    canvas.height = Window_Height;
    //context.beginPath();//////多个路径绘制
    //context.moveTo(100,100);////笔尖放在100，100的位置上『状态设置
    //context.lineTo(700,700);/////画一条直线到700，700的位置上』
    //context.lineTo(100,700);
    //context.lineTo(100,100);
    //context.closePath();//////绘制路径结束
    //context.strokeStyle ="red";
    //context.lineWidth=5;
    //context.stroke();////绘制到画布上『绘制设置』、
    //context.beginPath();
    //context.moveTo(200,100);
    //context.lineTo(700,600);
    //context.strokeStyle ="pink";///////context.fillStyle绘制图形填充的颜色
    //context.stroke();/////context.fill();绘制填充颜色的图形

    showTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(
        function () {
            render(context);
            update();
        }, 50
    );

}
//时间显示
function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    //var ret = endTime.getTime() - curTime.getTime();//////一小时倒计时
    //ret = Math.round(ret / 1000);
    var ret = curTime.getHours() *3600 +curTime.getMinutes()*60+curTime.getSeconds();
    //return ret >= 0 ? ret : 0;
    return ret;/////时钟效果
}
//更新时间
function update() {

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();
    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;
    var curHours = parseInt(showTimeSeconds / 3600);
    var curMinutes = parseInt((showTimeSeconds - curHours * 3600) / 60);
    var curSeconds = showTimeSeconds % 60;
    if (nextSeconds != curSeconds) {
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBalls(marginleft + 0, margintop, parseInt(curHours / 10));
        }
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(marginleft + 15*(radius+1), margintop, parseInt(curHours / 10));
        }
        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(marginleft + 39*(radius+1), margintop, parseInt(curMinutes / 10));
        }
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(marginleft + 54*(radius+1), margintop, parseInt(curMinutes % 10));
        }
        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(marginleft + 78*(radius+1), margintop, parseInt(curSeconds / 10));
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(marginleft + 93*(radius+1), margintop, parseInt(curSeconds % 10));
        }

        showTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();
}
//更新小球数量
function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        /////碰撞检测
        if (balls[i].y >= Window_Height - radius) {
            balls[i].y = Window_Height - radius;
            balls[i].vy = - balls[i].vy * 0.75;
        }
    }
    var cnt =0;
    for (var i = 0; i < balls.length; i++) {
        if(balls[i].x +radius > 0 && balls[i].x -radius < Window_Width){
            balls[cnt++] =balls[i];
        }

    }
    while (balls.length >cnt){
        balls.pop();
    }
}
//添加小球
function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (radius + 1) + (radius + 1),
                    y: y + i * 2 * (radius + 1) + (radius + 1),
                    g: 1.5 + Math.random(),////小球加速度
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,/////运动速度
                    vy: -5,////y轴速度,
                    color: colors[Math.floor(Math.random() * colors.length)]


                }
                balls.push(aBall);
            }
        }
    }
}
//绘制出来效果
function render(cxt) {
    cxt.clearRect(0, 0, Window_Width, Window_Height);
    var hours = parseInt(showTimeSeconds / 3600);
    var minutes = parseInt((showTimeSeconds - hours * 3600) / 60);
    var seconds = showTimeSeconds % 60;
    renderGigit(marginleft, margintop, parseInt(hours / 10), cxt);
    renderGigit(marginleft + 15 * (radius + 1), margintop, parseInt(hours % 10), cxt);
    renderGigit(marginleft + 30 * (radius + 1), margintop, 10, cxt);
    renderGigit(marginleft + 39 * (radius + 1), margintop, parseInt(minutes / 10), cxt);
    renderGigit(marginleft + 54 * (radius + 1), margintop, parseInt(minutes % 10), cxt);
    renderGigit(marginleft + 69 * (radius + 1), margintop, 10, cxt);
    renderGigit(marginleft + 78 * (radius + 1), margintop, parseInt(seconds / 10), cxt);
    renderGigit(marginleft + 93 * (radius + 1), margintop, parseInt(seconds % 10), cxt);
    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, radius, 0, 2 * Math.PI, true);
        cxt.closePath();

        cxt.fill();
    }
}
//数字显示
function renderGigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0,102,153)";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (radius + 1) + (radius + 1), y + i * 2 * (radius + 1) + (radius + 1), radius, 0, 2 * Math.PI);
                cxt.closePath();
                cxt.fill();

            }
        }
    }

}