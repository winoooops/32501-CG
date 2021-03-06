
/*****************************************************
 * Load the modules 
 *****************************************************/
var camera  = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
var renderer = new THREE.WebGLRenderer( { antialias: true } )
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setPixelRatio( window.devicePixelRatio )

var scene  = new THREE.Scene() 
var controls = new THREE.PointerLockControls( camera ) 
controls.enabled = true // otherwise the camera can't be rotated 
scene.add( controls.getObject() ) // need to add FPS controls in the scene first 
var stats = { }
var bounce = { }
var ballMesh 


/***************************************************
 * Step 1: settting the playground
 ***************************************************/

var init = function () {

    // var start = new THREE.Vector3(0,0,0)
    camera.position.set(2,3,5) 
    // var desti = new THREE.Vector3(0,0,1)
    camera.lookAt( scene.position ) 

    var planeGeometry = new THREE.PlaneGeometry(5,10,5,10) // the ground
    var material = new THREE.MeshBasicMaterial({ 
        color: 0x00ff00, 
        wireframe: true
    })
    
    var groundMesh = new THREE.Mesh(planeGeometry, material)
    groundMesh.rotation.x = -Math.PI/2
    scene.add( groundMesh )


    // create the ball 

    var ballGeometry = new THREE.SphereGeometry(0.5,16,8)
    ballMesh = new THREE.Mesh(ballGeometry, material )

    scene.add(ballMesh)


    window.addEventListener('resize', resizeWin )

    stats = {
        velocity: new THREE.Vector3(), // 3D vector
        direction: new THREE.Vector3(), //3D vector
        prev: performance.now() // performance.now() method returns a DOMHighResTimeStamp, measured in milliseconds.
    }

    bounce = {
        clock: new THREE.Clock(), 
        time: 0, 
        delta: 0 
    }
    
    document.body.appendChild( renderer.domElement)
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





/*****************************************************************
 * Step 3: liten to user input 
 ****************************************************************/

var movements = {
    moveForward: false, 
    moveBackward: false, 
    moveLeft: false,
    moveRight: false 
}

var onKeyDown = function(e) {
    switch ( e.keyCode ) {

        case 38: // up
        case 87: // w
            movements.moveForward = true;
            console.log("moving forward...")
            break;

        case 37: // left
        case 65: // a
            movements.moveLeft = true;
            console.log("moving left")
            break;

        case 40: // down
        case 83: // s
            movements.moveBackward = true;
            console.log("moving backward")
            break;

        case 39: // right
        case 68: // d
            movements.moveRight = true;
            console.log("moving right")
            break;

    }
}

var onKeyUp = function(e) {
    switch( e.keyCode ) {

        case 38: // up
        case 87: // w
            movements.moveForward = false;
            console.log("moved forward");
            break;

        case 37: // left
        case 65: // a
            movements.moveLeft = false;
            console.log('moved left')
            break;

        case 40: // down
        case 83: // s
            movements.moveBackward = false;
            console.log("moved back")
            break;

        case 39: // right
        case 68: // d
            movements.moveRight = false;
            console.log('moved right')
            break;

    }
}

document.addEventListener('keydown', onKeyDown )
document.addEventListener('keyup', onKeyUp )


/***************************************************************
 * Step 4: animation based on user input 
 ***************************************************************/


var geiWoPa = function () {
    requestAnimationFrame( geiWoPa ) // recursively update itself
    // better than setInterval() for seveal reasons such as it wil automatically pauses in some cases 
    
    if( controls.enabled == true ) {
       updatePos() 
    }   
    

    bounce.delta = bounce.clock.getDelta() 
    bounce.time += bounce.delta 
    ballMesh.rotation.x = bounce.time *4 
    ballMesh.position.y = 0.5 + Math.abs( Math.sin( bounce.time*3)) * 2
    ballMesh.position.z = Math.cos(bounce.time) * 4  

    renderer.render( scene, camera )
    

}

var updatePos = function() {
    var time = performance.now();
    var delta =  ( time - stats.prev ) / 1000;

    stats.velocity.x -= stats.velocity.x * 10.0 * delta;
    // console.log( stats.velocity.x )
    stats.velocity.z -= stats.velocity.z * 10.0 * delta;

    // console.log( Number(movements.moveForward) )
    // Number(true) == 1, Number(false) == 0 
    stats.direction.z = Number( movements.moveForward ) - Number( movements.moveBackward );
    stats.direction.x = Number( movements.moveLeft ) - Number( movements.moveRight );
    stats.direction.normalize();

    if ( movements.moveForward || movements.moveBackward ) stats.velocity.z += stats.direction.z * 400.0 * delta; // I use + instead of -, or otherwise the movements are reversed, why????
    if ( movements.moveLeft || movements.moveRight ) stats.velocity.x += stats.direction.x * 400.0 * delta;

    controls.getObject().translateX( stats.velocity.x * delta );
    controls.getObject().translateZ( stats.velocity.z * delta );

    stats.prev = time;
}


/************************************************************
 * initiate and execute the movement function
 **********************************************************/
init() 
geiWoPa() 
