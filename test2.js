//var instagram_array = new Array(2);
//instagram_array[0] = new Image();
//instagram_array[0].src = 'http://lorempixel.com/output/cats-q-c-350-350-8.jpg';

//instagram_array[1] = new Image();
//instagram_array[1].src = 'http://lorempixel.com/output/animals-q-c-350-350-8.jpg';

var instagram_array = [];
var defualt_array = [];

var defPic = 'http://lorempixel.com/output/animals-q-c-350-350-8.jpg';
defualt_array[0] = defPic;


var pic0 = 'http://lorempixel.com/output/cats-q-c-350-350-7.jpg';
instagram_array[0] = pic0;
//document.getElementById("new").innerHTML = '<img src="'+ instagram_array[0] +'"/>';
var pic1 = 'http://lorempixel.com/output/cats-q-c-350-350-10.jpg';
instagram_array[1] = pic1;
var pic2 = 'http://lorempixel.com/output/cats-q-c-350-350-8.jpg';
instagram_array[2] = pic2;
var pic3 = 'http://lorempixel.com/output/cats-q-c-350-350-6.jpg';
instagram_array[3] = pic3;
var pic4 = 'http://lorempixel.com/output/cats-q-c-350-350-5.jpg';
instagram_array[4] = pic4;
var pic5 = 'http://lorempixel.com/output/cats-q-c-350-350-4.jpg';
instagram_array[5] = pic5;
var pic6 = 'http://lorempixel.com/output/cats-q-c-350-350-3.jpg';
instagram_array[6] = pic6;
var pic7 = 'http://lorempixel.com/output/cats-q-c-350-350-2.jpg';
instagram_array[7] = pic7;
//console.log(instagram_array);

var instLen = instagram_array.length;

var randomInstPic = function () {
  var pic = instagram_array[Math.floor(Math.random() * instLen)];
  //console.log(pic);
  return pic;
};

function updateImages(id, parent) {
  var newInstImage = randomInstPic();
  console.log("###############");
  console.log(newInstImage);
  console.log(id);
  console.log("###############");
  var changeDiv = document.getElementById(id);
  changeDiv.innerHTML = "";
  changeDiv.innerHTML = '<img src="'+ newInstImage +'" id="'+ id +'"/>';
  document.getElementById(parent).appendChild(changeDiv);
  
}

//createDiv(6, "new", "parentDiv");

function createDiv(num, id, parent) {
  if(instagram_array.length <= num) {
  console.log("less");
    for(var i = 0; i < num; i++) {
      if(i < instagram_array.length) {
        var div = document.createElement('div');
        div.className = id;
        div.innerHTML = '<img src="'+ instagram_array[i] +'" id="'+ id + i +'"/>';
        document.getElementById(parent).appendChild(div);
      } else {
        var div = document.createElement('div');
        div.className = id;
        div.innerHTML = '<img src="'+ defualt_array[0] +'" id="'+ id + i +'"/>';
        document.getElementById(parent).appendChild(div);
      }
      
    }
  } else {
    console.log("more");
    for(var i = 0; i < num; i++) {
      var newInstImage = randomInstPic();
      var div = document.createElement('div');
      div.className = id;
      //div.innerHTML = '<img src="'+ newInstImage +'"/>';//To randomize the starting images
      div.innerHTML = '<img src="'+ instagram_array[i] +'" id="'+ id + i +'"/>';
      document.getElementById(parent).appendChild(div);
    }
   
   // setInterval(function(){ 
     // var randomNum = Math.round((Math.random() * num));
    //  updateImages(id + randomNum, "parentDiv");
      
    //}, 5000);
  }
}
createDiv(6, "new", "parentDiv");
    
setInterval(function(){ 
  var randomNum = Math.round((Math.random() * 5));
  updateImages("new" + randomNum, "parentDiv");
}, 2000);


