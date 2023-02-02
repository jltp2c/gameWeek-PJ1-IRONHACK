export default class Player {
  constructor(x, y, bulletControl) {
    this.position = {
      x: x,
      y: y,
    };
    this.bulletControl = bulletControl;
    this.speed = 20;
    this.width = 50;
    this.height = 50;
    // controler le personnage avec la souris
    document.addEventListener("mousemove", (e) => {
      //on recupere la position de la souris
      this.position.x = e.offsetX - this.width / 2;
      this.position.y = e.offsetY - this.width / 2;
    });

    const image = new Image();
    image.src = "./img/character/character.png";
    this.image = image;
  }

  draw(ctx) {
    this.shoot();
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  shoot() {
    let speed = 10;
    let delay = 7;
    let damage = 1;
    const bulletX = this.position.x;
    const bulletY = this.position.y;
    this.bulletControl.shoot(bulletX, bulletY, speed, damage, delay);
  }
}
