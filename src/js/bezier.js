var utils = {
    norm: function(value, min, max) {
        return (value - min) / (max - min);
    },
    distanceXY: function(x0, y0, x1, y1) {
        var dx = x1 - x0,
            dy = y1 - y0;
        return Math.sqrt(dx * dx + dy * dy);
    },
    circlePointCollision: function(x, y, circle) {
        return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
    },
    quadraticBezier: function(p0, p1, p2, t){
        var pFinal = {};
    },
    quadraticBezier: function(p0, p1, p2, t, pFinal) {
        pFinal = pFinal || {};
        pFinal.x = Math.pow(1 - t, 2) * p0.x + (1 - t) * 2 * t * p1.x + t * t * p2.x;
        pFinal.y = Math.pow(1 - t, 2) * p0.y + (1 - t) * 2 * t * p1.y + t * t * p2.y;

        return pFinal;
    },
    randomRange: function(min, max) {
        return min + Math.random() * (max - min);
    },
    cubicBezier: function(p0, p1, p2, p3, t, pFinal) {
        pFinal = pFinal || {};
        pFinal.x = Math.pow(1 - t, 3) * p0.x + Math.pow(1 - t, 2) * 3 * t * p1.x + (1 - t) * 3 * t * t * p2.x + t * t * t * p3.x;
        pFinal.y = Math.pow(1 - t, 3) * p0.y + Math.pow(1 - t, 2) * 3 * t * p1.y + (1 - t) * 3 * t * t * p2.y + t * t * t * p3.y;

        return pFinal;
    },
}
import anime from 'animejs';
//------------------------------------------------------------------


var box = document.createElement("div"),
    canvas = document.createElement("canvas"),
    close_bottom = document.createElement("div");
    for(var i = 0; i < 3; i++){
        var maru = document.createElement("div");
        maru.className = "maru";
        close_bottom.appendChild(maru);
        maru.style.cssText = "width: 5px;height: 5px;margin: 0 3px;border-radius: 50%;background-color: #e4e4e4;";
    };
box.style.cssText = "position: absolute;height: 470px;width: 350px;border-radius: 5px;background-color: #363a4f;box-shadow: 0 0 5px 1px #464646;"
canvas.style.cssText = "left: 50%;top: 25px;transform: translate(-50%, 0);border-radius: 5px;border: solid 1.5px #acacac;box-shadow: inset 0 0 5px 4.5px #000000;background-color: #1B1D28;"
close_bottom.style.cssText = "width: 50px;height: 20px;left: 50%;bottom: 100%;transform: translate(-50%, 0);box-shadow: 0 0px 5px 0px #464646;position: absolute;display: flex;justify-content: center;align-items: center;opacity: .8;transition: .4s;border-top-right-radius: 5px; border-top-left-radius: 5px;background-color: #363a4f;opacity: 0.3;cursor: pointer;";
close_bottom.addEventListener("mouseover", function(){
    close_bottom.style.opacity = "0.9";
});
close_bottom.addEventListener("mouseout", function(){
    close_bottom.style.opacity = "0.3";
})


canvas.id = "canvas_curve";
close_bottom.className = "close_bt";
document.body.appendChild(box);
box.appendChild(close_bottom);
box.appendChild(canvas);
var can = document.querySelector("#canvas_curve")
var c = can.getContext("2d"),
    width = canvas.width = 300,
    height = canvas.height = 400;
var p0 = {
        x: 0,
        y: 350,
        radius: 10,
    },
    p1 = {
        x: width/2,
        y: 350,
        radius: 10,

    },
    p2 = {
        x: width/2,
        y: 50,
        radius: 10,
    },
    p3 = {
        x: width,
        y: 50,
        radius: 10,
    };
