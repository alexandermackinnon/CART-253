/**
Rube Goldberg Machine
by Alexander MacKinnon
*/

/*
Inspired by Ren Yuan
c2.js Library Examples (June 2020)
https://c2js.org/examples.html

Screen based Rube Goldberg machine template
CART253, Creative Computation, Fall 2022
Concordia University
l wilkins

The goal of this project is to pass along a variable between programs to create a chain. Every person will get a number from someone else, use this number to create a piece of generative art, then pass along a new number to the next person.


We are using the Eclipse Paho MQTT client library: https://www.eclipse.org/paho/clients/js/ to create an MQTT client that sends and receives messages. The client is set up for use on the shiftr.io test MQTT broker (https://shiftr.io/try)

*/

// Rube Goldberg setup, update with your own info!
let myName = "macki"; // Who are you? Make sure it matches the previous person's variable!
let nextName = "enric"; // Who is next on the list? Make sure it matches the next person's variable!
let dataToSend; // Variable to hold the data to send to the next person on the list

// MQTT client details. We are using a public server called shiftr.io. Don't change this.
let broker = {
  hostname: "public.cloud.shiftr.io",
  port: 443,
};
let client;

let creds = {
  clientID: Math.random().toString(16).slice(3),
  userName: "public",
  password: "public",
};
let topic = "CART253"; // This is the topic we are all subscribed to

// End of MQTT client details

// Array that will hold the background stars
let stars = [];

// Amount of stars to be shown in the background
let amountOfStars = 100;

// Timer variables
let timer = false;
let duration = 30;
let endTime;
let timerInterval;

// Bounce counter, initially set to 0 and will be incremented each bounce. This is the variable we will be passing on when code has been fully ran.
let bounce = 0;

// ConstellationStar Class
class ConstellationStar extends c2.Point {
  constructor() {
    let x = random(width);
    let y = random(height);
    super(x, y);
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
  }

  // Update constellation position with random trajectory
  update() {
    this.x += this.vx;
    this.y += this.vy;

    // If a point hits the left side of the screen, send the other way
    if (this.x < 0) {
      this.x = 0;
      this.vx *= -1;
      bounce++;
      // If a point hits the right side of the screen, send the other way
    } else if (this.x > width) {
      this.x = width;
      this.vx *= -1;
      bounce++;
    }
    // If a point hits the top side of the screen, send the other way
    if (this.y < 0) {
      this.y = 0;
      this.vy *= -1;
      bounce++;
      // If a point hits the bottom side of the screen, send the other way
    } else if (this.y > height) {
      this.y = height;
      this.vy *= -1;
      bounce++;
    }
  }

  // Activate constellation
  activate() {
    // Blur properties
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = color(255, 255, 255);
    // Point properties
    fill(255);
    ellipse(this.x, this.y, random(9, 12), random(9, 12));
  }
}

// Array that will hold the constellation points
let constellationStars = new Array(0);

/* ------- Setup Function ------- */
function setup() {
  // Normal program setup goes here
  createCanvas(windowWidth, windowHeight);

  //Loop through however many stars you want
  for (i = 0; i < amountOfStars; i++) {
    let star = {
      xStars: random(0, width),
      yStars: random(0, height),
    };
    // Add this 'star' to the array from before.
    stars.push(star);
  }

  // Setup the MQTT client
  MQTTsetup();
}

/* ------- Process Data Function ------- */
function processData(amountOfPoints) {
  // Reset bounces to 0
  bounce = 0;

  // Reset constellation
  constellationStars.length = 0;

  // Populate the array with the amount of stars received
  for (let i = 0; i < amountOfPoints; i++) {
    constellationStars.push(amountOfPoints);
  }

  // Create a star for each index of the array
  for (let i = 0; i < constellationStars.length; i++) {
    constellationStars[i] = new ConstellationStar();
  }
}

