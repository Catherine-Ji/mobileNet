let mobilenet;
var dropzone;
function modelReady(){
	console.log("Model is ready!");
}

function setup() {
	createCanvas(windowWidth, 50);
	mobilenet = ml5.imageClassifier('MobileNet', modelReady);
	dropzone = select('#dropzone');
	dropzone.dragOver(highlight);
	dropzone.dragLeave(unhighlight);
	dropzone.drop(receivedFile, unhighlight);
	// const img = createImg("https://www.signwayonline.net/wp-content/uploads/2020/06/Emojis_SmileySquintFace.jpg");
	// img.size(100,100);
}

function receivedFile(file){
	clear();
	deleteImg();
	img = createImg(file.data, file.name);
	img.size(50, 50);
	img.center();
	mobilenet.classify(img, gotResults);
}

function deleteImg(){
	var images = document.getElementsByTagName('img');
	var l = images.length;
	for (var i = 0; i < l; i++) {
	    images[0].parentNode.removeChild(images[0]);
	}
}

function gotResults(error, results){
	if(error){
		console.error(error);
	}else{
		var speciesName = results[0].label;
		fill(0);
		textSize(20);
		textAlign(CENTER, CENTER);
		text("This is a(n) " + speciesName, windowWidth/2,30);
	}
}

function highlight(){
	dropzone.style('background-color', "#ccc");
}

function unhighlight(){
	dropzone.style('background-color', '#fff');
}
