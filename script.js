var canvas = document.getElementById("spinning-wheel");
var ctx = canvas.getContext("2d");

var sliceCount = 20; // number of slices on the wheel
var sliceSize = 2 * Math.PI / sliceCount;
var spinTimeout = null;
var spinArcStart = 10;
var spinTimeTotal = 0;
var spinTimeElapsed = 0;
var spinAngleStart = 0;

var characters = [
  "Ana Spelunky",
  "Au",
  "Classic Guy",
  "Coco von Diamonds",
  "Colin Northward",
  "Dan Gheesling [MOD]",
  "Demi von Diamonds",
  "Dirk Yamaoka",
  "Guy Spelunky",
  "LISE Project",
  "Little Jay",
  "Liz Mutton",
  "Manfred Tunnel",
  "Margaret Tunnel",
  "Nekka the Eagle",
  "Pilot",
  "Princess Aaryn",
  "Roffy D. Sloth",
  "Tina Flan",
  "Valerie Crump"
];

// Replace these with the actual image URLs for each character
var characterImages = [
  "https://i.imgur.com/g7sgzbP.png",
  "https://i.imgur.com/SLP4ilb.png",
  "https://i.imgur.com/oaoutGm.png",
  "https://i.imgur.com/RsifiDf.png",
  "https://i.imgur.com/dIVtsuM.png",
  "https://i.imgur.com/jjmWCpP.png",
  "https://i.imgur.com/wrGEfVG.png",
  "https://i.imgur.com/zalgLTz.png",
  "https://i.imgur.com/7rY77Yq.png",
  "https://i.imgur.com/QmZ2cyr.png",
  "https://i.imgur.com/r1iIhMj.png",
  "https://i.imgur.com/I4OEznC.pngg",
  "https://i.imgur.com/Kbel5cu.png",
  "https://i.imgur.com/elcPsYs.png",
  "https://i.imgur.com/ZNvX6H1.png",
  "https://i.imgur.com/cJIKVML.png",
  "https://i.imgur.com/yGeLNuQ.png",
  "https://i.imgur.com/0AEbICi.png",
  "https://i.imgur.com/vuMTujq.png",
  "https://i.imgur.com/6NXDhU0.png"
];

function createWheel() {
  // Set the size of the canvas
  canvas.width = canvas.height = 500;

  // Draw the slices of the wheel
  for (var i = 0; i < sliceCount; i++) {
    drawSlice(i, sliceCount, sliceSize, ctx, canvas.width, canvas.height, characterImages[i]);
  }
}

function drawSlice(sliceNumber, sliceCount, sliceSize, ctx, canvasWidth, canvasHeight, imageURL) {
  var angle = sliceNumber * sliceSize;

  // Set the color and fill of the slice
  ctx.fillStyle = "#" + ((1 << 24) * Math.random() | 0).toString(16); // generate random color
  ctx.beginPath();
  ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
  ctx.arc(canvasWidth / 2, canvasHeight / 2, canvasWidth / 2, angle * Math.PI / 180, (angle + sliceSize) * Math.PI / 180);
  ctx.lineTo(canvasWidth / 2, canvasHeight / 2);
ctx.closePath();
ctx.fill();

// Draw the image on the slice
var image = new Image();
image.src = imageURL;
image.onload = function() {
var size = Math.min(canvasWidth, canvasHeight) / sliceCount;
var x = canvasWidth / 2 + Math.cos(angle + sliceSize / 2) * canvasWidth / 4;
var y = canvasHeight / 2 + Math.sin(angle + sliceSize / 2) * canvasHeight / 4;
ctx.drawImage(image, x - size / 2, y - size / 2, size, size);
}
}

createWheel(); // call the createWheel function to draw the wheel and its slices.
