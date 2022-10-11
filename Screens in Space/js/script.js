/**
Juxtapositions of Nostalgia

by
Anthony Bourgeois
Alexander MacKinnon
*/

"use strict";

/* ------- Variables ------- */

let timeCounter = "0";

let videos = [
  "assets/videos/001.mp4",
  "assets/videos/002.mp4",
  "assets/videos/003.mp4",
  "assets/videos/004.mp4",
  "assets/videos/005.mp4"
]

/* ------- Setup function ------- */

function setup() {
  createCanvas(displayWidth, displayHeight);
  background("#000");
}

/* ------- Draw function ------- */

function draw() {

}

/* ------- The logic ------- */

/*
  function1
    pick one video from videos array
    randomize time from 2 to 6 seconds
    after 2 to 6 seconds, switch video
      if (timeCounter = 4) {
        switch video
    }

  function2
    pick another video from videos array
    put it on top of first video
    apply this blending mode
    randomize time from 2 to 6 seconds

  function 3
    pick another video from videos array
    put it on top of second video
    apply this blending mode
    randomize time from 2 to 6 seconds

  function4
    shape animations!
*/