var pFinal = {};
function draw(){
    c.clearRect(0, 0, width, height);
    c.fillStyle = "tomato"
    c.strokeStyle = "white";
    c.beginPath();
    c.moveTo(p0.x, p0.y);
    c.lineTo(p1.x, p1.y);
    c.stroke();

    c.beginPath();
    c.moveTo(p2.x, p2.y);
    c.lineTo(p3.x, p3.y);
    c.stroke();

    c.beginPath();
    c.arc(p1.x, p1.y, 5, 0, Math.PI*2, false);
    c.fill();

    c.beginPath();
    c.arc(p2.x, p2.y, 5, 0, Math.PI*2, false);
    c.fill();

    for(var t=0; t<=1; t+=0.001){
        utils.cubicBezier(p0, p1, p2, p3, t, pFinal);
        c.beginPath();
        c.fillStyle = "white";
        c.fillRect(pFinal.x, pFinal.y, 2, 2);
        c.stroke();
        c.fill();
    }


    for(var i = width / 10; i < width; i += width / 10){
        c.beginPath();
        c.moveTo(i, 0);
        c.lineTo(i, height);
        c.strokeStyle = "rgba(252, 133, 4, 0.6)";
        c.stroke();
    }

    for(var i = 300 / 10; i < height; i += 300 / 10){
        c.beginPath();
        c.moveTo(0, i);
        c.lineTo(height, i);
        c.stroke();
    }
    c.font = '25px Quicksand';
    var p1_x = Math.floor(utils.norm(p1.x, 0, width) *100) / 100,
        p1_y = Math.floor((utils.norm(p1.y, 50, 350) - 1) * -1 * 100) / 100,
        p2_x = Math.floor(utils.norm(p2.x, 0, width) * 100) / 100,
        p2_y = Math.floor((utils.norm(p2.y, 50, 350) - 1) * -1 * 100) / 100;

    c.fillText(" ( " + p1_x + " , " + p1_y + " , " + p2_x + " , " + p2_y + " ) ", 0, height);
}
draw();

var start_p1_x = p1.x,
    start_p1_y = p1.y,
    start_p2_x = p2.x,
    start_p2_y = p2.y;


//------------------Click_event_listen----------------------------------

document.body.addEventListener('mousedown', function(){
    var mouse_x = event.clientX - box.offsetLeft - 25,
        mouse_y = event.clientY - box.offsetTop - 25;
    var start_x = event.clientX,
        start_y = event.clientY,
        box_x = box.offsetLeft,
        box_y = box.offsetTop;
    function boxMove(event){
        box.style.left = (box_x + event.clientX - start_x) + 'px';
        box.style.top = (box_y + event.clientY - start_y) + 'px';
    };

//--------------------Curve_editor-----------------------------------

    if(utils.circlePointCollision(mouse_x, mouse_y, p1)){
        document.body.addEventListener('mousemove', onMouseMove_p1);
        document.body.addEventListener('mouseup', onMouseUp);
    };
    if(utils.circlePointCollision(mouse_x, mouse_y, p2)){
        document.body.addEventListener('mousemove', onMouseMove_p2);
        document.body.addEventListener('mouseup', onMouseUp);
    };

//---------------------------------------------------------------------

//--------------------Box_move-----------------------------------------

    if(start_x < (box_x + 330) && start_x > box_x && start_y > box_y && start_y < (box_y + 20)){
        document.body.addEventListener("mousemove", boxMove);
        document.body.addEventListener("mouseup", function(){
            document.body.removeEventListener("mousemove", boxMove);
        });
    };
});

//----------------------------------------------------------------------

