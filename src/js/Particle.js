import {contain} from 'intrinsic-scale';

export default class Particle {
  constructor(props = {}) {
    this.normalX  = props.normalX;
    this.normalY  = props.normalY;
    this.naturalW = props.naturalW;
    this.naturalH = props.naturalH;
    this.containerW = props.containerW;
    this.containerH = props.containerH;
    this.positionArr = props.positionArr;
    this.index = props.index;
    this.speed = props.speed;

    this.updateSize();

    this.x = this.originalX;
    this.y = this.originalY;
    this.x = this.containerW - Math.floor(Math.random() * this.containerW); // in 3
    this.y = this.containerH + Math.floor(Math.random() * this.containerH * 2); // in 3
    this.s = 0;

    this.setPointToArr();
  }

  move(mouse) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    // const wslogox = (this.normalX * this.containerW) / 1.5 +
    // this.containerW / 2 +
    //   Math.round(Math.random() * 20);
    // const wslogoy =
    //   (this.normalY * this.containerW) / -1.5 +
    //   this.containerH / 2 +
    //   Math.round(Math.random() * 20);
    
    this.s = 100 / d;
    this.x += -this.s * (dx / d) + ((this.originalX - this.x) * this.speed) / 1000; // weird results with 2
    this.y += -this.s * (dy / d) + ((this.originalY - this.y) * this.speed) / 1000;
    
    this.setPointToArr();
  }

  updateSize() {
    const width1 = 500;
    const height1 = 500;
    const { width, height, x, y } = contain(width1, height1, this.naturalW, this.naturalH);
    if (this.index === 0)console.log(width, height, x, y);
    // this.originalX = this.normalX * width + x;
    // this.originalY = this.normalY * height + y;
    this.originalX = (this.normalX + Math.random()/400) * width + x + this.containerW/2 - width1/2;
    this.originalY = (this.normalY + Math.random()/400) * height + y + this.containerH/2 - height1/2;
    // console.log(this.containerW/2);
    // this.originalX += 100;
    // this.originalY = this.originalY / 3;
    // console.log(this.originalY);
  }

  onResizeHandler(containerW, containerH) {
    this.containerW = containerW;
    this.containerH = containerH;


  }

  setPointToArr() {
    this.positionArr[this.index * 3 + 0] = this.x;
    this.positionArr[this.index * 3 + 1] =  this.y;
    // this.positionArr[this.index * 3 + 2] = 0;
    this.positionArr[this.index * 3 + 2] = (this.speed / 40) * this.s * this.s;
  }
}