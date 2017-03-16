//Just a quickly implemented bounce effect to add character, connote intention for modals

$(document).ready(function () {     
    var bouncetime = 1000;
    var ballheight = 90;
    var ballsize = 80;
    var bouncetime2 = 1000;
    var ballheight2 = 90;
    var ballsize2 = 80;
 
    $('#ball').css({'width':ballsize, 'height':ballsize, 'margin-left':-(ballsize/2),'display':'block', 'bottom':ballheight});
    $('#shadow').css({'width':ballsize*1.5, 'height':ballsize/3, 'margin-left':-(ballsize*0.75),'display':'block', 'opacity':0.2});
    $('#ball2').css({'width':ballsize2, 'height':ballsize2, 'margin-left':-(ballsize2/2),'display':'block', 'bottom':ballheight2});
    $('#shadow2').css({'width':ballsize2*1.5, 'height':ballsize2/3, 'margin-left':-(ballsize2*0.75),'display':'block', 'opacity':0.2});
    
    ballbounce();
    ballshadow();
    ballbounce2();
    ballshadow2();
 
    function ballbounce() {
        $('#ball').animate({'bottom':20}, bouncetime, 'easeInQuad', function() {
            $('#ball').animate({'bottom':ballheight}, bouncetime, 'easeOutQuad', function() {
                ballbounce();
            });
        });
    }
    function ballshadow() {
        $('#shadow').animate({'width':ballsize, 'height':ballsize/4, 'margin-left':-(ballsize/2), 'opacity':1}, bouncetime, 'easeInQuad', function() {
            $('#shadow').animate({'width':ballsize*1.5, 'height':ballsize/3, 'margin-left':-(ballsize*0.75), 'opacity':0.2}, bouncetime, 'easeOutQuad', function() {
                ballshadow();
            });
        });
    }
    function ballbounce2() {
        $('#ball2').animate({'bottom':20}, bouncetime2, 'easeInQuad', function() {
            $('#ball2').animate({'bottom':ballheight2}, bouncetime2, 'easeOutQuad', function() {
                ballbounce2();
            });
        });
    }
    function ballshadow2() {
        $('#shadow2').animate({'width':ballsize2, 'height':ballsize2/4, 'margin-left':-(ballsize2/2), 'opacity':1}, bouncetime2, 'easeInQuad', function() {
            $('#shadow2').animate({'width':ballsize2*1.5, 'height':ballsize2/3, 'margin-left':-(ballsize2*0.75), 'opacity':0.2}, bouncetime2, 'easeOutQuad', function() {
                ballshadow2();
            });
        });
    }
});