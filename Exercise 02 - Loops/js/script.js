/**
Week 5 Exercice
Alexander MacKinnon
*/

"use strict";

/* ------- Variables ------- */

// Size variable, initially set to 50
let size = 100;

// Color variables, initially set to black for odd squares and white for even squares
let r1 = 0;
let g1 = 0;
let b1 = 0;
let r2 = 255;
let g2 = 255;
let b2 = 255;

/* ------- Setup function ------- */

function setup() {
  // Remove background and stroke
  createCanvas(displayWidth, displayHeight);
  noStroke();
}

/* ------- Draw function ------- */

function draw() {
  // Loop to draw the rows
  for(let i = 0;i < width/size; i++){
    // Loop to draw the columns
    for(let j = 0; j < height/size; j++){
      // Check for evens, fill with first color
      if (i % 2 == 0 && j % 2 == 0 || i % 2 == 1 && j % 2 == 1) {
        fill(r1, g1, b1);
      }
      // Fill the rest (odds) with second color
      else {
        fill(r2, g2, b2);
      }
      // Draw the squares
      square(i*size, j*size, size);
    }
  }
}

/* ------- Mouse pressed function ------- */

function mousePressed() {

  // Change size of the squares on click
  size = random(25, 250);

  // Change colors of the squares on click
  r1 = random(0, 255);
  g1 = random(0, 255);
  b1 = random(0, 255);
  r2 = random(0, 255);
  g2 = random(0, 255);
  b2 = random(0, 255);
}
