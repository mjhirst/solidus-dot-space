//Load when the DOM is ready or Canvas will be null
$(document).on("turbolinks:load", function () {
  const canvas = document.querySelector("#c");
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio); //Retina
  renderer.setSize(canvas.width, canvas.height);
  renderer.outputEncoding = THREE.sRGBEncoding;

  //1.
  //Create a camera
  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  //2.
  //Create a Scene
  scene = new THREE.Scene();

  //7.
  //Add a directional light slightly above and to the left of the camera
  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  //Load the ObjLoader
  let loader = new THREE.OBJLoader();
  loader.load("house.obj", (root) => {
    scene.add(root);
  });

  //3.
  //Create a box
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  //4.
  //Make a material
  const material = new THREE.MeshPhongMaterial({ color: 0x010101 });
  cube = new THREE.Mesh(geometry, material);
  //console.log(JSON.stringify(cube));

  //5.
  //Add to Scene
  scene.add(cube);
  renderer.render(scene, camera);

  //6.
  //Orbit Controls for nicer handling
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;
  controls.autoRotate = true;

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
    //renderer.render(scene, camera);
  }
  function getMouseX() {
    return posx;
  }
  function getMouseY() {
    return posy;
  }
  // End - Get mouse position
});
