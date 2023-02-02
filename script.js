import Player from "./Player.js";
import BulletControl from "./BulletControl.js";
import Obstacles from "./Obstacles.js";
const scoreEl = document.getElementById("score");
const canvas = document.getElementById("game");
let spans = document.querySelectorAll("span.heart");
const palier1 = document.querySelector(".palier1");
const palier2 = document.querySelector(".palier2");
const palier3 = document.querySelector(".palier3");
const palier4 = document.querySelector(".palier4");
const palier5 = document.querySelector(".palier5");
const start = document.querySelector(".start");
const rules = document.querySelector(".me");
const grandma = document.querySelector(".grandma");
const grandmaLife = document.querySelector(".grandmaLife");
const issues = document.querySelector(".issues");
const word = document.querySelector(".word");
const ctx = canvas.getContext("2d");

//backSound
const soundBack = new Audio();
soundBack.src = "./music/musicback.mp3";

//winning song
const winner = new Audio();
winner.src = "./music/win.mp3";

//validate song
const validate = new Audio();
validate.src = "./music/validate.mp3";

//grandMaScream sound
const soundGrandMa = new Audio();
soundGrandMa.src = "./music/gm.mp3";

//failed song
const failed = new Audio();
failed.src = "./music/failed.mp3";

const background = new Image();
background.src = "./img/background/html.png";

const starter = new Image();
starter.src = "./img/background/start.png";

const backgroundGameOver = new Image();
backgroundGameOver.src = "./img/background/loose.png";

const backgroundFinished = new Image();
backgroundFinished.src = "./img/background/finished.jpg";

//creation des bullets
const bulletControl = new BulletControl(canvas);
//create a player*******************
const player = new Player(canvas.width, canvas.height * 2.5, bulletControl);

canvas.width = 600;
canvas.height = 450;

let obstacles = [];
let score = 0;
let scrollSpeed = 2;
let yPos = 0;
let gmArray = [];
let isGameOver = false;
let intervalId = null;
let animationFrameId = null;

//function to reset the game
function init() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  isGameOver = false;
  yPos = 0;
  scrollSpeed = 2;

  gmArray = [];
  score = 0;
  scoreEl.inn;
  palier1.textContent = "";
  palier2.textContent = "";
  palier3.textContent = "";
  palier4.textContent = "";
  palier5.textContent = "";
  word.textContent = "";
  for (let span of spans) {
    span.classList.remove("remove");
  }
  soundBack.play();
}

//invoke new obstacles
function randomObstacles() {
  intervalId = setInterval(() => {
    console.log("hello");
    //score MAX you can put in the game
    if (score >= 100) {
      winner.play();
      return;
    } else {
      obstacles.push(new Obstacles(Math.floor(Math.random() * 550), 0, 5, 1));
    }
  }, 2500);
}

//scrolling background speed

function update() {
  // Effacer le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dessiner l'image de fond
  ctx.drawImage(background, 0, yPos, canvas.width, canvas.height);

  // Incrémenter la position verticale
  yPos += scrollSpeed;
  if (yPos > 0) {
    ctx.drawImage(
      background,
      0,
      yPos - canvas.height,
      canvas.width,
      canvas.height
    );
  }
  // Si l'image de fond est sortie du canvas, la remettre en haut
  if (yPos >= canvas.height) {
    yPos = 0;
  }
}

// function checkCollision(rect) {
//   if (rect.x < 0) {
//     rect.x = 0;
//   }
//   if (rect.x + rect.width > canvas.width) {
//     rect.x = canvas.width - rect.width;
//   }
//   if (rect.y < 0) {
//     rect.y = 0;
//   }
//   if (rect.y + rect.height > canvas.height) {
//     rect.y = canvas.height - rect.height;
//   }
// }
function draw() {
  if (!isGameOver) {
    bulletControl.draw(ctx);
    player.draw(ctx);
    // checkCollision(player);
    animationFrameId = requestAnimationFrame(gameLoop);
  } else {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //set a new background black
    ctx.drawImage(backgroundGameOver, 0, 0, canvas.width, canvas.height);
    clearInterval(intervalId);
    cancelAnimationFrame(animationFrameId);
    word.textContent = "Oh dear... NO COOKIES TODAYYYY  😭😭😭😭 ";
  }

  if (score >= 100) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundFinished, 0, 0, canvas.width, canvas.height);
    soundBack.pause();
    winner.play();
    word.textContent =
      "🍪 🍪 I'm going to prepare some coooookiiiiiiessssss 🍪 🍪 ";
    return;
  }
}

