import * as Three from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';// Set up scene
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

//const dinoModel = new URL("../Piko/Assets/T_Rex/source/dinosaur.glb", import.meta.url);
const modelLoader = new GLTFLoader();
let mixer;
const scene = new Three.Scene();

modelLoader.load("/Assets/T_Rex/source/dinosaur.glb", (gltf) => {

      
      gltf.scene.scale.set(10,10,10);
      gltf.scene.position.add(new Three.Vector3(-20,0,-20));
        scene.add(gltf.scene);
        mixer = new Three.AnimationMixer(gltf.scene);
        var animation = gltf.animations[0];
        var action = mixer.clipAction(animation);
        action.play();
  
})
/**/
const renderer = new Three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new Three.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
camera.position.x = -75;
camera.position.y = 39;
camera.position.z =35;
camera.rotation.y += 0.9;


const ballGeometry = new Three.SphereGeometry(10);
const ambientLight = new Three.AmbientLight(0xFFFFFF,10);
const matBall = new Three.MeshBasicMaterial({color: 0x22222});
const meshBall = new Three.Mesh(ballGeometry, matBall);

meshBall.position.add(new Three.Vector3(0,20,0));
const gridHelper = new Three.GridHelper(400,100);
//scene.add(meshBall);
scene.add(ambientLight);

scene.add(gridHelper);

const controls = new OrbitControls(camera,renderer.domElement);


 function animation() {
  if (mixer) {
    mixer.update(0.024); // Assuming 60 FPS
  }  
  renderer.render(scene, camera);

  //  renderer.

  controls.update()
 }
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)}
  
  );;
 renderer.setAnimationLoop(animation);


