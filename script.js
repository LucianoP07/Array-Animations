// Canvas setup
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1200;
cnv.height = 700;

// Do not add/remove code from this section:
// ***************************************************
// Global Vars
let mouseX;
let mouseY;
let radius = Math.random() * 3.5 + 0.3;
let radius2 = Math.random() * 1 + 0.3;
let radiusSpeed = 0.1;

// mouse movement listener
cnv.addEventListener("mousemove", mousemoveHandler);

// Math Helper Functions
function mousemoveHandler(event) {
  let rect = cnv.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
  console.log("X: " + mouseX + "  Y: " + mouseY);
}
// ***************************************************

//----------------------------------Functions----------------------------------\\

//-------------------------------Circle Function-------------------------------\\
function circle(xCord, yCord, radius, type) {
  ctx.beginPath();
  ctx.arc(xCord, yCord, radius, 0, 2 * Math.PI);

  if (type == "stroke") {
    ctx.stroke();
  } else {
    ctx.fill();
  }
}
//-------------------------------Rectangle Function-------------------------------\\
function rect(xCord, yCord, width, height, type) {
  ctx.fillRect(xCord, yCord, width, height);
}
//-------------------------------Line Function-------------------------------\\
function line(x1, y1, x2, y2, type) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  if (type == "stroke") {
    ctx.stroke();
  } else {
    ctx.fill;
  }
}

//-------------------------------Triangle Function-------------------------------\\
function triangle(x1, y1, x2, y2, x3, y3, type) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();

  if (type == "stroke") {
    ctx.stroke();
  } else if (type == "fill") {
    ctx.fill();
  }
}

//-------------------------------Drawing Function-------------------------------\\
let stars = [];
function getStars() {
  let stars = {
    x: Math.random() * cnv.width,
    y: Math.random() * cnv.height,
    // radius: Math.random() * 2 + 0.3,
    color: "white",
    xSpeed: Math.random() * 6 - 3,
    ySpeed: Math.random() * 6 - 3,
  };
  return stars;
}

let stars2 = [];
function getStars2() {
  let stars2 = {
    x: Math.random() * cnv.width,
    y: Math.random() * cnv.height,
    // radius: Math.random() * 2 + 0.3,
    color: "white",
    xSpeed: Math.random() * 1,
    ySpeed: Math.random() * 1,
  };
  return stars2;
}
let moon = {
  x: 515,
  y: 238,
  h: 50,
  w: 50,
  xMSpeed: -0.5,
  yMSpeed: 0.5,
  moonPic: document.getElementById("moonimg"),
};
let earth = {
  x: 310,
  y: 240,
  h: 250,
  w: 250,
  earthPic: document.getElementById("earthimg"),
};
for (let i = 0; i < 350; i++) {
  stars.push(getStars());
}

for (let i = 0; i < 350; i++) {
  stars2.push(getStars2());
}

//-------------------------------Image Functiom-------------------------------\\
function image(img, x, y, w, h) {
  ctx.drawImage(img, x, y, w, h);
}
// let earth = document.getElementById("earthimg");
// let moonPic = document.getElementById("moonimg");
let SpaceB = document.getElementById("backimg");

//-------------------------------Actual Drawing-------------------------------\\

requestAnimationFrame(draw);
function draw() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  //background
  ctx.fillStyle = "rgb(0, 17, 41)";
  rect(0, 0, 1200, 700, "fill");

  //calling the functions
  drawStars(stars);
  orbitMoon(moon);

  //Drawing Earth & moon

  if (moon.xMSpeed >= -0.5 && moon.yMSpeed <= 0.5) {
    image(earth.earthPic, earth.x, earth.y, earth.w, earth.h);
    image(moon.moonPic, moon.x, moon.y, moon.w, moon.h);
  }
  if (moon.xMSpeed < 0.5 && moon.yMSpeed > -0.5) {
    image(moon.moonPic, moon.x, moon.y, moon.w, moon.h);
    image(earth.earthPic, earth.x, earth.y, earth.w, earth.h);
  }

  //Orbiting the Moon
  function orbitMoon() {
    moon.x += moon.xMSpeed;
    moon.y += moon.yMSpeed;

    if (moon.x <= 330 && moon.y >= 450) {
      moon.xMSpeed *= -1;
      moon.yMSpeed *= -1;
    } else if (moon.x >= 520 && moon.y <= 260) {
      moon.xMSpeed *= -1;
      moon.yMSpeed *= -1;
    }

    if (moon.x) {
    }
  }
  //Animating The Stars
  function drawStars(num) {
    for (let i = 0; i < stars.length; i++) {
      //First Set of Stars
      ctx.fillStyle = stars[0].color;
      ctx.beginPath();
      ctx.arc(stars[i].x, stars[i].y, radius, 0, 2 * Math.PI);
      ctx.fill();
      radius += radiusSpeed;
      if (radius >= 2.5) {
        radiusSpeed *= -1;
      }
      if (radius <= 1) {
        radiusSpeed *= -1;
      }
      //Second Set of Stars
      ctx.fillStyle = stars2[0].color;
      ctx.beginPath();
      ctx.arc(stars2[i].x, stars2[i].y, radius2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
  requestAnimationFrame(draw);
}

// < > Change the speed of the moon
// E Removes Earth
// M removes the Moon
// R resets everything

//-------------------------------Key Functions-------------------------------\\
document.addEventListener("keypress", keyboardHandler);

function keyboardHandler(event) {
  console.log(event.code);
  if (event.code == "Digit1") {
    if (moon.xMSpeed <= 1) {
      moon.xMSpeed -= 0.2;
      moon.yMSpeed += 0.2;
      if (moon.xMSpeed <= -18.09 && moon.yMSpeed >= 18.09) {
        moon.xMSpeed = -0.5;
        moon.yMSpeed = 0.5;
      }
    }
  }
  if (event.code == "Digit2") {
    console.log(moon.xMSpeed);

    if (moon.xMSpeed < 1) {
      moon.xMSpeed -= -0.2;
      moon.yMSpeed += -0.2;
      if (moon.xMSpeed == -0.09 && moon.yMSpeed == -0.09) {
        moon.xMSpeed = -0.5;
        moon.yMSpeed = 0.5;
      }
    } else if (moon.xMSpeed > 1) {
      moon.xMSpeed += -0.2;
      moon.yMSpeed -= -0.2;
      if (moon.xMSpeed == 0.09 && moon.yMSpeed == 0.09) {
        moon.xMSpeed = -0.5;
        moon.yMSpeed = 0.5;
      }
    }
  }

  if (event.code == "KeyM") {
    moon.h = 0;
    moon.w = 0;
  }
  if (event.code == "KeyE") {
    earth.h = 0;
    earth.w = 0;
  }

  if (event.code == "KeyR") {
    //Moon Reset
    moon.x = 515;
    moon.y = 238;
    moon.h = 50;
    moon.w = 50;
    moon.xMSpeed = -0.5;
    moon.yMSpeed = 0.5;
    moon.moonPic = document.getElementById("moonimg");

    //Earth Reset
    earth.x = 310;
    earth.y = 240;
    earth.h = 250;
    earth.w = 250;
    earth.earthPic = document.getElementById("earthimg");
  }
}
