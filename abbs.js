d = document;
let sheeps = [];
let img = d.getElementById("sheep");
let imgG = d.getElementById("sheepG");
let onion = d.getElementById("onion");
let otherSheep = d.getElementById("otherSheep");
let canvas = d.getElementById("canvas");
let ctx = canvas.getContext("2d");

let tol = 4;

let x1, y1, x2, y2, posx, posy, br;
let q = 0;

const types = {
  0: img,
  1: onion,
  2: otherSheep,
  3: imgG,
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
    d.getElementById("sex").value = "";
  } else {
    d.getElementById("modal2").style.visibility = "hidden";
    d.getElementById("modal2").style.opacity = "0";
  }
};

//this is the detail and breed button/set
const showDets = (n,s,a) => {


  d.getElementById("modal3").style.visibility = "visible";
  d.getElementById("modal3").style.opacity = "1";
  d.getElementById("sheepName3").value = n;
  d.getElementById("age3").value = a;
  d.getElementById("sex3").value = s;

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
  sex = d.querySelector('input[name="sex"]:checked').value;
  age = d.getElementById("age").value;
  if (q > onionProb) {
    sheepName = "Onion";
    sex = 1;
    age = 6;
    br = 1;
    q = 0;
  } else {
    onionProb = rando(100) + 10;
    br = 0;
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
      e[4] >= posx - 20 &&
      e[4] <= posx + 20 &&
      e[5] >= posy - 20 &&
      e[5] <= posy + 20
    ) {
      cr = e[0];
      showDets(e[0],e[1],e[2]);
      console.log(e[0]);
    } else {
    }
  });
  if (cr == " ") show(1);
  d.getElementById("listy2").innerText = cr;
  d.getElementById("listy").innerText = cr;
};

const close = () => {
  show(0);
};

d.getElementById("close").addEventListener("click", close);
d.getElementById("addBut").addEventListener("click", addSheep);
window.addEventListener("mousemove", draw, false);
d.getElementById("canvas").addEventListener("click", clicky, false);
setInterval(moveSA, 40);

show(1);
