/* eslint-disable */
import scrollLock from 'scroll-lock';

import { Common } from "./vendor/common-functions.js";
import { particles_dino925 } from "./webgl/particles_dino925.js";
import { particles_dino4627 } from "./webgl/particles_dino4627.js";
import { particles_ws2 } from "./webgl/particles-ws2.js";

const lessParticles =0;
const webglStatus = 1;
scrollLock.disablePageScroll();

const particleIndex = [
  ["ws2", particles_ws2],
  ["dino925", particles_dino925],
  ["dino4627", particles_dino4627],
];

const vars = {
  vh: window.innerHeight,
  vw: window.innerWidth,
  cursor: undefined,
};

// const devContainer = dev.addContainer();
const isMobile = Common.isMobile();
const body = document.querySelector("body");

let menuglStatus = 0;

const siteRun = 0;

const partcileNumX = lessParticles < 1 ? 100 : 10;
const partcileNumY = lessParticles < 1 ? 100 : 10;

const particles = [];

// particles class
let particlePositions = "grid"; // grid, freeze, v2, v3, v4, v5, v6, v7, v8, disappear, top, centerline
let latestHomeParticlePositions = null;
export const setParticlePositions = function (i) {
  // shuffle(particles);
  particlePositions = i;
};
export const getParticlePositions = function (i) {
  return particlePositions;
};
const shuffle = function (array) {
  array.sort(() => Math.random() - 0.5);
};
class Particle {
  constructor(
    k,
    i,
    j,
    particlePositions_,
    particleNum_,
    particleSpeed_,
    particleIndex_,
  ) {
    this.i = i;
    this.j = j;
    this.init();
    this.x = this.x0;
    this.y = this.y0;
    this.pos = posArray.subarray(k * 3, k * 3 + 3);
    this.pointer = pointer;
    this.runned = 0;
    this.particlePositions = particlePositions_;
    this.particleNum = particleNum_;
    this.speed = particleSpeed_;
    this.particleIndex = particleIndex_;
  }

  init() {
    this.x0 = canvas.width * 0.5 + (this.i * canvas.width) / partcileNumX;
    this.y0 = canvas.height * 0.5 + (this.j * canvas.height) / partcileNumY;
  }

  move(particlePositions_) {
    this.particlePositions = particlePositions_;
    // const r = Math.floor(Math.random() * 100);
    // if (r == 1) {
    //   console.log("element");
    // }
    if (this.runned == 0) {
      this.runned = 1;
      // this.x = vw / 2; // ortada baslamalari icin
      // this.y = vh / 2; // ortada baslamalari icin
      const dx = this.pointer.x;
      const dy = this.pointer.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      const s = 1000 / d;
      this.x = vars.vw - Math.floor(Math.random() * vars.vw); // in 3
      this.y = vars.vh + Math.floor(Math.random() * vars.vh * 2); // in 3
    } else {
      for (let i = 0; i < this.particleIndex.length; i++) {
        const e = this.particleIndex[i];
        if (e[0] === this.particlePositions) {
          e[1](this, vars.vw, vars.vh);
          break;
        }
      }
    }
  }
}
let colorR = 0;
// webGL canvas
const canvas = {
  init(options) {
    // set webGL context
    this.elem = document.querySelector("canvas");
    const gl = (this.gl =
      this.elem.getContext("webgl", options) ||
      this.elem.getContext("experimental-webgl", options));
    if (!gl) return false;
    // compile shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    // gl_PointSize = max(2.0, min(30.0, aPosition.z));
    gl.shaderSource(
      vertexShader,
      `
					precision highp float;
					attribute vec3 aPosition;
					uniform vec2 uResolution;
					void main() {
						gl_PointSize = max(2.0, min(10.0, aPosition.z));
						gl_Position = vec4(
							( aPosition.x / uResolution.x * 2.0) - 1.0, 
							(-aPosition.y / uResolution.y * 2.0) + 1.0, 
							0.0,
							1.0
						);
					}
      	`,
    );
    gl.compileShader(vertexShader);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    colorR = 0.6;
    gl.shaderSource(
      fragmentShader,
      `
					precision highp float;
					void main() {
						vec2 pc = 2.0 * gl_PointCoord - 1.0;
						gl_FragColor = vec4(${ 
        colorR 
        }, ${ 
        colorR 
        }, ${ 
        colorR 
        }, 1.0 - dot(pc, pc));
					}
				`,
    );
    gl.compileShader(fragmentShader);
    const program = (this.program = gl.createProgram());
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);
    gl.useProgram(this.program);
    // resolution
    console.log(this.uResolution);
    this.uResolution = gl.getUniformLocation(this.program, "uResolution");
    gl.enableVertexAttribArray(this.uResolution);
    
    // canvas resize
    this.resize();
    window.addEventListener("resize", () => this.resize(), false);
    return gl;
  },
  resize() {

    this.width = this.elem.width = this.elem.offsetWidth;
    this.height = this.elem.height = this.elem.offsetHeight;
    for (const p of particles) p.init();
    this.gl.uniform2f(this.uResolution, this.width, this.height);
    this.gl.viewport(
      0,
      0,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight,
    );
  },
};
const pointer = {
  init(canvas) {
    this.x = 0;
    this.y = 0;
    this.s = 0;
    ["mousemove", "touchstart", "touchmove"].forEach((event, touch) => {
      document.addEventListener(
        event,
        (e) => {
          if (touch) {
            e.preventDefault();
            this.x = e.targetTouches[0].clientX;
            this.y = e.targetTouches[0].clientY;
          } else {
            this.x = e.clientX;
            this.y = e.clientY;
          }
        },
        false,
      );
    });
  },
};
// init webGL canvas
const gl = canvas.init({
  alpha: true,
  stencil: false,
  antialias: false,
  depth: false,
});
// additive blending "lighter"
gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
gl.enable(gl.BLEND);
// init pointer
pointer.init(canvas);
// init particles
const nParticles = partcileNumX * partcileNumY;
const posArray = new Float32Array(nParticles * 3);
let k = 0;
let particleNum = 0;
for (let i = -partcileNumX / 2; i < partcileNumX / 2; i++) {
  for (let j = -partcileNumY / 2; j < partcileNumY / 2; j++) {
    const particleSpeed = Math.round((Math.random() * 400) / 10) + 1;
    particles.push(
      new Particle(
        k++,
        i,
        j,
        particlePositions,
        particleNum,
        particleSpeed,
        particleIndex,
      ),
    );
    particleNum++;
  }
}

