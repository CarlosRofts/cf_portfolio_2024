import * as THREE from 'three';
import ASScroll from '@ashthornton/asscroll';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import testTexture from '../img/texture.jpg';
import * as dat from 'dat.gui';
import gsap from 'gsap';
import barba from '@barba/core';
import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';
import { linksClickHandler, dinamicImport } from './js/dinamicImport';

export default class Sketch {
  constructor(options) {
    this.container = options.domElement;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(30, this.width / this.height, 10, 1000);
    this.camera.position.z = 600;

    this.camera.fov = (2 * Math.atan(this.height / 2 / 600) * 180) / Math.PI;
    this.imagesAdded = 0;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // this.renderer.setPixelRatio(2);
    this.container.appendChild(this.renderer.domElement);
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.materials = [];

    this.asscroll = new ASScroll({
      disableRaf: true,
    });

    this.asscroll.enable({
      horizontalScroll: !document.body.classList.contains('b-inside'),
    });
    this.time = 0;
    // this.setupSettings()

    this.addObjects();
    this.addClickEvents();
    this.resize();
    this.render();

    this.barba();

    this.setupResize();
  }

  barba() {
    this.animationRunning = false;
    const that = this;
    barba.init({
      transitions: [
        {
          name: 'from-home-transition',
          from: {
            namespace: ['home'],
          },
          leave(data) {
            console.log(`leave from-home-transition${data}`);

            // abandonando la pag.
            that.animationRunning = true;
            that.asscroll.disable();
            console.log('leave');
            return gsap.timeline().to(data.current.container, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                console.log('data.current.container', data.current.container);
              },
            });
          },
          async enter(data) {
            console.log(`enter from-home-transition${data}`);

            //  entrando a la nueva pag.

            await dinamicImport({ container: data.next.container.querySelector('[asscroll-container]'), asscroll: that.asscroll });
            // await linksClickHandler(data.next.container.querySelector('[asscroll-container]'));

            that.asscroll = new ASScroll({
              disableRaf: true,
              containerElement: data.next.container.querySelector('[asscroll-container]'), // inside
            });
            that.asscroll.enable({
              newScrollElements: data.next.container.querySelector('.scroll-wrap'), // inside
            });

            console.log('enter');
            // console.log('data.next.container', data.next.container.querySelector('[asscroll-container]')); // inside

            return gsap.timeline().from(data.next.container, {
              opacity: 0,
              onComplete: () => {
                that.container.style.visibility = 'hidden';
                that.animationRunning = false;
              },
            });
          },
        },
        {
          name: 'from-inside-page-transition',
          from: {
            namespace: ['inside'],
          },
          leave(data) {
            console.log(`leave from-inside-page-transition${data}`);

            that.asscroll.disable();
            return gsap
              .timeline()
              .to('.curtain', {
                duration: 0.3,
                y: 0,
              })
              .to(data.current.container, {
                opacity: 0,
              });
          },
          enter(data) {
            console.log(`enter from-inside-page-transition${data}`);

            that.asscroll = new ASScroll({
              disableRaf: true,
              containerElement: data.next.container.querySelector('[asscroll-container]'),
            });
            that.asscroll.enable({
              horizontalScroll: true,
              newScrollElements: data.next.container.querySelector('.scroll-wrap'),
            });
            // cleeaning old arrays
            that.imageStore.forEach((m) => {
              that.scene.remove(m.mesh);
            });
            that.imageStore = [];
            that.materials = [];
            that.addObjects();
            that.resize();
            that.addClickEvents();
            that.container.style.visibility = 'visible';

            return gsap
              .timeline()
              .to('.curtain', {
                duration: 0.3,
                y: '-100%',
              })
              .from(data.next.container, {
                opacity: 0,
              });
          },
        },
      ],
    });
  }

  async addClickEvents() {
    linksClickHandler();

    this.imageStore.forEach((i) => {
      i.img.addEventListener('click', () => {
        const tl = gsap
          .timeline()
          .to(i.mesh.material.uniforms.uCorners.value, {
            x: 1,
            duration: 0.4,
          })
          .to(
            i.mesh.material.uniforms.uCorners.value,
            {
              y: 1,
              duration: 0.4,
            },
            0.1,
          )
          .to(
            i.mesh.material.uniforms.uCorners.value,
            {
              z: 1,
              duration: 0.4,
            },
            0.2,
          )
          .to(
            i.mesh.material.uniforms.uCorners.value,
            {
              w: 1,
              duration: 0.4,
            },
            0.3,
          );
      });
    });
  }

  setupSettings() {
    this.settings = {
      progress: 0,
    };
    this.gui = new dat.GUI();
    this.gui.add(this.settings, 'progress', 0, 1, 0.001);
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.camera.fov = (2 * Math.atan(this.height / 2 / 600) * 180) / Math.PI;

    this.materials.forEach((m) => {
      m.uniforms.uResolution.value.x = this.width;
      m.uniforms.uResolution.value.y = this.height;
    });

    this.imageStore.forEach((i) => {
      const bounds = i.img.getBoundingClientRect();
      i.mesh.scale.set(bounds.width, bounds.height, 1);
      i.top = bounds.top;
      i.left = bounds.left + this.asscroll.currentPos;
      i.width = bounds.width;
      i.height = bounds.height;

      i.mesh.material.uniforms.uQuadSize.value.x = bounds.width;
      i.mesh.material.uniforms.uQuadSize.value.y = bounds.height;

      i.mesh.material.uniforms.uTextureSize.value.x = bounds.width;
      i.mesh.material.uniforms.uTextureSize.value.y = bounds.height;
    });
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  addObjects() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 100, 100);
    console.log(this.geometry);
    this.material = new THREE.ShaderMaterial({
      // wireframe: true,
      uniforms: {
        time: { value: 1.0 },
        uProgress: { value: 0 },
        uTexture: { value: null },
        uTextureSize: { value: new THREE.Vector2(100, 100) },
        uCorners: { value: new THREE.Vector4(0, 0, 0, 0) },
        uResolution: { value: new THREE.Vector2(this.width, this.height) },
        uQuadSize: { value: new THREE.Vector2(300, 300) },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.scale.set(300, 300, 1);
    // this.scene.add( this.mesh );
    this.mesh.position.x = 300;

    this.images = [...document.querySelectorAll('.js-image')];

    this.imageStore = this.images.map((img) => {
      const bounds = img.getBoundingClientRect();
      const m = this.material.clone();
      this.materials.push(m);
      // let texture = new THREE.Texture(img);

      const loader = new THREE.TextureLoader();
      const texture = loader.load(img.src);

      m.uniforms.uTexture.value = texture;

      // img.addEventListener('mouseout',()=>{
      //     this.tl = gsap.timeline()
      //     .to(m.uniforms.uCorners.value,{
      //         x:0,
      //         duration: 0.4
      //     })
      //     .to(m.uniforms.uCorners.value,{
      //         y:0,
      //         duration: 0.4
      //     },0.1)
      //     .to(m.uniforms.uCorners.value,{
      //         z:0,
      //         duration: 0.4
      //     },0.2)
      //     .to(m.uniforms.uCorners.value,{
      //         w:0,
      //         duration: 0.4
      //     },0.3)
      // })

      const mesh = new THREE.Mesh(this.geometry, m);
      this.scene.add(mesh);
      mesh.scale.set(bounds.width, bounds.height, 1);
      return {
        img,
        mesh,
        width: bounds.width,
        height: bounds.height,
        top: bounds.top,
        left: bounds.left,
      };
    });
  }

  setPosition() {
    // console.log(this.asscroll.currentPos)
    if (!this.animationRunning) {
      // console.log('setPosition');
      this.imageStore.forEach((o) => {
        o.mesh.position.x = -this.asscroll.currentPos + o.left - this.width / 2 + o.width / 2;
        o.mesh.position.y = -o.top + this.height / 2 - o.height / 2;
      });
    }
  }

  render() {
    this.time += 0.05;
    this.material.uniforms.time.value = this.time;

    this.asscroll.update(); // 📝 Se desactivo el RAF y ahora necesita actualizarse manualmente, esto se hizo para evitar el delay y coordinar ambos ambientes, webgl y assScroll
    this.setPosition();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}