/* ------- Draw Function ------- */
function draw() {
  // Canvas background, varies depending on the amount of bounces
  background(0, bounce / 2, bounce * 2);

  // Get all stars from the array and display them on screen
  for (i = 0; i < amountOfStars; i++) {
    let xStars = stars[i].xStars;
    let yStars = stars[i].yStars;
    fill(255);
    strokeWeight(0);
    ellipse(xStars, yStars, random(1, 3), random(1, 3)); // Giving a random width and height to the stars give them a jittery effect
  }

  // Shape properties variables
  // Inspired by Ren Yuan - c2.js Example
  let delaunay = new c2.Delaunay();
  delaunay.compute(constellationStars); // compute is a c2.js method that takes
  let vertices = delaunay.vertices;
  let edges = delaunay.edges;
  let triangles = delaunay.triangles;

  // Minimum + maximum area of the constellation
  let maxArea = 0;
  let minArea = Number.POSITIVE_INFINITY;
  for (let i = 0; i < triangles.length; i++) {
    let area = triangles[i].area();
    // Define minimum area
    if (area < minArea) {
      minArea = area;
    }
    // Define maximum area
    if (area > maxArea) {
      maxArea = area;
    }
  }

  // Triangle properties
  stroke(255);
  strokeWeight(1);
  fill(0, 0, 0, 0); // Transparent fill

  // Draw the triangles on screen
  for (let i = 0; i < triangles.length; i++) {
    let t = norm(triangles[i].area(), minArea, maxArea);
    triangle(
      triangles[i].p1.x,
      triangles[i].p1.y,
      triangles[i].p2.x,
      triangles[i].p2.y,
      triangles[i].p3.x,
      triangles[i].p3.y
    );
  }

  // Apply properties and bounce physics to each star
  for (let i = 0; i < constellationStars.length; i++) {
    constellationStars[i].activate();
    constellationStars[i].update();
  }

  // Text
  if (timer == true) {
    let bounceCounterText = bounce + " bounces";
    fill(255);
    text(bounceCounterText, 10, 20);
  } else {
    let bounceCounterText = "Waiting for constellation";
    fill(255);
    text(bounceCounterText, 10, 20);
  }
}

/* ------- Transfer Data Function ------- */
function timerEnd() {
  if (millis() > endTime) {
    timer = false;
    clearInterval(timerInterval);

    // Send the data to the next name
    let dataToSend = int(bounce);
    sendMQTTMessage(dataToSend);
    console.log("Timer has ended; data sent!");

    // Reset constellation
    constellationStars.length = 0;
  }
}

/* ------- Mouse Pressed Function ------- */
function mousePressed() {
  // Sends a message on mouse pressed to test.
  let dataToSend = 40;
  sendMQTTMessage(dataToSend);
}

/* ------- On Message Arrived Function ------- */
// When a message arrives, do this:
function onMessageArrived(message) {
  let dataReceive = split(trim(message.payloadString), "/"); // Split the incoming message into an array deliniated by "/"
  console.log("Message Received:");
  console.log(String(dataReceive[1]));
  console.log(dataReceive[2]);

  // 0 is who its from
  // 1 is who its for
  // 2 is the data

  // If message is for me
  if (dataReceive[1] == myName) {
    // Check if its for me
    console.log("Its for me! :) ");

    // Send data to be processed and visualized
    processData(dataReceive[2]);

    // Start timer
    endTime = millis() + duration * 1000;
    timer = true;
    console.log("Timer has started!");
    timerInterval = setInterval(timerEnd);

    // If message is for NOT me
  } else {
    console.log("Not for me! :( ");
  }
}

/* ------- Sending a Message Function ------- */
function sendMQTTMessage(msg) {
  message = new Paho.MQTT.Message(myName + "/" + nextName + "/" + msg); // add messages together:
  // My name + Next name + data separated by /
  message.destinationName = topic;
  console.log("Message Sent!");
  client.send(message);
}

/* ------- MQTT Callback Functions ------- */
function onConnect() {
  client.subscribe(topic);
  console.log("connected");
  // is working
}
function onConnectionLost(response) {
  if (response.errorCode !== 0) {
    // If it stops working
  }
}
function MQTTsetup() {
  client = new Paho.MQTT.Client(
    broker.hostname,
    Number(broker.port),
    creds.clientID
  );
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  client.connect({
    onSuccess: onConnect,
    userName: creds.userName, // username
    password: creds.password, // password
    useSSL: true,
  });
}
