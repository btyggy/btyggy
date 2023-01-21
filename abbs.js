d = document;
let sheeps = [];
let img = d.getElementById("sheep");
let imgG = d.getElementById("sheepG");
let onion = d.getElementById("onion");
let otherSheep = d.getElementById("otherSheep");
let canvas = d.getElementById("canvas");
let ctx = canvas.getContext("2d");
let breeding = 0;
let tol = 20;

let x1, y1, x2, y2, posx, posy, br;
let q = 0;

const types = {
  0: img,
  1: onion,
  2: otherSheep,
  3: imgG,
  4: sheepM,
};

const rando = (i) => Math.floor(Math.random() * i);
let onionProb = rando(100) + 10;
const playAudio = (url) => new Audio(url).play();

const show = (on) => {
  if (on == 1) {
    d.getElementById("modal2").style.visibility = "visible";
    d.getElementById("modal2").style.opacity = "1";
    // d.getElementById("sheepName").innerText=""
    // d.getElementById("sheepName").innerHTML=""
    d.getElementById("sheepName").value = "";
    d.getElementById("age").value = "";
    d.getElementById("sexM").checked = false;
    d.getElementById("sexF").checked = false;
  } else {
    d.getElementById("modal2").style.visibility = "hidden";
    d.getElementById("modal2").style.opacity = "0";
  }
};

//this is the detail and breed button/set
const showDets = (n, s, a) => {
  if (n) {
    d.getElementById("modal3").style.visibility = "visible";
    d.getElementById("modal3").style.opacity = "1";
    d.getElementById("sheepName3").value = n;

    if (s == 0) {
      d.getElementById("sex3F").checked = true;
      d.getElementById("sex3M").checked = false;
    } else {
      d.getElementById("sex3F").checked = false;
      d.getElementById("sex3M").checked = true;
    }

    d.getElementById("age3").value = a;
  } else {
    d.getElementById("modal3").style.visibility = "hidden";
    d.getElementById("modal3").style.opacity = "0";
  }
};

const draw = (e) => {
  var pos = getMousePos(canvas, e);
  posx = pos.x;
  posy = pos.y;
};

function getMousePos(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
    y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
  };
}

const colourRect = (leftX, topY, width, height, drawColor) => {
  ctx.fillStyle = drawColor;
  ctx.fillRect(leftX, topY, width, height);
};

const addSheep = () => {
  playAudio("sheep.mp3");

  sheepName = d.getElementById("sheepName").value;
  sex = d.getElementById("sexF").checked == true ? 0 : 4;
  age = d.getElementById("age").value;
  if (q > onionProb) {
    sheepName = "Onion";
    sex = 1;
    age = 6;
    br = 1;
    q = 0;
  } else {
    onionProb = rando(100) + 10;

    br = sex;
    q += 1;
  }

  sheeps.push([
    sheepName,
    sex,
    age,
    br,
    rando(499),
    rando(499),
    rando(10) > 5 ? 1 : -1,
    rando(10) > 5 ? 1 : -1,

    console.log("se " + sex),
  ]);
};

const moveS = (sheepX, sheepY, x2, y2, brand) => {
  if (sheepX > 460) x2 = -1;
  if (sheepX < 1) x2 = Math.random() * 1;
  sheepX = x2 + sheepX;
  if (sheepY > 460) y2 = -1;
  if (sheepY < 1) y2 = Math.random() * 1;
  sheepY = y2 + sheepY;
  ctx.drawImage(types[brand], sheepX, sheepY);
  // sheep to mouse
  ctx.drawImage(types[2], posx, posy);
  return [sheepX, sheepY, x2, y2];
};

const moveSA = () => {
  colourRect(0, 0, 500, 500, "green");
  sheeps.forEach((e, i) => {
    //if(breeding==0){// show only male

    //if(e[1]==0){

    // continue

    // }

    [sheeps[i][4], sheeps[i][5], sheeps[i][6], sheeps[i][7]] = moveS(
      e[4],
      e[5],
      e[6],
      e[7],
      e[3]
    );
  });
};

const clicky = () => {
  let cr = " ";
  sheeps.forEach((e) => {
    if (
      e[4] >= posx - tol &&
      e[4] <= posx + tol &&
      e[5] >= posy - tol &&
      e[5] <= posy + tol
    ) {
      cr = e[0];
      showDets(e[0], e[1], e[2]);
      // console.log(e[0]);
    } else {
    }
  });
  if (cr == " ") show(1);
};

const close = () => show(0);

const close3 = () => showDets();

const aging = () => (sheeps = sheeps.map((e) => e + 1));

const breed = () => {
  showDets();
  breeding = 1;
  // breeding bit goes here :-) maybe
};

d.getElementById("close").addEventListener("click", close);
d.getElementById("close3").addEventListener("click", close3);
d.getElementById("addBut").addEventListener("click", addSheep);
d.getElementById("breed").addEventListener("click", breed);
window.addEventListener("mousemove", draw, false);
d.getElementById("canvas").addEventListener("click", clicky, false);
setInterval(moveSA, 40);

show(1);
