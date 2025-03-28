// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // to control our geometry
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';  // to load 3D models


// ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~
let scene, camera, renderer, cube, capGeometry, capMaterial, capTexture, capCamera, capsule;

function init() {
    scene = new THREE.Scene();

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(1,1,5);
    scene.add(light);

    const helper = new THREE.DirectionalLight(light, 5);
    scene.add(helper);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    capCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader();
    loader.load('asset/alien_only_animation.gltf', function (gltf){
        const alien = gltf.scene;
        scene.add(alien);
        alien.scale.set(1,1,1);
    });
    
    // BoxGeometry
    const geometry = new THREE.BoxGeometry( 2, 2, 2 ); 
    const texture = new THREE.TextureLoader().load('textures/grasslight-big.jpg')
    const material = new THREE.MeshBasicMaterial({map: texture});
    cube = new THREE.Mesh(geometry, material); 
    scene.add(cube);
    
    camera.position.z = 5;
    camera.position.x = 5;

    // CylinderGeometry
    capGeometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 ); 
    capTexture = new THREE.TextureLoader().load('textures/pipe-texture.jpg')
    capMaterial = new THREE.MeshBasicMaterial({map: capTexture});
    capsule = new THREE.Mesh( capGeometry, capMaterial );
    scene.add(capsule);

    capCamera.position.z = 5;
    capCamera.position.x = 7;

}

function animate() {
    requestAnimationFrame(animate);

    // cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // capsule
    capsule.rotation.x += 0.05;
    capsule.rotation.y += 0.05;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);



init();
animate();



// →→→→→→ Follow next steps in tutorial: 
// // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene



