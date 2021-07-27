img = "";
status = "";
objects = [];
function setup() {
    createCanvas(630, 420);
    // canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function preload() {
    img = loadImage("dog_cat.jpg");
}
function draw() {
    image(img, 0, 0, 640, 420);
    if (status != "") {
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected"; 
            fill(255, 0, 0); 
            percent = floor(objects[i].confidence * 100); 
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function modelLoaded() {
    console.log("Model loaded")
    status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(results, error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
