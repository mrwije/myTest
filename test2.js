//var instagram_array = new Array(2);
//instagram_array[0] = new Image();
//instagram_array[0].src = 'http://lorempixel.com/output/cats-q-c-350-350-8.jpg';

//instagram_array[1] = new Image();
//instagram_array[1].src = 'http://lorempixel.com/output/animals-q-c-350-350-8.jpg';

var instagram_array = [];
var defualt_array = [];

var defPic = 'http://lorempixel.com/output/animals-q-c-350-350-8.jpg';
defualt_array[0] = defPic;

var pic = 'http://lorempixel.com/output/cats-q-c-350-350-7.jpg';
instagram_array[0] = pic;
//document.getElementById("new").innerHTML = '<img src="'+ instagram_array[0] +'"/>';
var pic2 = 'http://lorempixel.com/output/cats-q-c-350-350-10.jpg';
instagram_array[1] = pic2;
var pic3 = 'http://lorempixel.com/output/cats-q-c-350-350-8.jpg';
instagram_array[2] = pic3;
//console.log(instagram_array);

//createDiv(6, "new", "parentDiv");

function createDiv(num, id, parent) {
  if(instagram_array.length < num) {
  console.log("there");
    for(var i = 0; i < num; i++) {
    	if(i < instagram_array.length) {
        var div = document.createElement('div');
        div.className = id;
        div.innerHTML = '<img src="'+ instagram_array[i] +'"/>';
        document.getElementById(parent).appendChild(div);
      } else {
        var div = document.createElement('div');
        div.className = id;
        div.innerHTML = '<img src="'+ defualt_array[0] +'"/>';
        document.getElementById(parent).appendChild(div);
      }
      
		}
	}
}
createDiv(6, "new", "parentDiv");