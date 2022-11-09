/**
Exercise 01
Alexander MacKinnon
*/

"use strict";

// Click Counter Variable
let clickCounter = 0;

/**
Setup function: runs on page load
*/

function setup() {

  // Create canvas + remove strokes
  createCanvas(displayWidth, displayHeight);
  background("FFF");
  noStroke();
}


/**
Mouse pressed function: runs everytime the mouse is clicked
*/

function mousePressed() {

  // Count the mouse clicks and print it to the console (for tracking purposes)
  clickCounter++;
  print(clickCounter);

  // After 3 clicks, the background becomes blue
  if (clickCounter >= 3) {
    background("#394FDD");
  }
}

/**
Draw function: runs repeatedly and quickly
*/

function draw() {

  // Show a red circle in the center when mouse is clicked
  if (mouseIsPressed) {
    fill("#FC3852");
    ellipse(width/2, height/2, 100, 100);

  // Show a green circle on the left when key is pressed
  } else if (keyIsPressed) {
    fill("#56B875");
    ellipse(100, height/2, 100, 100);

  // Remove all shapes from the screen if nothing is clicked/pressed
  } else {
    if (clickCounter >= 3) {
      fill("#394FDD");
    }
    else {
      fill("#FFF");
    }
    ellipse(width/2, height/2, 100, 100);
    ellipse(100, height/2, 100, 100);
  }

}
