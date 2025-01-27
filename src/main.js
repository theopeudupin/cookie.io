import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 3;
const canvas = document.getElementById("canvathree");

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
renderer.setClearColor( 0xffffff, 0);
document.getElementById('three').appendChild( renderer.domElement );

// Windows Resizing
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

// Rotate with mouse
var mouseDown = false,
    mouseX = 0,
    mouseY = 0;

function onMouseMove(evt) {
    if (!mouseDown) {
        return;
    }

    evt.preventDefault();

    var deltaX = evt.clientX - mouseX;
    var deltaY = evt.clientY - mouseY;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    rotateScene(deltaX, deltaY);
}

function onMouseDown(evt) {
    evt.preventDefault();
    mouseDown = true;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
}

function onMouseUp(evt) {
    evt.preventDefault();
    mouseDown = false;
}

function onMouseWheel(evt){
	evt.preventDefault();
	zoomScene(evt.deltaY);
}

function addMouseHandler(canvas) {
    canvas.addEventListener('mousemove', function (e) {
        onMouseMove(e);
    }, false);
    canvas.addEventListener('mousedown', function (e) {
        onMouseDown(e);
    }, false);
    canvas.addEventListener('mouseup', function (e) {
        onMouseUp(e);
    }, false);
	canvas.addEventListener('wheel', function (e) {
        onMouseWheel(e);
    }, false);
}

function rotateScene(deltaX, deltaY) {
    scene.rotation.y += deltaX / 100;
    scene.rotation.x += deltaY / 100;
}
function zoomScene(deltaY) {
	scene.position.z -= deltaY / 200;
	document.getElementById('wheelDeltaY').innerHTML = deltaY.toFixed(6);
}
addMouseHandler(canvas);

// Add Cookie
var cookie;
function addCookie() {
	const loader = new GLTFLoader();
	loader.load( 'cookie/scene.gltf', function ( gltf ) {
		cookie = gltf.scene;
		scene.add(cookie);
	}, undefined, function ( error ) {
		console.error( error );
	} );
}
addCookie();

function animate() {

	if(cookie && !mouseDown) {

		cookie.rotation.x += 0.005;
		cookie.rotation.y += 0.01;

		document.getElementById('cookieRotationX').innerHTML = cookie.rotation.x.toFixed(6);
		document.getElementById('cookieRotationY').innerHTML = cookie.rotation.y.toFixed(6);
	}

	document.getElementById('sceneRotationX').innerHTML = scene.rotation.x.toFixed(6);
	document.getElementById('sceneRotationY').innerHTML = scene.rotation.y.toFixed(6);
	document.getElementById('scenePositionY').innerHTML = scene.position.z.toFixed(6);

	renderer.render( scene, camera );
}
