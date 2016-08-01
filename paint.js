var canvas;
var canvasColor;
var ctx;
var ctxColor;
var bMouseDown = false;
var dataSymetrie;
var active = false;
var c;
var ctx;
var test;
var data;
var canvasY;
var canvasX;
var rayon;
var count1;
var mirroir;
var combined;
var mirroirH;

$(function(){
  c = document.getElementById("panel");
  ctx = c.getContext("2d");

  $('.outils').click(function (){
    data = $(this).data('outils');
    active = data;
  });

  $('#clear').click(function (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  var dataRemplie;
  $('.remplie').click(function (){
    dataRemplie = $(this).data('remplie');
  });

  $("#champ1").after('<output></output>');
  $("#champ1").on('change', function(){
    var valof = $(this).val();
    $('output').text(valof);
  });

  var button = document.getElementById('btn-download');

  button.addEventListener('click', function (e) {
    var test = $('.calque').get();
    var imgPanel = $('#panel').get(0);
    combined = document.getElementById('save');
    ctx = combined.getContext("2d");

    ctx.drawImage(imgPanel, 0, 0);
    for (var i = 0; i < test.length; i++) {
      ctx.drawImage(test[i], 0, 0);
    }
    button.href = document.getElementById("save").src = combined.toDataURL();
  });

  var URL = window.webkitURL || window.URL;
  window.onload = function() {

    var input = document.getElementById('input');
    test = input.addEventListener('change', handleFiles, false);

  };

  function handleFiles(e) {
    var ctx = document.getElementById('calque1').getContext('2d');
    var url = URL.createObjectURL(e.target.files[0]);
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    };
    img.src = url;

  }

    // drawing active image
    // var image = new image();
    // image.onload = function () {
    //     ctx.drawimage(image, 0, 0, image.width, image.height); // draw the image on the canvas
    // }
    // image.src = images[iactiveimage];

    // creating canvas objects
    canvas = document.getElementById('panel');
    ctx = canvas.getContext('2d');

    canvasColor = document.getElementById('color');
    ctxColor = canvasColor.getContext('2d');
    var countCalque = 0;

    $('#calque').click(function (e){
     e.preventDefault();

     if (countCalque === 0) {
       $("#nvcalque").append('<button id="calque'+countCalque+'"class="calque1 btn" data-calque="panel">Calque '+countCalque+'</button><br/>');
     }

     countCalque++;

     $("#canvas").append('<canvas id="calque'+countCalque+'"class="calque" width="800" height="400"></canvas>');
     $("#nvcalque").append('<div id="deleteT'+countCalque+'"></div>');
     $("#deleteT"+countCalque).append('<button id="calqueC'+countCalque+'"class="calque1 btn" data-calque="calque'+countCalque+'">Calque '+countCalque+'</button>');
     $("#deleteT"+countCalque).append('<button id="calqueT'+countCalque+'"class="toggle btn" data-calque="calque'+countCalque+'">Caché</button>');
     $("#deleteT"+countCalque).append('<button id="calqueD'+countCalque+'"class="delete btn" data-calque="calque'+countCalque+'" data-delete="deleteT'+countCalque+'">Supprimer</button><br/>');
     $('#calque'+countCalque).css('z-index', '-20');
     $('#calque'+countCalque+"S").css('z-index', '-20');


   });
$(document).on('click', '.calque1', function(){

  data = $(this).data('calque');
  c = document.getElementById(data);
  ctx = c.getContext("2d");
});

$(document).on('click', '.toggle', function(){
  data = $(this).data('calque');
  $('#'+data).toggle();

});
$(document).on('click', '.delete', function(){
  data = $(this).data('delete');
  $('#'+data).remove();

});

drawGradients(ctxColor);
var pixelColor;
    $('#color').mousemove(function(e) { // mouse move handler
     var canvasOffset = $(canvasColor).offset();
     var canvasX = Math.floor(e.pageX - canvasOffset.left);
     var canvasY = Math.floor(e.pageY - canvasOffset.top);

     var imageData = ctxColor.getImageData(canvasX, canvasY, 1, 1);
     var pixel = imageData.data;

     pixelColor = "rgba("+pixel[0]+", "+pixel[1]+", "+pixel[2]+", "+pixel[3]+")";
     $('#preview').css('backgroundColor', pixelColor);


     $('#color').click(function(event) {
       $('#pick').css('backgroundColor', pixelColor);

     });
   });

    $('#submit').click(function(e) {
     e.preventDefault();
      // var canvasOffset = $(canvasColor).offset();
      // var canvasX = Math.floor(e.pageX - canvasOffset.left);
      // var canvasY = Math.floor(e.pageY - canvasOffset.top);

      // var imageData = ctxColor.getImageData(canvasX, canvasY, 1, 1);
      // var pixel = imageData.data;
      // var rgb = $('#rgbVal').val(pixel[0]+','+pixel[1]+','+pixel[2]);
      var rgb = $('#rgbVal').val();
      // console.log(rgb)

      pixelColor = "rgb("+rgb+")";

      $('#pick').css('backgroundColor', "rgb("+rgb+")");

      // selColorR = pixel[0];
      // selColorG = pixel[1];
      // selColorB = pixel[2];
    });

    $('#submithsl').click(function(e) {
     e.preventDefault();
      // var canvasOffset = $(canvasColor).offset();
      // var canvasX = Math.floor(e.pageX - canvasOffset.left);
      // var canvasY = Math.floor(e.pageY - canvasOffset.top);

      // var imageData = ctxColor.getImageData(canvasX, canvasY, 1, 1);
      // var pixel = imageData.data;
      // var rgb = $('#rgbVal').val(pixel[0]+','+pixel[1]+','+pixel[2]);
      var hsl = $('#hslVal').val();
      // console.log(rgb)

      pixelColor = "hsl("+hsl+")";

      $('#pick').css('backgroundColor', "hsl("+hsl+")");

      // selColorR = pixel[0];
      // selColorG = pixel[1];
      // selColorB = pixel[2];
    });


    var countCircle = 0;
    var count2 = 0;
    $('#circle').click(function (e){
     if (count2 === 0)
       circle();
   });
    function circle() {
     $('#panel').click(function (e){
       countCircle++;

       var canvasOffset = $(canvas).offset();
       var X = Math.floor(e.pageX - canvasOffset.left);
       var Y = Math.floor(e.pageY - canvasOffset.top);

       if (countCircle %2 !== 0) {
         canvasX = X;
         canvasY = Y;
         count2 = 1;

       } else {

         if (data !== 'circle')
           return false;
          // var canvasOffset = $(canvas).offset();


          var canvasX2 = Math.floor(e.pageX - canvasOffset.left);
          var canvasY2 = Math.floor(e.pageY - canvasOffset.top);


          if ($('.symetrie').is(':checked') || $('.symetrie1').is(':checked')) {
           mirroire(data, canvasX2, canvasY2, canvasX, canvasY);

         } else {
           var c = document.getElementById("panel");
           var ctx = c.getContext("2d");
           rayon = ((canvasY - canvasY2) * (canvasY - canvasY2)) + ((canvasX - canvasX2) * (canvasX - canvasX2));
           rayon = Math.sqrt(rayon);

           ctx.lineWidth = $('#champ1').val();
           ctx.beginPath();
           ctx.arc(canvasX,canvasY,rayon,0,2*Math.PI);
           if (dataRemplie == "remplie") {
             ctx.fillStyle = pixelColor;
             ctx.fill();
           }
           else {
             ctx.fillStyle = pixelColor;
           }
           ctx.globalCompositeOperation = "source-over";
           ctx.closePath();
           ctx.stroke();
           rayon = null;
           count2 = 1;


         }
       }
     });

}

    $('#panel').mousedown(function(e) { // mouse down handler
     bMouseDown = true;

    $('#panel').mouseup(function(e) { // mouse up handler
     bMouseDown = false;
   });

    var canvasOffset = $(this).offset();
    var canvasX = e.pageX - canvasOffset.left;
    var canvasY = e.pageY - canvasOffset.top;
    // var c = document.getElementById("panel");
    // var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(canvasX, canvasY);
    
    $('#panel').mousemove(function(e) { // mouse move handler
     var canvasX2 = e.pageX - canvasOffset.left;
     var canvasY2 = e.pageY - canvasOffset.top;
       console.log('crayon')
     if (bMouseDown && $('.symetrie2').is(':checked')) {
       ctx.lineCap = 'round';
       ctx.lineWidth = $('#champ1').val();
       ctx.lineTo(canvasX2, canvasY2);
       ctx.strokeStyle = pixelColor;
       ctx.stroke();
       socket.emit('crayon', 'Salut serveur, ça va ?');
     }  else if (bMouseDown && $('.symetrie').is(':checked')) {

       mirroire(dataSymetrie, canvasX2 ,canvasY2, canvasX, canvasY);

     } else if (bMouseDown && $('.symetrie1').is(':checked')) {
       mirroire(dataSymetrie, canvasX2 ,canvasY2, canvasX, canvasY);

     }
   });
  });

var count3 = 0;
function gomme() {

    $('#panel').mousemove(function(e) { // mouse move handler
     if (data !== 'gomme')
      return false;
    var canvasOffset = $(this).offset();
    var canvasX = e.pageX - canvasOffset.left;
    var canvasY = e.pageY - canvasOffset.top;
    // var c = document.getElementById("panel");
    // var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(canvasX, canvasY);
    count3 = 1;
    if (bMouseDown) {
     if (data !== 'gomme')
       return false;
     var canvasX2 = e.pageX - canvasOffset.left;
     var canvasY2 = e.pageY - canvasOffset.top;

     ctx.lineCap = 'round';
     ctx.lineWidth = $('#champ1').val();
     ctx.lineTo(canvasX2, canvasY2);
     ctx.strokeStyle = "rgba(0,0,0,1.0)";
     ctx.globalCompositeOperation = "destination-out";
     ctx.stroke();
     count3 = 1;
   }
 });
    $('#panel').click(function () {
     if (data !== 'gomme')
       return false;

   });

  }

  $('#gomme').click(function (){
    if (count3 === 0)
      gomme();

    $('#panel').mousedown(function(e) { // mouse down handler
     bMouseDown = true;
     if (data !== 'gomme')
       return false;

    $('#panel').mouseup(function(e) { // mouse up handler
     bMouseDown = false;
     if (data !== 'gomme')
       return false;
   });
  });
  });


  var countLine = 0;
  $('#line').click(function () {
    if (count1 === 0)
      line();
  });
  count1 = 0;
  function line() {

    $('#panel').click(function (e) {
      countLine++;
      var canvasOffset = $(this).offset();
      var X = Math.floor(e.pageX - canvasOffset.left);
      var Y = Math.floor(e.pageY - canvasOffset.top);

      if (countLine %2 !== 0) {
        canvasX = X;
        canvasY = Y;
        count1 = 1;

      } else {

        if (data !== 'line')
          return false;
        canvasOffset = $(this).offset();
        var canvasX2 = Math.floor(e.pageX - canvasOffset.left);
        var canvasY2 = Math.floor(e.pageY - canvasOffset.top);
        if ($('.symetrie').is(':checked') || $('.symetrie1').is(':checked') ) {
          mirroire(data, canvasX2, canvasY2,  canvasX, canvasY);

        } else {
          ctx.beginPath();
          ctx.lineCap = 'round';
          ctx.lineWidth = $('#champ1').val();
          ctx.lineTo(canvasX, canvasY);
          ctx.lineTo(canvasX2, canvasY2);
          ctx.globalCompositeOperation = "source-over";
          ctx.closePath();
          ctx.stroke();
          countLine = 0;
          count1 = 1;
        }

      }

    });

}

$('#carre').click(function () {
  carre();
});
function carre() {

  $('#panel').click(function (e) {
    if (data !== 'carre')
      return false;
    countLine++;
    var canvasOffset = $(this).offset();
    var X = Math.floor(e.pageX - canvasOffset.left);
    var Y = Math.floor(e.pageY - canvasOffset.top);

    if (countLine %2 !== 0) {
      canvasX = X;
      canvasY = Y;

    } else {
      canvasOffset = $(this).offset();
      var canvasX2 = Math.floor(e.pageX - canvasOffset.left);
      var canvasY2 = Math.floor(e.pageY - canvasOffset.top);
      if ($('.symetrie').is(':checked') || $('.symetrie1').is(':checked')) {
        mirroire(data, canvasX2, canvasY2, canvasX, canvasY);

      } else {
        var c = document.getElementById("panel");
        var ctx = c.getContext("2d");
        ctx.beginPath();  
        ctx.lineWidth = $('#champ1').val();
        ctx.rect(canvasX2,canvasY2,canvasX-canvasX2,canvasY-canvasY2);
        if (dataRemplie == "remplie") {
          ctx.fillStyle = pixelColor;
          ctx.fill();
        }
        else {
          ctx.fillStyle = pixelColor;
        }
        ctx.globalCompositeOperation = "source-over";
        ctx.stroke();
      }

    }

  });

}
$('#symetrie').click(function (){
  dataSymetrie = $('.symetrie').data('symetrie');
  active = 'acitve';
  mirroire(dataSymetrie);

});

function mirroire(data, X2, Y2, X, Y) {
  var width = $('#panel').width();
  var total = width/2;
  mirroir = (total-X2)*2;
  mirroirx = (total-X)*2;


  var height = $('#panel').height();
  var totalh = height/2;
  mirroiry = (totalh-Y)*2;
  mirroirH = (totalh-Y2)*2;

  dataSymetrie = $('.symetrie').data('symetrie');

  if (data == "carre") {

    ctx.beginPath();
    ctx.rect(X2,Y2,X-X2,Y-Y2);
    ctx.strokeStyle = pixelColor;
    ctx.lineWidth = $('#champ1').val();
    if ($('.symetrie1').is(':checked'))
      ctx.rect(X,mirroiry+Y2,X2-X,Y-Y2);
    else
      ctx.rect(mirroir+X2,Y2,X2-X,Y-Y2);
    if (dataRemplie == "remplie") {
      ctx.fillStyle = pixelColor;
      ctx.fill();
    }
    else {
      ctx.fillStyle = pixelColor;
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.stroke();
  } else if (data == 'line') {

    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineWidth = $('#champ1').val();
    ctx.lineTo(X, Y);
    ctx.lineTo(X2, Y2);
    ctx.globalCompositeOperation = "source-over";
    ctx.stroke();

    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineWidth = $('#champ1').val();
    if ($('.symetrie1').is(':checked')) {
      ctx.lineTo(X2, mirroirH+Y2);
      ctx.lineTo(X, mirroiry+Y);

    } else {
      ctx.lineTo(mirroir+X2, Y2);
      ctx.lineTo(mirroirx+X, Y);
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.stroke();

  } else if (data == 'circle') {

    rayon = ((Y - Y2) * (Y - Y2)) + ((X - X2) * (X - X2));
    rayon = Math.sqrt(rayon);

    ctx.lineWidth = $('#champ1').val();
    ctx.beginPath();
    ctx.arc(X,Y,rayon,0,2*Math.PI);
    if (dataRemplie == "remplie") {
      ctx.fillStyle = pixelColor;
      ctx.fill();
    }
    else {
      ctx.fillStyle = pixelColor;
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = $('#champ1').val();
    ctx.beginPath();
    if ($('.symetrie1').is(':checked'))
      ctx.arc(canvasX,mirroirH+canvasY,rayon,0,2*Math.PI);
    else
      ctx.arc(mirroirx+X,Y,rayon,0,2*Math.PI);

    if (dataRemplie == "remplie") {
      ctx.fillStyle = pixelColor;
      ctx.fill();
    }
    else {
      ctx.fillStyle = pixelColor;
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.closePath();
    ctx.stroke();



  } else {
    ctx.beginPath();
    ctx.moveTo(X2,Y2);
    ctx.lineTo(X2+0,Y2+0);
    if ($('.symetrie1').is(':checked')) {
      ctx.moveTo(X2,mirroirH+Y2);
      ctx.lineTo(X2+0,mirroirH+Y2+0);
    } else {
      ctx.moveTo(mirroir+X2,Y2);
      ctx.lineTo(mirroir+X2+0,Y2+0);
      
    }
    ctx.fill();
    ctx.lineWidth = $('#champ1').val();
    ctx.strokeStyle = pixelColor;
    ctx.lineCap = 'round';
    ctx.globalCompositeOperation = "source-over";
    ctx.stroke();
  }


}

function drawGradients() {
  var grad = ctxColor.createLinearGradient(20, 0, canvasColor.width - 20, 0);
  grad.addColorStop(0, 'red');
  grad.addColorStop(1 / 6, 'orange');
  grad.addColorStop(2 / 6, 'yellow');
  grad.addColorStop(3 / 6, 'green');
  grad.addColorStop(4 / 6, 'aqua');
  grad.addColorStop(5 / 6, 'blue');
  grad.addColorStop(1, 'purple');
  ctxColor.fillStyle=grad;
  ctx.lineWidth = 100;

  ctxColor.fillRect(0, 0, canvasColor.width, canvasColor.height);
}
});