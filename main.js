song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftwrist=0;

function setup() {
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    //video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose, gotPoses');
}

function gotPoses(results) {
    if (results.length>0) {
        console.log(results);
        scoreLeftwrist=results[0].pose.keyPoints[9].score;
        console.log("scoreLeftWrist= " + scoreLeftwrist);
        leftWristX=results[0].pose.leftWrist.X;
        leftWristY=results[0].pose.leftWrist.Y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX=results[0].pose.rightWrist.X;
        rightWristY=results[0].pose.rightWrist.Y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    if (scoreLeftwrist>0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberLeftWrist=Number(leftWristY);
        remove_decimals=floor(InNumberLeftWrist);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="volume= "+volume;
        song.setVolume(volume);   
    }
}

function preload(){
    song=loadSound('music.mp3');
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("Pose Net foi iniciado");
}