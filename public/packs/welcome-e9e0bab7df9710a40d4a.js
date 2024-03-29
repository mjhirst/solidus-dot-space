/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/*!*****************************************!*\
  !*** ./app/javascript/packs/welcome.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

//Load when the DOM is ready or Canvas will be null
$(document).ready(function () {

  // - - - - - - - - - - - - - - - - - - - -
  //
  // START ThreeJS
  //
  // - - - - - - - - - - - - - - - - - - - -

  const canvas = document.querySelector('#c');
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

  const fov = 38; //45
  const aspect = 2; // the canvas default
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
    const skyColor = 0xFFFFFF; // light blue
    const groundColor = 0xFFFFFF; // brownish orange
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

  //Load OBJ
  obj = new THREE.Object3D();
  {
    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('flat.mtl', mtlParseResult => {
      const objLoader = new OBJLoader2();
      const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
      objLoader.addMaterials(materials);
      objLoader.load('flat.obj', root => {
        obj = root;
        scene.add(root);
      });
    });
  }

  //Call animation function
  requestAnimationFrame(render);

  //Animate function
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

  //Use Render to orbit slowly
  function render(time) {
    time *= 0.0001; // convert time to seconds
    obj.rotation.y = time;
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    //Call function inside and loop forever
    requestAnimationFrame(render);
  }

  // - - - - - - - - - - - - - - - - - - - -
  //
  // END ThreeJS
  //
  // - - - - - - - - - - - - - - - - - - - -

  // - - - - - - - - - - - - - - - - - - - -
  //
  // START Get Mouse Position
  //
  // - - - - - - - - - - - - - - - - - - - -
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

  // - - - - - - - - - - - - - - - - - - - -
  //
  // END Get Mouse Position
  //
  // - - - - - - - - - - - - - - - - - - - -

  // - - - - - - - - - - - - - - - - - - - -
  //
  // START D3JS
  //
  // - - - - - - - - - - - - - - - - - - - -
  let data = [{
    "Complexity": 10,
    "Cost": 2,
    "Speed": 3,
    "Space": 4,
    "ROI": 5
  }, {
    "Complexity": 5,
    "Cost": 4,
    "Speed": 3,
    "Space": 2,
    "ROI": 10
  }, {
    "Complexity": 3,
    "Cost": 5,
    "Speed": 3,
    "Space": 10,
    "ROI": 4
  }];

  function startChart(data) {
    //Create list of features from the data
    let features = [];
    for (var key in data[0]) features.push(key);

    //Connect data and features
    for (var i = 0; i < features.length; i++) {
      var point = {};
      features.forEach(f => point[f] = data[0][i]);
    }

    //https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart
    const d3canvas = document.querySelector('#chart-container');
    let svg = d3.select(d3canvas).append("svg").attr("width", d3canvas.clientWidth).attr("height", d3canvas.clientHeight);

    //create the scale
    let radialScale = d3.scaleLinear().domain([0, 10]) //max number, change data position helper line/label_coords
    .range([0, 125]); //Edit this for the size too
    let ticks = [2, 4, 6, 8, 10];

    //create the axes
    ticks.forEach(t => svg.append("circle").attr("cx", d3canvas.clientWidth / 2).attr("cy", d3canvas.clientHeight / 2).attr("fill", "none").attr("stroke", "#747679").attr("r", radialScale(t)));

    function angleToCoordinate(angle, value) {
      let x = Math.cos(angle) * radialScale(value);
      let y = Math.sin(angle) * radialScale(value);
      return { "x": d3canvas.clientWidth / 2 + x, "y": d3canvas.clientHeight / 2 - y };
    }

    //data position helper
    for (var i = 0; i < features.length; i++) {
      let ft_name = features[i];
      let angle = Math.PI / 2 + 2 * Math.PI * i / features.length;
      let line_coordinate = angleToCoordinate(angle, 10);
      let label_coordinate = angleToCoordinate(angle, 10.5);

      //draw axis line
      svg.append("line").attr("x1", d3canvas.clientWidth / 2).attr("y1", d3canvas.clientHeight / 2).attr("x2", line_coordinate.x).attr("y2", line_coordinate.y).attr("stroke", "#747679");

      //draw axis label
      svg.append("text").attr("x", label_coordinate.x).attr("y", label_coordinate.y).attr("fill", "#747679").text(ft_name);
    }

    let line = d3.line().x(d => d.x).y(d => d.y);
    let colors = ["#FA8C00", "#40FD87", "#D074FF"];

    function getPathCoordinates(data_point) {
      let coordinates = [];
      for (var i = 0; i < features.length; i++) {
        let ft_name = features[i];
        let angle = Math.PI / 2 + 2 * Math.PI * i / features.length;
        coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
      }
      return coordinates;
    }

    console.log(data.length);

    for (var i = 0; i < data.length; i++) {
      let d = data[i];

      console.log(d);
      console.log("CALL");
      let color = colors[i];
      let coordinates = getPathCoordinates(d);

      //draw the path element
      svg.append("path").datum(coordinates).attr("d", line).attr("stroke-width", 3).attr("stroke", color).attr("fill", color).attr("stroke-opacity", 1).attr("opacity", 0.66);
    }
  };

  // Call
  startChart(data);

  // - - - - - - - - - - - - - - - - - - - -
  //
  // END D3JS
  //
  // - - - - - - - - - - - - - - - - - - - -
});

// - - - - - - - - - - - - - - - - - - - -
//
// END Document Ready
//
// - - - - - - - - - - - - - - - - - - - -

//Start Button Controls
function myFunction() {
  console.log("Hurrag!");
  data = [{
    "Complexity": 10,
    "Cost": 10,
    "Speed": 10,
    "Space": 10,
    "ROI": 10
  }];
  startChart(data);
}

/***/ })

/******/ });
//# sourceMappingURL=welcome-e9e0bab7df9710a40d4a.js.map