import * as Three from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';// Set up scene
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';

//const dinoModel = new URL("../Piko/Assets/T_Rex/source/dinosaur.glb", import.meta.url);

const modelLoader = new GLTFLoader();
const objLoader = new OBJLoader();
const stlLoader = new STLLoader();
const matLoader = new MTLLoader();
let birdModel;
let rexMixer, bracioMixer, birdMixer, pteraMixer;
const scene = new Three.Scene();

modelLoader.load("/Assets/T_Rex/source/dinosaur.glb", (gltf) => {

      
      gltf.scene.scale.set(10,10,10);
      gltf.scene.position.add(new Three.Vector3(-20,0,-20));
        scene.add(gltf.scene);
        rexMixer = new Three.AnimationMixer(gltf.scene);
        var animation = gltf.animations[0];
        var action = rexMixer.clipAction(animation);
        action.play();
  
})

modelLoader.load("/Assets/braciosaurus.glb", (gltf) => {

      
  gltf.scene.scale.set(11,11,11);
  gltf.scene.position.add(new Three.Vector3(20,0,-20));
    scene.add(gltf.scene);
    bracioMixer = new Three.AnimationMixer(gltf.scene);
    var animation = gltf.animations[0];
    var action = bracioMixer.clipAction(animation);
    action.play();

})


modelLoader.load("/Assets/bird2.glb", (gltf) => {

      
    gltf.scene.scale.set(0.3,0.3,0.3);
    gltf.scene.rotation.y += 0.4;
    gltf.scene.position.add(new Three.Vector3(-40,30,-20));
    scene.add(gltf.scene);
    birdModel = gltf.scene; // Store the model reference

    // If you want to set an initial rotation
    birdModel.rotation.set(0, Math.PI *1.5, 0);
    birdMixer = new Three.AnimationMixer(gltf.scene);
    var animation = gltf.animations[0];
    var action = birdMixer.clipAction(animation);
    action.play();

})


modelLoader.load("/Assets/pine_tree.glb", (gltf) => {

      
  gltf.scene.scale.set(0.3,0.3,0.3);
 // const geoTree = gltf.scene.children[0].geometry
 // const instancedMesh = new Three.InstancedMesh(geoTree.geometry.clone);
  gltf.scene.position.add(new Three.Vector3(60,0,-20));
  scene.add(gltf.scene);

})
/*
objLoader.load("/Assets/polokego/polokego.obj",(obj)=>{
  //obj.scale.set(3,3,3);
  obj.position.add(new Three.Vector3(40,0,-40));
  scene.add(obj);
  let max = 20
  obj.traverse(function (child) {
    if (child instanceof Three.Mesh) {
      child.position.x = max;
          max += 40;

    }
  });
});
*/
matLoader.load("Assets/polokego/polokego.mtl",(matSrc)=>{
  
  
})


modelLoader.load("/Assets/lego_man_prop/scene.gltf  ", (gltf) => {

      
  gltf.scene.scale.set(3,3,3);
  gltf.scene.position.add(new Three.Vector3(80,9,-20));/*
  let max = 5
  gltf.scene.traverse(function (child) {
    if (child instanceof Three.Mesh) {
      child.position.x = max;
          max += 5;

    }
  });*/
  scene.add(gltf.scene);

})
const geoCloud = new Three.BoxGeometry(20,5,40);
const matCloud = new Three.MeshStandardMaterial({color: 0xFFFFFF});
const cloud = new Three.InstancedMesh(geoCloud, matCloud, 20);

scene.background = new Three.Color(0x87CEEB);
const instanceObj = new Three.Object3D;
const geoPlane = new Three.PlaneGeometry(400,400);
const matPlane = new Three.MeshStandardMaterial({color: 0x696969});
const meshPlane  = new Three.Mesh(geoPlane, matPlane);
meshPlane.rotation.x = -0.5*Math.PI;
for (let k= 0; k< 20; k++) {

  instanceObj.position.x = 200 - Math.round(400*Math.random());
  instanceObj.position.y = 100 + Math.round(20*Math.random());
  instanceObj.position.z = 200 - Math.round(400*Math.random());
  instanceObj.updateMatrix();
  cloud.setMatrixAt(k, instanceObj.matrix);

}

scene.add(meshPlane)
scene.add(cloud);


matLoader.load("/Assets/legoManModel/legoManModel.mtl", (matLego) => {

  matLego.preload();
  objLoader.setMaterials(matLego);
  objLoader.load("/Assets/legoManModel/legoManModel.obj", (lego) => {

    
    lego.scale.set(0.4,0.4,0.4);
    lego.position.add(new Three.Vector3(-60,0,-20));/*
    let max = 5
    gltf.scene.traverse(function (child) {
      if (child instanceof Three.Mesh) {
        child.position.x = max;
            max += 5;

      }
    });*/
    scene.add(lego);
    console.log(lego)

  })
});
/*

objLoader.load("/Assets/Minifig/Minifig.obj",(obj)=>{
  //obj.scale.set(3,3,3);
  obj.position.add(new Three.Vector3(40,0,-40));
  walkModel = new Three.AnimationMixer(obj);
  var animation = obj.animations[0];
  var action = walkModel.clipAction(animation);
  action.play();
  scene.add(obj);
  let max = 20
  obj.traverse(function (child) {
    if (child instanceof Three.Mesh) {
      child.position.x = max;
          max += 40;

    }
  });
});

*/


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

//scene.add(gridHelper);

const controls = new OrbitControls(camera,renderer.domElement);
  var birdTime = 0;

 function animation() {
  if (rexMixer) {
    rexMixer.update(0.024); // Assuming 60 FPS
  }  
  if (bracioMixer){
    bracioMixer.update(0.03);
  }

  if (birdMixer){
  //  birdMixer.position.x = Math.cos(-40*birdTime*2*Math.PI);
    
    //birdMixer.position.z = Math.sin(-20 + 20*birdTime*2*Math.PI);
    birdTime += 0.01;
    if (birdTime > 10)
      birdTime = 0
    birdMixer.update(0.02);
  }
/*
  if (birdModel) {
    birdModel.position.x = Math.cos(-40*birdTime*2*Math.PI);
    
    birdModel.position.z = Math.sin(-20 + 20*birdTime*2*Math.PI);
    birdTime += 0.01;
    if (birdTime > 10)
      birdTime = 0
  }
*/
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


