import * as THREE from '../resources/threejs/build/three.module.js';
import { GUI } from '../resources/threejs/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from '../resources/threejs/examples/jsm/controls/OrbitControls.js';

const params = {
	pt1: {
		raio: 0.8
	},
	pt2: {
		raio: 0.8
	},
	pt3: {
		raio: 0.8,
		voltas: 3
	}
}

let w1 = document.getElementById('WebGL-output1'), w2 = document.getElementById('WebGL-output2'), w3 = document.getElementById('WebGL-output3')
let renderer1, renderer2, renderer3, scene1, scene2, scene3, axis = new THREE.AxesHelper()
let camera1 = new THREE.OrthographicCamera(-1.0, 1.0, 1.0, -1.0, -1.0, 1.0), camera2 = new THREE.OrthographicCamera(-1.0, 1.0, 1.0, -1.0, -1.0, 1.0), camera3 = new THREE.OrthographicCamera(-1.0, 1.0, 1.0, -1.0, -1.0, 1.0) 
let linha1 = new THREE.Line(), linha2 = new THREE.Line(), linha3 = new THREE.Line()

function main() {

	renderer1 = new THREE.WebGLRenderer()
	
	renderer1.setClearColor(new THREE.Color(0.0, 0.0, 0.0))
	
	renderer1.setSize(500, 500)
	
	w1.appendChild(renderer1.domElement)
	
	scene1 = new THREE.Scene()

	scene1.add(camera1)
	
    scene1.add(axis)

	let [vertices1, cores1] = criar(0.5)

	let geometry1 = new THREE.BufferGeometry().setFromPoints(vertices1)
	geometry1.setAttribute('color', new THREE.Float32BufferAttribute(cores1, 3))

	let material1 = new THREE.LineBasicMaterial({vertexColors: true})
	linha1.geometry = geometry1
	linha1.material = material1

	scene1.add(linha1)
		
	renderer1.clear()
	renderer1.render(scene1, camera1)
 
	////////////////////////////////////////////////////////

	renderer2 = new THREE.WebGLRenderer()

	renderer2.setClearColor(new THREE.Color(0.0, 0.0, 0.0))

	renderer2.setSize(500, 500)

	w2.appendChild(renderer2.domElement)

	scene2 = new THREE.Scene()

	scene2.add(camera2)
	
    scene2.add(axis)

	let [vertices2, cores2] = criar(0.5, true)

	let geometry2 = new THREE.BufferGeometry().setFromPoints(vertices2)
	geometry2.setAttribute('color', new THREE.Float32BufferAttribute(cores2, 3))

	let material2 = new THREE.LineBasicMaterial({vertexColors: true})
	linha2.geometry = geometry2
	linha2.material = material2

	scene2.add(linha2)
		
	renderer2.clear()
	renderer2.render(scene2, camera2)

	////////////////////////////////////////////////////////

	renderer3 = new THREE.WebGLRenderer()

	renderer3.setClearColor(new THREE.Color(0.0, 0.0, 0.0))

	renderer3.setSize(500, 500)

	w3.appendChild(renderer3.domElement)

	const controls = new OrbitControls(camera3, renderer3.domElement);
	controls.enableRotate = false
	controls.enablePan = false
	controls.enableZoom = true
	controls.minZoom = 1
	controls.zoomSpeed = 10

	scene3 = new THREE.Scene()

	scene3.add(camera3)
	
    scene3.add(axis)

	let [vertices3, cores3] = criar(0.5, true, 3)

	let geometry3 = new THREE.BufferGeometry().setFromPoints(vertices3)
	geometry3.setAttribute('color', new THREE.Float32BufferAttribute(cores3, 3))

	let material3 = new THREE.LineBasicMaterial({vertexColors: true})
	linha3.geometry = geometry3
	linha3.material = material3
	scene3.add(linha3)
		
	renderer3.clear()
	renderer3.render(scene3, camera3)

	let gui = new GUI()
	const parte1 = gui.addFolder('Parte 1')
	parte1.add(params.pt1, 'raio').min(0.01).max(1)
	const parte2 = gui.addFolder('Parte 2')
	parte2.add(params.pt2, 'raio').min(0.01).max(1)
	const parte3 = gui.addFolder('Parte 3')
	parte3.add(params.pt3, 'raio').min(0.01).max(1)
	parte3.add(params.pt3, 'voltas').step(1).min(1).max(100)
	gui.hide()

	let btn1 = document.getElementById('btn1'), btn2 = document.getElementById('btn2'), btn3 = document.getElementById('btn3')
	btn1.addEventListener('click', function() {
		if (btn1.getAttribute('aria-expanded') == 'false') {
			parte2.hide()
			parte3.hide()
			gui.show()
			parte1.show()
			parte1.open()
		}
		else {
			gui.hide()
		}
	})
	btn2.addEventListener('click', function() {
		if (btn2.getAttribute('aria-expanded') == 'false') {
			parte1.hide()
			parte3.hide()
			gui.show()
			parte2.show()
			parte2.open()
		}
		else {
			gui.hide()
		}
	})
	btn3.addEventListener('click', function() {
		if (btn3.getAttribute('aria-expanded') == 'false') {
			parte1.hide()
			parte2.hide()
			gui.show()
			parte3.show()
			parte3.open()
		}
		else {
			gui.hide()
		}
	})
}

main()
animate()

function animate() {
	requestAnimationFrame(animate)

	let [vertices1, cores1] = criar(params.pt1.raio)
	linha1.geometry.setFromPoints(vertices1)
	linha1.geometry.setAttribute('color', new THREE.Float32BufferAttribute(cores1, 3))
	scene1.add(axis)
	renderer1.clear()
	renderer1.render(scene1, camera1)

	let [vertices2, cores2] = criar(params.pt2.raio, true)
	linha2.geometry.setFromPoints(vertices2)
	linha2.geometry.setAttribute('color', new THREE.Float32BufferAttribute(cores2, 3))
	scene2.add(axis)
	renderer2.clear()
	renderer2.render(scene2, camera2)	

	let [vertices3, cores3] = criar(params.pt3.raio, true, params.pt3.voltas)
	linha3.geometry.setFromPoints(vertices3)
	linha3.geometry.setAttribute('color', new THREE.Float32BufferAttribute(cores3, 3))
	scene3.add(axis)
	renderer3.clear()
	renderer3.render(scene3, camera3)

}

function criar(raio, espiral = false, voltas = 1) {
	if (espiral) {
		const vertices = [], cores = []
		let m = 0
		while (m < voltas) {
			for(let i = 0; i <= 360; i++){
				vertices.push(new THREE.Vector3(Math.cos(i*(Math.PI/180))*raio / (i/360 + 1), Math.sin(i*(Math.PI/180))*raio / (i/360 + 1),  0.0))
				cores.push((i + 360 * m)/(360 * voltas)*2, 1 - (i + 360 * m)/(360 * voltas)*2, (i + 360 * m)/(360 * voltas)/2)
			}
			raio = raio / 2
			m++
		}

		return [vertices, cores]
	}
	else {
		const vertices = [], cores = []
		for(let i = 0; i <= 360; i++){
			vertices.push(new THREE.Vector3(Math.cos(i*(Math.PI/180))*raio, Math.sin(i*(Math.PI/180))*raio,  0.0))
			cores.push(i/360*2, 1 - i/360*2, i/360/2)
		}

		return [vertices, cores]
	}
}