/* eslint-disable */
// import { wslogo } from "./vector-ws-logo.js";
import { wslogo } from "./dino4627.js";


const wslogolength = wslogo.length;

const shuffle = function(array) {
  array.sort(() => Math.random() - 0.5);
};

shuffle(wslogo);

export const particles_dino4627 = function(tt, ww, hh) {
  let e = 0;
  let currentNum = 0;
  for (let i = 0; i < 100; i++) {
    if (wslogo[tt.particleNum - wslogolength * e]) {
      currentNum = tt.particleNum - wslogolength * e;
      break;
    } else {
      e++;
    }
  }
  if (wslogo[currentNum]) {
    const dx = tt.pointer.x - tt.x;
    const dy = tt.pointer.y - tt.y;
    const wslogox =
      (wslogo[currentNum][0] * ww) / 1.5 +
      ww / 2 +
      Math.round(Math.random() * 20);
    const wslogoy =
      (wslogo[currentNum][1] * ww) / -1.5 +
      hh / 2 +
      Math.round(Math.random() * 20);
    // const dy = moustache[tt.particleNum][1] * 1000 - tt.y + 500;
    const d = Math.sqrt(dx * dx + dy * dy);
    const s = 100 / d;
    tt.x += -s * (dx / d) + ((wslogox - tt.x) * tt.speed) / 1000; // weird results with 2
    tt.y += -s * (dy / d) + ((wslogoy - tt.y) * tt.speed) / 1000;
    // update buffer position
    tt.pos[0] = tt.x;
    tt.pos[1] = tt.y;
    tt.pos[2] = (tt.speed / 40) * s * s;
  }
  // const r = Math.floor(Math.random() * 1000);
  // if (r == 1) {
  //   console.log(moustache[tt.particleNum][0]);
  // }
};