function onMouseMove_p1(event){
    var mouse_x = event.clientX - box.offsetLeft - 25,
        mouse_y = event.clientY - box.offsetTop - 25;
    if( mouse_x < 0 && mouse_y < 0 ){
        p1.x = 0;
        p1.y = 0;
    }else if( mouse_x < 0 && mouse_y > height ){
        p1.x = 0;
        p1.y = height;
    }else if( mouse_x > width && mouse_y > height ){
        p1.x = width;
        p1.y = height;
    }else if( mouse_x > width && mouse_y < 0 ){
        p1.x = width;
        p1.y = 0;
    }else if( mouse_x + p1.radius > width ){
        p1.x = width;
        p1.y = mouse_y;
    }else if( mouse_y + p1.radius > height ){
        p1.y = height;
        p1.x = mouse_x;
    }else if( mouse_y + p1.radius > height ){
        p1.y = height;
        p1.x = mouse_x;
    }else if( mouse_y - p1.radius < 0 ){
        p1.y = 0;
        p1.x = mouse_x;
    }else if( mouse_x - p1.radius < 0 ){
        p1.x = 0;
        p1.y = mouse_y;
    }else{
        p1.x = mouse_x;
        p1.y = mouse_y;
    };

    draw();
}
function onMouseMove_p2(event){
    var mouse_x = event.clientX - box.offsetLeft - 25,
        mouse_y = event.clientY - box.offsetTop - 25;
    var x = utils.norm(p2.x, 0, width);
    var y = utils.norm(p2.y, 0, height);
    if( mouse_x < 0 && mouse_y < 0 ){
        p2.x = 0;
        p2.y = 0;
    }else if( mouse_x < 0 && mouse_y > height ){
        p2.x = 0;
        p2.y = height;
    }else if( mouse_x > width && mouse_y > height ){
        p2.x = width;
        p2.y = height;
    }else if( mouse_x > width && mouse_y < 0 ){
        p2.x = width;
        p2.y = 0;
    }else if( mouse_x + p2.radius > width ){
        p2.x = width;
        p2.y = mouse_y;
    }else if( mouse_y + p2.radius > height ){
        p2.y = height;
        p2.x = mouse_x;
    }else if( mouse_y + p2.radius > height ){
        p2.y = height;
        p2.x = mouse_x;
    }else if( mouse_y - p2.radius < 0 ){
        p2.y = 0;
        p2.x = mouse_x;
    }else if( mouse_x - p2.radius < 0 ){
        p2.x = 0;
        p2.y = mouse_y;
    }else{
        p2.x = mouse_x;
        p2.y = mouse_y;
    };
    draw();
}
function onMouseUp(event){
    document.body.removeEventListener('mousemove', onMouseMove_p1);
    document.body.removeEventListener('mousemove', onMouseMove_p2);
    document.body.removeEventListener('mouseup', onMouseUp);
}

//-------------------隱藏按鈕----------------------------------------------

$('.close_bt').click(function(){
    if(canvas.style.display != "none"){
        canvas.style.display = "none";
        box.style.height = "20px"
        box.style.width = "200px"
    } else {
        canvas.style.display = "block"
        box.style.height = "470px"
        box.style.width = "350px"
    }
})


//-------------------export----------------------------------------------

module.exports = function(name){
    box.addEventListener('mouseup', function(){
        if(p1.x != start_p1_x || p1.y != start_p1_y || p2.x != start_p2_x || p2.y != start_p2_y){
            start_p1_x = p1.x,
            start_p1_y = p1.y,
            start_p2_x = p2.x,
            start_p2_y = p2.y;
            console.log([
                Math.floor(utils.norm(p1.x, 0, width) *100) / 100,
                Math.floor((utils.norm(p1.y, 50, 350) - 1) * -1 * 100) / 100,
                Math.floor(utils.norm(p2.x, 0, width) * 100) / 100,
                Math.floor((utils.norm(p2.y, 50, 350) - 1) * -1 * 100) / 100,
            ])
            return name = anime({
                targets: '.mask',
                left: ['0', '500'],
              easing: [
                  Math.floor(utils.norm(p1.x, 0, width) *100) / 100,
                  Math.floor((utils.norm(p1.y, 50, 350) - 1) * -1 * 100) / 100,
                  Math.floor(utils.norm(p2.x, 0, width) * 100) / 100,
                  Math.floor((utils.norm(p2.y, 50, 350) - 1) * -1 * 100) / 100,
              ]
            })

        } else {

        }
    })

}
