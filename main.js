import 'style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



// Main Screen Engine Set

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(20);
camera.position.setX(-3);

renderer.render(scene, camera);

// Declare to Torus

const geometry = new THREE.TorusGeometry(10, 3, 15, 100);

// Rotation Circle Color
const material = new THREE.MeshStandardMaterial({
    color: 0xDAA520
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Heads Light

const pointLight = new THREE.PointLight(0x89CFF0);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xE2DFD2);
scene.add(pointLight, ambientLight);

// Light and grid Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(200));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(400).fill().forEach(addStar);

// Main of Header Background pg

const spaceTexture = new THREE.TextureLoader().load('bagan-temple.jpg');
scene.background = spaceTexture;

// Dad n Me on Kalaw HailTop Hotel Memorable.

const akkTexture = new THREE.TextureLoader().load('dnme.JPG');

const akk = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: akkTexture }));

scene.add(akk);

// FullMoon Cocktails

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

//Box in bird 
const birdTexture = new THREE.TextureLoader().load('bird.jpg');
const bird = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: birdTexture }));

scene.add(bird);
bird.position.z = 20;
bird.position.setX(-10);
// Box seen bird end


// Mr Robot in Box
const robotTexture = new THREE.TextureLoader().load('bagan-monk-960x640.jpg');
const robot = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({ map: robotTexture }));

scene.add(robot);
robot.position.z = 10;
robot.position.setX(-1);

//Robot End

//ak School life here
const logoTexture = new THREE.TextureLoader().load('akschool.jpg');
const logo = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 2), new THREE.MeshBasicMaterial({ map: logoTexture }));

scene.add(logo);
logo.position.z = 20;
logo.position.setX(3);

// End mm logo

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
        birdMap: birdTexture,
        robotMap: robotTexture,
        logoMap: logoTexture
    })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

// Ar Kar Kyaw's  position

akk.position.z = -5;
akk.position.x = 2;

// When Scroll Animation

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    akk.rotation.y += 0.01;
    akk.rotation.z += 0.01;

    robot.rotation.y += 0.01;
    robot.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

//Test mp3 sounds
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// create a global audio source
const sound = new THREE.Audio(listener);

// Load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load('SetMeFree.mp4', function(buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(3.0);
    sound.play();
});

// Sketch Animation with Loop

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    moon.rotation.x += 0.005;

    // controls.update();

    renderer.render(scene, camera);
}
//Invoke to Ui
animate();