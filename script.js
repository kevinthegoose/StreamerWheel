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
  ctx.fillStyle = "#"+((1<<24)*Math.random()|0).toString(16); // generate random color
  ctx.beginPath();
  ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
  ctx.arc(canvasWidth / 2, canvasHeight / 2, canvasWidth / 2, angle * Math.PI / 180, (angle + sliceSize) * Math.PI / 180);
  ctx.lineTo(canvasWidth / 2, canvasHeight / 2);
  ctx.fill();

  // Add the character image to the slice
  var img = new Image();
  img.src = imageURL;
  img.onload = function() {
    ctx.save();
    ctx.translate(canvasWidth / 2, canvasHeight / 2);
    ctx.rotate((angle + sliceSize / 2) * Math.PI / 180);
    ctx.drawImage(img, -canvasWidth / 4, -canvasHeight / 2 + 10, canvasWidth / 2, canvasHeight / 2);
    ctx.restore();
  };
}

function spinWheel() {
  // Set the spin time and spin angle
  spinTimeTotal = Math.floor(Math.random() * 4000 + 5000); // random spin time between 5 and 9 seconds
  spinAngleStart = Math.random() * 360;

  // Call the spin function
  spin();
}

function spin() {
  spinTimeElapsed += 30;

  if (spinTimeElapsed >= spinTimeTotal) {
    stopSpin();
    return;
  }

  var spinAngle = spinAngleStart - easeOut(spinTimeElapsed, 0, spinAngleStart, spinTimeTotal);
  drawSpinner(spinAngle);
  spinTimeout = setTimeout(spin, 30);
}

function drawSpinner(degrees) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width /   2, canvas.height / 2);
  ctx.rotate(degrees * Math.PI / 180);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(20, 0);
  ctx.stroke();
  ctx.restore();
}

function stopSpin() {
  clearTimeout(spinTimeout);
  spinAngleStart = 0;
}

function easeOut(t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

// Add event listener for the spin button
var spinButton = document.getElementById("spin-button");
spinButton.addEventListener("click", function() {
  spinWheel();
});


                
