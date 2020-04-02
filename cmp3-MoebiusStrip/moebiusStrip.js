
/*****************************************************
 * Load the modules 
 *****************************************************/
var camera  = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
var renderer = new THREE.WebGLRenderer( )
renderer.setSize( window.innerWidth, window.innerHeight )
var scene  = new THREE.Scene() 

/***************************************************
 * Step 1: settting the playground
 ***************************************************/

var init = function () {
    var geometry = new THREE.BoxGeometry()
    var material = new THREE.MeshBasicMaterial({ 
        color: 0x00ff00, 
        wireframe: true
    })
    var cubeMesh = new THREE.Mesh(geometry, material)
    cubeMesh.position.set(1, 1, 1)
    scene.add( cubeMesh )
    camera.position.z = 5 
    camera.lookAt(0, 0, 1)

    window.addEventListener('resize', resizeWin )

    document.body.appendChild( renderer.domElement)
    render() 
}

var render = function () {
    renderer.render(scene, camera)
}


/***************************************
 * Step2: listen to resize event on window
 ***************************************/
var resizeWin = function( ) {
    renderer.setSize( window.innerWidth, window.innerHeight) 
    camera.aspect = window.innerWidth / window.innerHeight 
    camera.updateProjectionMatrix() 
    renderer.render( scene, camera )
}

/************************************************************
 * initiate and execute the movement function
 **********************************************************/
init() 
