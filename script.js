var canvas = document.getElementById("spinning-wheel");
var ctx = canvas.getContext("2d");

var sliceCount = 20; // number of slices on the wheel
var sliceSize = 2 * Math.PI / sliceCount;
var spinTimeout = null;
var spinArcStart = 10;
var spinTimeTotal = 0;
var spinTimeElapsed = 0;
var spinAngleStart = 0;

var characters = [  "Ana Spelunky",  "Au",  "Classic Guy",  "Coco von Diamonds",  "Colin Northward",  "Dan Gheesling [MOD]",  "Demi von Diamonds",  "Dirk Yamaoka",  "Guy Spelunky",  "LISE Project",  "Little Jay",  "Liz Mutton",  "Manfred Tunnel",  "Margaret Tunnel",  "Nekka the Eagle",  "Pilot",  "Princess Aaryn",  "Roffy D. Sloth",  "Tina Flan",  "Valerie Crump"];

// Replace these with the actual image URLs for each character
var characterImages = [  "https://i.imgur.com/g7sgzbP.png",  "https://i.imgur.com/SLP4ilb.png",  "https://i.imgur.com/oaoutGm.png",  "https://i.imgur.com/RsifiDf.png",  "https://i.imgur.com/dIVtsuM.png",  "https://i.imgur.com/jjmWCpP.png",  "https://i.imgur.com/wrGEfVG.png",  "https://i.imgur.com/zalgLTz.png",  "https://i.imgur.com/7rY77Yq.png",  "https://i.imgur.com/QmZ2cyr.png",  "https://i.imgur.com/r1iIhMj.png",  "https://i.imgur.com/I4OEznC.pngg",  "https://i.imgur.com/Kbel5cu.png",  "https://i.imgur.com/elcPsYs.png",  "https://i.imgur.com/ZNvX6H1.png",  "https://i.imgur.com/cJIKVML.png",  "https://i.imgur.com/yGeLNuQ.png",  "https://i.imgur.com/0AEbICi.png",  "https://i.imgur.com/vuMTujq.png",  "https://i.imgur.com/6NXDhU0.png"];

function createWheel() {
  // Set the size of the canvas
  canvas.width = canvas.height = 500;

  // Set the radius of the wheel
  var radius = Math.min(canvas.width, canvas.height) / 2 * 0.8;

  // Draw the slices of the wheel
  for (var i = 0; i < sliceCount; i++) {
    drawSlice(i, sliceCount, sliceSize, ctx, canvas.width / 2, canvas.height / 2, radius, characterImages[i]);
  }
}

function drawSlice(sliceNumber, sliceCount, sliceSize, ctx, centerX, centerY, radius, imageURL) {
  var angle = sliceNumber * sliceSize;

  // Set the color and fill of the slice
  ctx.fillStyle = "hsl(" + (360 / sliceCount * sliceNumber) + ", 100%, 50%)";

  // Calculate the position of the slice
  var startX = centerX + Math.cos(angle - sliceSize / 2) * radius;
var startY = centerY + Math.sin(angle - sliceSize / 2) * radius;
var endX = centerX + Math.cos(angle + sliceSize / 2) * radius;
var endY = centerY + Math.sin(angle + sliceSize / 2) * radius;

// Draw the slice
ctx.beginPath();
ctx.moveTo(centerX, centerY);
ctx.lineTo(startX, startY);
ctx.arc(centerX, centerY, radius, angle - sliceSize / 2, angle + sliceSize / 2);
ctx.lineTo(centerX, centerY);
ctx.closePath();
ctx.fill();

// Draw the character image on top of the slice
var img = new Image();
img.src = imageURL;
img.onload = function() {
ctx.save();
ctx.translate(centerX, centerY);
ctx.rotate(angle);
ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
ctx.restore();
};
}

function spin() {
spinAngleStart = Math.random() * Math.PI * 2;
spinTimeTotal = Math.random() * 3000 + 5000;
spinTimeElapsed = 0;

rotateWheel();
}

function rotateWheel() {
spinTimeElapsed += 30;
if (spinTimeElapsed >= spinTimeTotal) {
stopRotateWheel();
return;
}

var spinAngle = spinAngleStart - easeOut(spinTimeElapsed, 0, spinAngleStart, spinTimeTotal);
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.save();
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.rotate(spinAngle);
for (var i = 0; i < sliceCount; i++) {
drawSlice(i, sliceCount, sliceSize, ctx, 0, 0, Math.min(canvas.width, canvas.height) / 2 * 0.8, characterImages[i]);
}
ctx.restore();

spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
clearTimeout(spinTimeout);
var degrees = spinAngleStart * 180 / Math.PI + 90;
var arcd = sliceSize * 180 / Math.PI;
var index = Math.floor((360 - degrees % 360) / arcd);
ctx.save();
ctx.font = "bold 48px sans-serif";
ctx.fillText(characters[index], canvas.width / 2 - ctx.measureText(characters[index]).width / 2, canvas.height / 2 + 50);
ctx.restore();
}

function easeOut(t, b, c, d) {
var ts = (t /= d) * t;
var tc = ts * t;
return b + c * (tc + -3 * ts + 3 * t);
}

createWheel();
document.getElementById("spin-button").addEventListener("click", function() {
spin();
});
