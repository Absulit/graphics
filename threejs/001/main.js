var scene,
    camera,
    renderer,
    light,
    stereoEnabled = false,
    effect,
    effectCache,
    noSleep,
    clock = new THREE.Clock(),
    delta;

var groundMirror;

            var controls;
            var effect;

var resizeViewport = function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    if(stereoEnabled){
        effect.setSize(window.innerWidth, window.innerHeight);
    }else{
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

var toggleStereo = function(){
    stereoEnabled = !stereoEnabled;
    if(stereoEnabled){
        if(effectCache){
            effect = effectCache
        }else{
            effect = new THREE.StereoEffect(renderer);
            effect.eyeSeparation = 1;
            effectCache = effect;
        }
    }else{
        effect = null;
    }
    resizeViewport();
}

function init() {
    if ( WEBVR.isLatestAvailable() === false ) {

        document.body.appendChild( WEBVR.getMessage() );

    }


    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    if(stereoEnabled){
        effect = new THREE.StereoEffect(renderer);
        effect.eyeSeparation = 1;

        noSleep = new NoSleep();
    }

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1);
    camera.position.set(0, 0, -6);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    /*
        My code
    */
            controls = new THREE.VRControls( camera );
            effect = new THREE.VREffect( renderer );

            if ( WEBVR.isAvailable() === true ) {

                document.body.appendChild( WEBVR.getButton( effect ) );

            }



    ABSULIT.skysphere.init('office.jpg');

    var path = "textures/cube/SwedishRoyalCastle/";
    var format = '.jpg';
    var urls = [
            path + 'px' + format, path + 'nx' + format,
            path + 'py' + format, path + 'ny' + format,
            path + 'pz' + format, path + 'nz' + format
        ];



    var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
    reflectionCube.format = THREE.RGBFormat;

    var refractionCube = THREE.ImageUtils.loadTextureCube( urls );
    refractionCube.mapping = THREE.CubeRefractionMapping;
    refractionCube.format = THREE.RGBFormat;

    //var cubeMaterial = new THREE.MeshPhongMaterial( { color: 0x000000, specular:0xaa0000, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.25 } );
    //var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xff6600, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.3 } );
    //var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xffee00, envMap: refractionCube, refractionRatio: 0.95 } );
    var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: reflectionCube} );





    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshLambertMaterial( {color: 0xff0000, wireframe:false} );


    cube = new THREE.Mesh( geometry, cubeMaterial );
    cube.position.z = 5;
    scene.add( cube );

    light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );

    scene.add( light );


    var geometry = new THREE.PlaneBufferGeometry( 5, 5, 32 );
    //var material = new THREE.MeshLambertMaterial( {color: 0xcccccc, side: THREE.DoubleSide} );

    groundMirror = new THREE.Mirror( renderer, camera, { clipBias: 0.003, textureWidth: window.innerWidth, textureHeight: window.innerHeight, color: 0x777777 } );

    var plane = new THREE.Mesh( geometry, groundMirror.material );
    plane.add( groundMirror );
    plane.rotation.x = Math.PI/2;
    plane.position.y = -2;
    scene.add( plane );







    /*
        - My code ends
    */
    window.addEventListener('click',function(){
        noSleep.enable();
        fullscreen();
    });

    window.addEventListener( 'resize', resizeViewport, false );
    document.body.appendChild( renderer.domElement );

    resizeViewport();
}

function update() {
    requestAnimationFrame(update);

    /*
        My code
    */
    delta = clock.getDelta();

    cube.rotation.x += (.01*60) * delta;
    cube.rotation.y += (.01*60) * delta;

    var scale = 1 + Math.abs(Math.sin(cube.rotation.y));
    //console.log(scale);
    cube.scale.set(scale,scale,scale);

    groundMirror.render();

    /*
        - My code ends
    */

    /*if(stereoEnabled){
        effect.render(scene, camera);
    }else{
        renderer.render(scene, camera);
    }*/

                controls.update();

                effect.render( scene, camera );
}

function fullscreen() {
    console.log('---- fullscreen');
  if (document.body.requestFullscreen) {
    document.body.requestFullscreen();
  } else if (renderer.domElement.msRequestFullscreen) {
    window.msRequestFullscreen();
  } else if (renderer.domElement.mozRequestFullScreen) {
    document.body.mozRequestFullScreen();
  } else if (renderer.domElement.webkitRequestFullscreen) {
    document.body.webkitRequestFullscreen();
  }
}

init();
update();
