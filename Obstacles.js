export default class Obstacles {
  constructor(x, y, health) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.width = 50;
    this.height = 50;
    const obstacle1 = new Image();
    obstacle1.src = "./img/character/obstacle/obexplose.png";
    this.obstacle1 = obstacle1;
  }

  //define the logic of the obstacles and his styles
  draw(ctx) {
    if (this.health >= 0) {
      ctx.drawImage(this.obstacle1, this.x, this.y, this.width, this.height);
    } else {
      ctx.strokeStyle = this.color;
    }
    //drawing the lifes obstacles
    ctx.fillStyle = "red";
    ctx.font = "15px Arial";
    ctx.fillText(this.health, this.x + this.width / 2, this.y);
  }

  updatePosition() {
    this.y += 1.5;
  }
  updatePositionLvl1() {
    this.y += 2.5;
  }
  updatePositionLvl2() {
    this.y += 4.5;
  }
  updatePositionLvl3() {
    this.y += 5.5;
  }
  updatePositionLvl4() {
    this.y += 6.5;
  }

  takeDamage(damage) {
    this.health -= damage;
  }
}
