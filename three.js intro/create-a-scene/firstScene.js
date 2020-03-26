
// init the scene and camerea
const scene = new THREE.Scene()
// Three.js comes with many cameras, but only use PersectiveCamera this time
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// by default, the camerea.position should be (0,0,0)


// !!!!!!!!!!!!!
// makes no difference? 

// camera.position.set(0, 0, 15)
// camera.lookAt(0, 5, 15)


/************
 * PerspectiveCamera attributes
 * FOV
 * aspect ratio 
 * the near clipping plane 
 * the far clipping plane
 * normally the vision should be somewhere between 0.1~1000
 ***************/
// init and pre-render the renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
/**********
 * renderer.setSize attributes
 * width of the area 
 * height of the area 
 * if there's no third attrribute given(default is true), then the renderer will render the size based on the ratio I set for height and width
 * if there's a false as the third attribute, then the renderer will render the same size but differnt resolution
 */
document.body.appendChild(renderer.domElement)

// create and add the cube 
const geometry = new THREE.BoxGeometry() // contains all the points and fill of the cube 
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
let cube = new THREE.Mesh(geometry, material) // Mesh takes a geometry and applies a material into it
scene.add(cube)
cube.position.set(1, 1, 1)

//create and add a tetrahedron 
const tetraGeometry = new THREE.TetrahedronGeometry()
const tetraMaterial = new THREE.MeshBasicMaterial({ color: 0xff8c69 })

let tetrahedron = new THREE.Mesh(tetraGeometry, material)

scene.add(tetrahedron)
tetrahedron.position.set(-1, 1, 1)

// by default, the object is added to the (0,0,0) coordinates
camera.position.z = 5 // or camera.position.set(0,0,5)
camera.lookAt(0, 0, 1)

//render the scene 
/******
 * Create a loop that causes the renderer to draw the scene everytime the screen is refreshed(60hz by default)
 */
function animate() {
    renderer.render(scene, camera) // acturally render the scene with objects
    rotation()
    requestAnimationFrame(animate) // better than setInterval() for seveal reasons such as it wil automatically pauses when the 
}


// const controls = new THREE.OrbitControls(camera, renderer.domElement)

function rotation()  {
    tetrahedron.rotation.x += 0.01
    tetrahedron.rotation.y += 0.01
    cube.rotation.x -= 0.05
}


function resizeWin() {
    // 1. reset the renderer everytime being called
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 2 camera listen the aspect ratio change
    camera.aspect = window.innerWidth / window.innerHeight 
    // 3 update 
    camera.updateProjectionMatrix() 
    // 4 rerender 
    renderer.render(scene, camera)
}
window.addEventListener('resize', resizeWin )


animate() 