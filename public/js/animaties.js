/* --------------- EXPLODE IN PIECES JEMMA --------------- */

var img = "./img/jemma.png";

$(document).ready(function(){

    var objs = new obj();

    objs.createCanvas();

    $("#explode").click(function(){
        objs.explode();
    });

    $("#reset").click(function(){
        objs.reset();
    });

});


function obj(){

    var $this = this;
    this.img;
    var d = new Date().getTime();

    this.id = 'mapObj_'+d;;
    this.particles = [];
    var particles = [];

    this.createCanvas = function(){

        this.img = new Image();
        this.img.src = img;

        this.img.onload = function(){

            var obj = createParticles($this.img, 100, 100, this.id);

            this.item = obj;
            $this.item = obj;

            var parent = document.getElementById('imgJemma');

            parent.appendChild(obj);
        }

    }

    function createParticles(imgObj,left,top,id){

        var elem = document.createElement("div");
        particles = new Array();
        for(var n = 0; n < 35; n++) {
            for(var i = 0; i < 35; i++) {
                var imgX = n * 5;
                var imgY = i * 5;
                particles.push({
                    x: imgX,
                    y: imgY,
                    imgX: imgX,
                    imgY: imgY,
                    vx: 0,
                    vy: 0,
                    isRolling: false,
                    isLocked: true
                });
            }
        }

        // console.log(particles);
        elem.id = $this.id;
        elem.style.width = 5+"px";
        elem.style.height = 5+"px";
        elem.style.position = "absolute";
        elem.style.left = left+"px";
        elem.style.top  = top+"px";

        var canvas;
        var context;
        for(var n = 0; n < particles.length; n++) {

            var particle = particles[n];

            canvas = document.createElement("canvas");
            canvas.width = 5;
            canvas.height = 5;
            canvas.style.left = particle.x+"px";
            canvas.style.top = particle.y+"px";
            canvas.style.position = 'absolute';
            context = canvas.getContext("2d");


            context.drawImage(imgObj, particle.imgX, particle.imgY, 10, 10, 0, 0, 10, 10);

            elem.appendChild(canvas);

        }

        return elem;

    }

    this.explode = function(id){

        var elem = this.item;

        console.log(this.item);
        console.log( this.item.id);

        var childrenNum = $("#"+this.item.id).children();

        for(var i = 0; i < childrenNum.length; i++) {

            var item = childrenNum.eq(i);
            var randX = getRandom(  300 , -300 );
            var randY = getRandom(  300 , -300 );


            var tmax = TweenMax.to(item, 1.0, {
                left:randX,
                top:randY,
                autoAlpha:0,
                ease:Power0.easeInOut

            });

        }

    }

    this.reset = function(){

        console.log($("#"+this.id).children().length);
        $("#"+this.id).empty().remove();
        $("#container").children("div").remove();


        $this.createCanvas();

    }

};

/* --------------- BALLOON HIDE/SHOW --------------- */

function getRandom(max, min){
    return Math.floor(Math.random() * (1 + max - min) + min);
}

    function picture(){
        var pic = "./img/ballon.png"
        document.getElementById('dieStupidCunt').src = pic.replace('90x90', '225x225');
        document.getElementById('dieStupidCunt').style.display='block';

    }
