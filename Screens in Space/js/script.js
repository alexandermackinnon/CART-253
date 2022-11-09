/**
Stranger Spaces

by
Anthony Bourgeois
Alexander MacKinnon
*/

"use strict";

/* ------- Variables ------- */

let music;
let video;
let firstVideo;
let secondVideo;
let frameCounter = 0;

// Videos are added here
let videos = [
  "assets/videos/001.mp4",
  "assets/videos/002.mp4",
  "assets/videos/003.mp4",
  "assets/videos/004.mp4",
  "assets/videos/005.mp4",
  "assets/videos/006.mp4",
  "assets/videos/007.mp4",
  "assets/videos/008.mp4",
  "assets/videos/009.mp4",
  "assets/videos/010.mp4",
  "assets/videos/011.mp4",
  "assets/videos/012.mp4",
  "assets/videos/013.mp4",
  "assets/videos/014.mp4",
  "assets/videos/015.mp4",
  "assets/videos/016.mp4",
  "assets/videos/017.mp4",
  "assets/videos/018.mp4",
  "assets/videos/019.mp4",
  "assets/videos/020.mp4",
  "assets/videos/021.mp4",
  "assets/videos/022.mp4",
  "assets/videos/023.mp4",
  "assets/videos/024.mp4",
  "assets/videos/025.mp4",
  "assets/videos/026.mp4",
  "assets/videos/027.mp4",
  "assets/videos/028.mp4",
  "assets/videos/029.mp4",
  "assets/videos/030.mp4",
  "assets/videos/031.mp4",
  "assets/videos/032.mp4",
  "assets/videos/033.mp4",
  "assets/videos/034.mp4",
  "assets/videos/035.mp4",
  "assets/videos/036.mp4",
  "assets/videos/037.mp4",
  "assets/videos/038.mp4",
  "assets/videos/039.mp4",
  "assets/videos/040.mp4",
  "assets/videos/041.mp4",
  "assets/videos/042.mp4",
  "assets/videos/043.mp4",
  "assets/videos/044.mp4",
  "assets/videos/045.mp4",
  "assets/videos/046.mp4",
  "assets/videos/047.mp4",
  "assets/videos/048.mp4",
  "assets/videos/049.mp4",
  "assets/videos/050.mp4",
  "assets/videos/051.mp4",
  "assets/videos/052.mp4",
  "assets/videos/053.mp4",
  "assets/videos/054.mp4",
  "assets/videos/055.mp4",
  "assets/videos/056.mp4",
  "assets/videos/057.mp4",
  "assets/videos/058.mp4",
  "assets/videos/059.mp4",
  "assets/videos/060.mp4",
  "assets/videos/061.mp4",
  "assets/videos/062.mp4",
  "assets/videos/063.mp4",
  "assets/videos/064.mp4",
  "assets/videos/065.mp4",
  "assets/videos/066.mp4",
  "assets/videos/067.mp4",
  "assets/videos/068.mp4",
  "assets/videos/069.mp4"
];

/* ------- Setup function ------- */

function setup() {

  // Create fullscreen canvas
  createCanvas(displayWidth, displayHeight);

  // Load ambient song
  music = loadSound('assets/sounds/ambient.mp3');

  // Call create video function to display video on screen on setup
  createVid();

  // Global text properties
  textFont("Helvetica");
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
}

/* ------- Create video function ------- */

function createVid() {

  // Generate first video
  video = random(videos); // Randomly pick a video URL from the videos array
  firstVideo = createVideo(video); // Create a video with the given URL
  firstVideo.hide(); // Hide video from the DOM so that it can be drawn by the draw function
  firstVideo.loop(); // Automatically replay the video when it ends
  firstVideo.volume(0); // Mute video sound

  // Generate second video
  video = random(videos); // Pick a video randomly from the videos array
  secondVideo = createVideo(video); // Create a video with the given URL
  secondVideo.hide(); // Hide video from the DOM so that it can be drawn by the draw function
  secondVideo.loop(); // Automatically replay the video when it ends
  secondVideo.volume(0); // Mute video sound

}

/* ------- Draw function ------- */

function draw() {

  // Frame counter
  frameCounter++;
  /* print(frameCounter); */
  if (frameCounter%200 == 0 || frameCounter == 0) {
    createVid();
  }

  // Fill the background black
  background("black");

  // Text shown in between video clips
  fill("white");
  textSize(15);
  text('STRANGER SPACES', width/2, height/2);

  // Draw the first video on the screen
  image(firstVideo, 0, 0, displayWidth, displayHeight); //

  // Draw the second video on the screen
  blendMode(SCREEN); // Create blend effect
  image(secondVideo, 0, 0, displayWidth, displayHeight);

  // Reset blend mode to default
  blendMode(BLEND);

  // Grain animation
  fill("white");
  noStroke();
  for (let i = 0; i < 2000; i++){
    rect(random(width), random(height), 1, 1);
  }

  // Text shown if sound is muted
  if (music.isPlaying()) {
    text('');
  } else {
    fill("white");
    textSize(10);
    text('CLICK TO UNMUTE MUSIC', width/2, 120);
  }

}

/* ------- Mouse pressed function ------- */

function mousePressed() {
  if (music.isPlaying()) {
    // .isPlaying() returns a boolean
    music.stop();
    background(255, 0, 0);
  } else {
    music.loop();
    background(0, 255, 0);
  }
}
