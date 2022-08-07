var noseX = 0;
var noseY = 0;
var appleX = 0;
var appleY = 0;
var score = 0;

function preload() {

}
function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    cam = createCapture(VIDEO);
    cam.hide();
    cam.size(500, 500);
    poseNet = ml5.poseNet(cam, modelLoaded);
    poseNet.on("pose", gotPoses);
    loop();
}
function modelLoaded() {
    console.log("model loaded");
}
function draw() {
    image(cam, 0, 0, 500, 500);
    let d = int(dist(appleX, appleY, noseX, noseY));
    let d1 = int(dist(0, 499, appleX, appleY));
    ellipse(noseX, noseY + 6, 20);
    fill("red");
    ellipse(appleX, appleY, 10);
    fill("brown");
    if (d < 20) {
        console.log("hit");
        spawner()
        check();
    }
    rect(0, 499, 500, 50);
    if(appleY  > 499)
    {
        spawner();
        console.log("hit");
        score -= 1;
    }


}
function saveImage() {
    save("Image.png");
}
function gotPoses(results) {
    if (results.length > 0) {
        //console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
    }

}
(function loop() {
    setTimeout(function () {
        // execute script
        gravity()
        loop()
    }, 50); //9000 = 9000ms = 9s
}());

function spawner() {
    appleX = Math.random() * 300;
    appleY = Math.random() * 300;
}

function gravity()
{
    appleY = appleY + 0.8;
}
function check(score)
{
    score = score + 1;
}
document.getElementById("score").innerHTML = score; 