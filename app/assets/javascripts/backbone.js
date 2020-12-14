//TODO
//Rails loads ALL js files in each controller. Not Controler-specific ones...
//
//
//
//

//Load when the DOM is ready or Canvas will be null
$(document).ready(function () {
  const canvas = document.querySelector("#cube");
  cubeRenderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  cubeRenderer.setPixelRatio(window.devicePixelRatio); //Retina
  cubeRenderer.setSize(canvas.width * 2, canvas.height * 2);
  cubeRenderer.outputEncoding = THREE.sRGBEncoding;

  //1.
  //Create a cubeCamera
  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  cubeCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  cubeCamera.position.z = 2;

  //2.
  //Create a Scene
  cubeScene = new THREE.Scene();

  //7.
  //Add a directional light slightly above and to the left of the cubeCamera
  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    cubeScene.add(light);
  }

  //3.
  //Create a box
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  //4.
  //Make a material
  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
  cube = new THREE.Mesh(geometry, material);
  console.log(JSON.stringify(cube));

  //5.
  //Add to Scene
  cubeScene.add(cube);
  cubeRenderer.render(cubeScene, cubeCamera);

  // Start - Get mouse position
  var posx = 0;
  var posy = 0;

  document.addEventListener("mousemove", onMouseMove, false);

  function onMouseMove(e) {
    posx = e.clientX;
    posy = e.clientY;
    App.room.speak("mouse location x:" + posy + " y:" + posx);
    //console.log(posy, posx)

    //6.
    //Simple rotation
    //Client X and Y swapped to make more sense and divided by 100 to stop superfast rotation

    //
    //Managed by room.coffee now
    //
    //cube.rotation.x = posy / 100;
    //cube.rotation.y = -posx / 100;
    //cubeRenderer.render(cubeScene, cubeCamera);
  }
  function getMouseX() {
    return posx;
  }
  function getMouseY() {
    return posy;
  }
  // End - Get mouse position
});
