//Load when the DOM is ready or Canvas will be null
$(document).on("turbolinks:load", function () {
    const canvas = document.querySelector('#c');
    renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true});

    const fov = 38; //45
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 20);
  
    const controls = new THREE.OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.enableZoom = false;
    controls.update();
  
    const scene = new THREE.Scene();
  
    {
      const skyColor = 0xFFFFFF;  // light blue
      const groundColor = 0xFFFFFF;  // brownish orange
      const intensity = 1;
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      scene.add(light);
    }
  
    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(5, 10, 2);
      scene.add(light);
      scene.add(light.target);
    }
  
    obj = new THREE.Object3D();
    {
      const mtlLoader = new THREE.MTLLoader();
      mtlLoader.load('solidus_launch.mtl', (mtlParseResult) => {
        const objLoader = new OBJLoader2();
        const materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
        objLoader.addMaterials(materials);
        objLoader.load('solidus_launch.obj', (root) => {
          obj = root;
          scene.add(obj);
        });
      });
    }
    
    requestAnimationFrame(render);
  
    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth * 2;
      const height = canvas.clientHeight * 2;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }
  
    function render(time) {
      time *= 0.0001;  // convert time to seconds
      obj.rotation.y = time;
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
  
      renderer.render(scene, camera);
  
      requestAnimationFrame(render);
    }
  
    requestAnimationFrame(render);
  });
  