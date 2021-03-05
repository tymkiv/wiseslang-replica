import * as THREE from 'three';

import Particle from './Particle';
import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';

// const OrbitControls = require('three-orbit-controls')(THREE)


class Sketch {
  constructor(container) {
    this.container = container;

    this.init();
    this.initMouse();
    this.initSketch();
    
    this.startTicker();
  }

  init() {
    this.updateSize();

    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 1, 10000);
    this.camera.position.z = 1;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    // this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild( this.renderer.domElement );
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    window.addEventListener('resize', this.onResizeHandler.bind(this));
    // document.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  fillUp(array, fillUpToSize) {
    while (array.length < fillUpToSize) {
      array.push(array[Math.floor(Math.random() * array.length)])
    }
    return this;
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return this;
  };
  

  getImageInfo() {
    this.imageInfo = {
      naturalW: 500,
      naturalH: 503,
      count: 0,
      normalCoords: []
    }

    const path = document.getElementById('js-path');
    const length = path.getTotalLength();
    const numberOfPoints = Math.floor(length / 10);
    this.imageInfo.count = numberOfPoints;
    
    for (let i = 0; i < numberOfPoints; i += 1) {
      const pointAt = length * i / numberOfPoints;
      const point = path.getPointAtLength(pointAt);
      this.imageInfo.normalCoords.push({
        x: point.x / this.imageInfo.naturalW,
        y: point.y / this.imageInfo.naturalH
      })
    }
    console.log('Total length:', this.imageInfo.count);
    this.shuffle(this.imageInfo.normalCoords);

    this.fillUp(this.imageInfo.normalCoords, 10000);
    this.imageInfo.count = 10000;
    
    console.log('Total length:', this.imageInfo.count);
  }

  initSketch() {
    this.particles = [];

    this.getImageInfo();

    this.positionArr = new Float32Array(this.imageInfo.count * 3);

    for (let i = 0; i < this.imageInfo.count; i += 1) {
      this.particles.push(new Particle({
        normalX : this.imageInfo.normalCoords[i].x,
        normalY : this.imageInfo.normalCoords[i].y,
        naturalW : this.imageInfo.naturalW,
        naturalH : this.imageInfo.naturalH,
        containerW : this.resolutionWidth,
        containerH : this.resolutionHeight,
        positionArr : this.positionArr,
        index: i,
        speed: Math.round((Math.random() * 400) / 10) + 1,
      }));
    }

    this.positionAttr = new THREE.BufferAttribute(this.positionArr, 3);

    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uResolution: { type: 'v2', value: new THREE.Vector2(this.resolutionWidth, this.resolutionHeight) },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      alphaTest: 0.5
    });

    this.geometry.setAttribute('position', this.positionAttr);

    this.pointCloud = new THREE.Points(this.geometry, this.material);
    this.pointCloud.frustumCulled = false;
    this.scene.add(this.pointCloud);
    console.log(this.geometry);
  }

  initMouse() {
    this.mouse = {x: 0, y: 0};
    ['mousemove', 'touchstart', 'touchmove'].forEach((event, touch) => {
      document.addEventListener(event, (e) => {
        if (touch) {
          e.preventDefault();
          this.mouse.x = e.targetTouches[0].clientX * window.devicePixelRatio;
          this.mouse.y = e.targetTouches[0].clientY * window.devicePixelRatio;
        } else {
          this.mouse.x = e.clientX * window.devicePixelRatio;
          this.mouse.y = e.clientY * window.devicePixelRatio;
        }
      },false);
    });
  }

  startTicker() {
    this.onTick();
    requestAnimationFrame(this.startTicker.bind(this));
  }

  onTick() {
    this.renderer.render(this.scene, this.camera);

    this.particles.forEach(p => {
      p.move(this.mouse);
    })

    // this.positionAttribute = new THREE.BufferAttribute( this.positionArr, 3 );
    // this.geometry.attributes.position.array = this.positionArr;
    this.positionAttr = new THREE.BufferAttribute( this.positionArr, 3 );
    this.geometry.setAttribute('position', this.positionAttr);
  }

  updateSize() {
    this.width  = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.resolutionWidth  = this.width  * window.devicePixelRatio;
    this.resolutionHeight = this.height * window.devicePixelRatio;
  }

  onResizeHandler() {
    this.updateSize();
    this.renderer.setSize(this.width, this.height);
    this.material.uniforms.uResolution.value.x = this.resolutionWidth;
    this.material.uniforms.uResolution.value.y = this.resolutionHeight;
  }
}

const sketch = new Sketch(document.getElementById('root'));