function gameLoop() {
  //fond de canvas, clear the screen
  update();
  draw();
  displayLvl();

  //logics of the obstacles
  obstacles.forEach((obstacle, index) => {
    if (obstacle.y >= canvas.height) {
      obstacles.splice(index, 1);
      soundGrandMa.play();
      //i create an array to have all the life of grand ma

      for (let i = 0; i < spans.length; i++) {
        gmArray.push(gmArray[i]);
        if (spans[i].classList.contains("remove") === false) {
          spans[i].classList.add("remove");
          break;
        }
      }

      //game over or not ?
      console.log(gmArray);
      isGameOver = gmArray.length >= 28;
      if (isGameOver) {
        clearInterval(intervalId);
        soundBack.pause();
        failed.play();
        palier1.classList.add("remove");
        palier2.classList.add("remove");
        palier3.classList.add("remove");
        palier4.classList.add("remove");
        palier5.classList.add("remove");
        word.classList.remove("remove");
      }
    }

    //collision player from obstacle
    if (bulletControl.touchSomething(obstacle)) {
      score += 1;
      scoreEl.innerHTML = score;
      if (obstacle.health <= 0) {
        const index = obstacles.indexOf(obstacle);
        obstacles.splice(index, 1);
        validate.play();
      }
    } else {
      if (!isGameOver) {
        obstacle.draw(ctx);
        obstacle.updatePosition();
        if (score > 25 && score < 50) {
          obstacle.draw(ctx);
          obstacle.updatePositionLvl1();
        } else if (score > 50 && score < 75) {
          obstacle.draw(ctx);
          obstacle.updatePositionLvl2();
        } else if (score > 76 && score < 100) {
          obstacle.draw(ctx);
          obstacle.updatePositionLvl3();
        } else if (score > 100 && score < 200) {
          obstacle.draw(ctx);
          obstacle.updatePositionLvl4();
        }
      }
    }
  });
}

function displayLvl() {
  if (score === 25) {
    palier1.textContent =
      "✅  You reach at least 25 points HTML : Hell YEAHH 🥳 🥳 ✅ !";
    palier1.classList.remove("remove");
  } else if (score === 50) {
    palier2.textContent =
      "✅  You reach at least 50 points HTML/CSS : Come on 🥳 🥳  ✅ !";
    palier2.classList.remove("remove");
  } else if (score === 75) {
    palier3.textContent =
      "✅  You reach at least 75 points HTML/CSS/JS : I will make a ton of cookies!!!  🍪 🍪 ✅ !";
    palier3.classList.remove("remove");
  } else if (score === 100) {
    palier4.textContent =
      "You reach at least 100 points HTML/CSS/JS/MERNSTACK are DONE ✅ ! Wow that's why we have the same blood 👌";
    palier4.classList.remove("remove");
  } else if (score === 200) {
    palier5.textContent =
      "🎉  You reach 200 points ! Oh my god You are my GANG Ironhacker!!! 🎉 ";
    palier5.classList.remove("remove");
  }
}

function startGame() {
  clearInterval(intervalId);
  cancelAnimationFrame(animationFrameId);
  obstacles = [];
  init();
  randomObstacles();
  gameLoop();
  start.classList.add("remove");
  issues.classList.remove("remove");
  rules.classList.add("remove");
  grandma.classList.add("remove");
  grandmaLife.classList.remove("remove");
  restart.classList.remove("remove");
  word.classList.add("remove");
  palier1.classList.add("remove");
  palier2.classList.add("remove");
  palier3.classList.add("remove");
  palier4.classList.add("remove");
  palier5.classList.add("remove");
  failed.pause();
  soundBack.play();
}

start.addEventListener("click", startGame);

// ici je supprime la souris lorsqu'elle rentre dans le canvas
canvas.addEventListener("mouseenter", function () {
  console.log("enter");
  canvas.classList.add("hide-cursor");
});
canvas.addEventListener("mouseleave", function () {
  console.log("exit");
  canvas.classList.remove("hide-cursor");
});

const restart = document.querySelector(".restart");
restart.addEventListener("click", startGame);

const mute = document.querySelector(".mute");
const demute = document.querySelector(".demute");

mute.addEventListener("click", () => {
  soundBack.pause();
  demute.classList.remove("remove");
});

demute.addEventListener("click", () => {
  soundBack.play();
  demute.classList.add("remove");
});
