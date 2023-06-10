leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song = "";
song1 = "";
song2 = "";
function preload()
{
    song1 = loadSound("Bb Major Scale.mp4");
    song2 = loadSound("G Harmonic Minor Scale.mp4");
}
function setup()
{
canvas = createCanvas(600,500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}
function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
    song1_playing=song1.isPlaying();
    song2_playing=song2.isPlaying();
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song2_playing==false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "G Harmonic Minor Scale";
        }
    }
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song1_playing==false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Bb Major Scale";
        }
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded() 
{
    console.log('PoseNet Is Initialized');
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist =" + scoreLeftWrist + "scoreRightWrist =" + scoreRightWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX +"rightWristY =" + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX +"leftWristY"+ leftWristY);

        
    }
}