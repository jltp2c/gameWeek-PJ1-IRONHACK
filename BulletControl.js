import Bullet from "./Bullet.js";

export default class BulletControl {
  bullets = [];
  timerNextBullet = 0;
  constructor(canvas) {
    this.canvas = canvas;
  }
  //shooting delay
  shoot(x, y, speed, damage, delay) {
    if (this.timerNextBullet <= 0) {
      this.bullets.push(new Bullet(x, y, speed, damage));
      this.timerNextBullet = delay;
    }
    //delay the bullet when a bullet is gone, allow to see a multiple bullet
    this.timerNextBullet--;
  }

  draw(ctx) {
    this.bullets.forEach((bullet) => {
      if (this.bulletOffScreen(bullet)) {
        //allow to remove the bullet off the screen
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
      }
      bullet.draw(ctx);
    });
  }

  bulletOffScreen(bullet) {
    return bullet.y <= -bullet.height;
  }

  touchSomething(anObject) {
    return this.bullets.some((bullet) => {
      if (bullet.touchSomething(anObject)) {
        const indexBullet = this.bullets.indexOf(bullet);
        this.bullets.splice(indexBullet, 1);
        return true;
      } else {
        return false;
      }
    });
  }
}