// create position buffer
const aPosition = gl.getAttribLocation(canvas.program, "aPosition");
gl.enableVertexAttribArray(aPosition);
const positionBuffer = gl.createBuffer();
// draw all particles
const draw = () => {
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
  gl.bufferData(gl.ARRAY_BUFFER, posArray, gl.DYNAMIC_DRAW);
  gl.drawArrays(gl.GL_POINTS, 0, nParticles);
};
// main animation loop
const run = () => {
  if (menuglStatus == 1) {
    requestAnimationFrame(run);
  }
  for (const p of particles) p.move(particlePositions);
  draw();

  // console.log("running");
};

const startbg = () => {
  if(webglStatus==1){
    canvas.resize();
    menuglStatus = 1;
    requestAnimationFrame(run);
  }
};

const stopbg = () => {
  menuglStatus = 0;
};

const pageChangedAction = function () {
  // menu.buttonize();
  route.update();
  // nav.init();
};

setParticlePositions("ws2");


document.querySelector('.js-btn-1').addEventListener('click', () => {
  setParticlePositions("ws2");
})
document.querySelector('.js-btn-2').addEventListener('click', () => {
  setParticlePositions("dino925");
})
document.querySelector('.js-btn-3').addEventListener('click', () => {
  setParticlePositions("dino4627");
})

// if (isMobile) {
//   body.classList.add("mobile");
// }

// scrollLock.disablePageScroll();

window.onload = function (e) {
  window.addEventListener("resize", function () {
    vars.vw = window.innerWidth;
    vars.vh = window.innerHeight;
  });
  startbg();
  if (body.classList.contains("home")) {
    // communiction with ajaxify
    // const pageChanged = document.querySelector("#pageChanged");
    // pageChanged.addEventListener;
    // pageChanged.addEventListener(
    //   "mouseup",
    //   function (event) {
    //     pageChangedAction();
    //   },
    //   false,
    // );
    // / communiction with ajaxify
    // siteHeader.init();
    // menu.init(
    //   startbg,
    //   stopbg,
    //   setParticlePositions,
    //   getParticlePositions,
    //   siteHeader,
    // );
    // setTimeout(() => {
    //   menu.showMenuButton();
    // }, 3000);
  } else {
  }
  // nav.init();
  // const isHome = body.classList.contains("home");
  // route.init(setParticlePositions, menu, vars, siteHeader, isHome);
  // route.update();
  // if (!isMobile) {
  //   cursor.init();
  //   cursor.buttonize();
  // }
};

export const getVh = function () {
  return vars.vh;
};

export const getVw = function () {
  return vars.vw;
};

export const getLatestHomeParticlePositions = function () {
  return latestHomeParticlePositions;
};

export const setLatestHomeParticlePositions = function (position) {
  latestHomeParticlePositions = position;
};