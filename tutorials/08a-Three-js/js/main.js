// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // to control our geometry
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';  // to load 3D models


// ~~~~~~~~~~~~~~~~Declare Global Variables~~~~~~~~~~~~~~~~
let scene, camera, renderer, ball, capGeometry, capMaterial, capTexture, capCamera, capsule, alien, mixer;

// ~~~~~~~~~~~~~~~~Animation Variable~~~~~~~~~~~~~~~~

let actionFlip;

// ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x015220);

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
        alien = gltf.scene;
        scene.add(alien);
        mixer = new THREE.AnimationMixer(alien);
        const clips = gltf.animations;

        const clipFlip = THREE.AnimationClip.findByName(clips, 'BACKFLIP');
        actionFlip = mixer.clipAction(clipFlip);
        // actionFlip.play();

        alien.scale.set(.8,.8,.8);
        alien.position.y = 0;
        alien.position.x = 0;
        alien.position.z = -100;
    });
    
    // BoxGeometry
    const geometry = new THREE.SphereGeometry(1, 32, 16); 
    const texture = new THREE.TextureLoader().load('textures/grasslight-big.jpg')
    const material = new THREE.MeshBasicMaterial({map: texture});
    ball = new THREE.Mesh(geometry, material); 
    scene.add(ball);
    
    camera.position.z = 15;
    camera.position.x = 0;
    camera.position.y = 0;

    // // CylinderGeometry
    // capGeometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 ); 
    // capTexture = new THREE.TextureLoader().load('textures/pipe-texture.jpg')
    // capMaterial = new THREE.MeshBasicMaterial({map: capTexture});
    // capsule = new THREE.Mesh( capGeometry, capMaterial );
    // scene.add(capsule);

    // capCamera.position.z = 5;
    // capCamera.position.x = 10;

}

const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);

    // ball
    ball.rotation.x += 0.01;
    ball.rotation.y += 0.01;

    ball.position.y = -1;

    ball.position.x = Math.sin(Date.now() / 5000) * 2;
    ball.position.y = Math.sin(Date.now() / 3000) * 2;
    ball.position.z = Math.sin(Date.now() / 4000) * 2;
    // console.log(ball.position.x);

    // // capsule
    // capsule.rotation.x += 0.05;
    // capsule.rotation.y += 0.05;

    // alien
    if(alien){
        // alien.rotation.x += 0.001;
        // alien.rotation.y += 0.001;
        // alien.rotation.y = Math.sin(Date.now() / 4000) * 2;
        alien.position.z = 15;
    }

    if(mixer)
        mixer.update(clock.getDelta());
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// EVENT LISTENER

let mouseIsDown = false;

document.querySelector("body").addEventListener("mousedown", () => {
    actionFlip.play();
    actionFlip.paused = false;
    mouseIsDown = true;
    console.log("mousedown");
})

document.querySelector("body").addEventListener("mouseup", () => {
    mouseIsDown = false;
    actionFlip.paused = true;
    console.log("mouseup");
})

document.querySelector("body").addEventListener("mousemove", () => {
    if(mouseIsDown) {
        console.log("mousemove");
        ball.rotation.x += .5;
    }
})




init();
animate();



// →→→→→→ Follow next steps in tutorial: 
// // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene



