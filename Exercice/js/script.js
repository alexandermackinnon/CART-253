/**
Exercice 3
by Alexander MacKinnon
*/

"use strict";

/* ------- Variables ------- */

let targetSize = 200;
let targetCircles = 6;

/* ------- Setup Function ------- */

function setup() {
	createCanvas(displayWidth, displayHeight);
	background("black");
}

/* ------- Create Target Function ------- */

function createTarget() {

  // Generate first color
  let firstColor = {
    r: random(255),
    b: random(255),
    g: random(255),
  };

  // Generate second color
  let secondColor = {
    r: random(255),
    b: random(255),
    g: random(255),
  };

  // Loop to draw the circle
	for (var i = 0; i < targetCircles; i++) {
		if (i % 2 == 0) { // Check if circle is an even, if so draw with the first color
      fill(firstColor.r, firstColor.b, firstColor.g);
    }
		else { // Draw the other circles (odds) with the second color
      fill(secondColor.r, secondColor.b, secondColor.g);
    }
		circle(mouseX, mouseY, targetSize - (targetSize / targetCircles) * i);
	}
}

/* ------- Check Mouse Position Function ------- */

function checkMousePosition() {
  // Check if mouse is either in the upper right or lower left
	if ((mouseX < width/2 && mouseY > height/2) || (mouseX > width/2 && mouseY < height/2)) {
		return true;
	} else {
		return false;
	}
}

/* ------- Mouse Clicked Function ------- */

function mouseClicked() {

  // Check if checkMousePosition returned true
	if (checkMousePosition()){
    targetCircles++; // Add a circle
  }
	else {
    targetCircles--; // Remove a circle
  }

  // Prevents target to have less than 2 circles
	if (targetCircles <= 1){
    targetCircles = 2;
  }

  // Call createTarget function to draw a target
	createTarget();
}
