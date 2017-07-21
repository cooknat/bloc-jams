var animatePoints = function() {

     var points = document.getElementsByClassName('point');

     var revealPoint = function(elem){

       points[elem].style.opacity = 1;
       points[elem].style.transform = "scaleX(1) translateY(0)";
       points[elem].style.msTransform = "scaleX(1) translateY(0)";
       points[elem].style.WebkitTransform = "scaleX(1) translateY(0)";

     }

     for(var i=0; i<points.length; i++){
       revealPoint(i);
     }

 };
