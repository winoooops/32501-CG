
/*****************************************************
 * Load the modules 
 *****************************************************/
var camera  = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
var renderer = new THREE.WebGLRenderer( )
renderer.setSize( window.innerWidth, window.innerHeight )
var controls = new THREE.OrbitControls( camera );

var scene  = new THREE.Scene() 
var cubes = [] // craete an array of cubes
var n = 36




/***************************************************
 * Step 1: settting the playground
 ***************************************************/

var init = function () {
    camera.position.z = 15 
    camera.lookAt(0, 0, 1)
    window.addEventListener('resize', resizeWin )
    document.body.appendChild( renderer.domElement)
    render() 
}

var render = function () {
    renderer.render(scene, camera)
    controls.update() 
    requestAnimationFrame(render)
}

var createScene = function() {
    for(i = 0; i < n ; i++ ) {
        //all the trasformation are 4*4 matrix
        // var newCube = createCube(i)
        // scene.add( newCube )
        createCube(i)
    }
}

createScene() 

function createCube( index, cb ) {
    // all the rotation and translation are Matrix of size 4
    var rot = new THREE.Matrix4() 
    var rot2 = new THREE.Matrix4() 
    var sca = new THREE.Matrix4() // scale 
    var tra = new THREE.Matrix4() 
    var combined = new THREE.Matrix4() 

    // scala matrix to disrot the cube to tile elongated 
    sca.makeScale(0.5,3,1.5)
    rot2.makeRotationZ( index*(Math.PI/n) )
    tra.makeTranslation(10,0,0)
    rot.makeRotationY( index*(2*Math.PI/n ) )
    
    
    combined.multiply( rot )
    combined.multiply( tra )
    combined.multiply( rot2 )
    combined.multiply( sca )
    
    // create cube
    var geometry = new THREE.BoxGeometry(1,1,1)
    var material = new THREE.MeshBasicMaterial({
        color: 0x00ff00, 
        wireframe: true
    })
    cubes[index] = new THREE.Mesh(geometry, material)
    // apply the transformation 
    cubes[index].applyMatrix( combined )
    scene.add( cubes[index] )
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
