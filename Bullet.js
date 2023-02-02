export default class Bullet {
  constructor(x, y, speed, damage) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.damage = damage;
    this.width = 20;
    this.height = 30;
    this.color = "yellow";
    const image = new Image();
    image.src = "./img/bullet.png";
    this.image = image;
  }
  draw(ctx) {
    this.y -= this.speed;

    ctx.drawImage(
      this.image,
      this.x + this.width / 1.2,
      this.y,
      this.width,
      this.height
    );
  }

  touchSomething(anObject) {
    //si collision
    if (
      this.x < anObject.x + anObject.width &&
      this.x + this.width > anObject.x &&
      this.y < anObject.height + anObject.y &&
      this.y + this.height > anObject.y
    ) {
      anObject.takeDamage(this.damage);
      return true;
    } else {
      return false;
    }
  }
}
