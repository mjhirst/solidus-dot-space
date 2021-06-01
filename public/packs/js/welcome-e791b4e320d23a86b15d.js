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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/welcome.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/welcome.js":
/*!*****************************************!*\
  !*** ./app/javascript/packs/welcome.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//Load when the DOM is ready or Canvas will be null
$(document).ready(function () {
  // - - - - - - - - - - - - - - - - - - - -
  //
  // START ThreeJS
  //
  // - - - - - - - - - - - - - - - - - - - -
  var canvas = document.querySelector('#c');
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  var fov = 38; //45

  var aspect = 2; // the canvas default

  var near = 0.1;
  var far = 100;
  var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);
  var controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.enableZoom = false;
  controls.update();
  var scene = new THREE.Scene();
  {
    var skyColor = 0xFFFFFF; // light blue

    var groundColor = 0xFFFFFF; // brownish orange

    var intensity = 1;
    var light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }
  {
    var color = 0xFFFFFF;
    var _intensity = 1;

    var _light = new THREE.DirectionalLight(color, _intensity);

    _light.position.set(5, 10, 2);

    scene.add(_light);
    scene.add(_light.target);
  } //Load OBJ

  obj = new THREE.Object3D();
  {
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('flat.mtl', function (mtlParseResult) {
      var objLoader = new OBJLoader2();
      var materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
      objLoader.addMaterials(materials);
      objLoader.load('flat.obj', function (root) {
        obj = root;
        scene.add(root);
      });
    });
  } //Call animation function

  requestAnimationFrame(render); //Animate function

  function resizeRendererToDisplaySize(renderer) {
    var canvas = renderer.domElement;
    var width = canvas.clientWidth * 2;
    var height = canvas.clientHeight * 2;
    var needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  } //Use Render to orbit slowly


  function render(time) {
    time *= 0.0001; // convert time to seconds

    obj.rotation.y = time;

    if (resizeRendererToDisplaySize(renderer)) {
      var _canvas = renderer.domElement;
      camera.aspect = _canvas.clientWidth / _canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera); //Call function inside and loop forever

    requestAnimationFrame(render);
  } // - - - - - - - - - - - - - - - - - - - -
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
    App.room.speak("mouse location x:" + posy + " y:" + posx); //console.log(posy, posx)
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
  } // - - - - - - - - - - - - - - - - - - - -
  //
  // END Get Mouse Position
  //
  // - - - - - - - - - - - - - - - - - - - -
  // - - - - - - - - - - - - - - - - - - - -
  //
  // START D3JS
  //
  // - - - - - - - - - - - - - - - - - - - -


  var data = [{
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
    var features = [];

    for (var key in data[0]) {
      features.push(key);
    } //Connect data and features


    for (var i = 0; i < features.length; i++) {
      var point = {};
      features.forEach(function (f) {
        return point[f] = data[0][i];
      });
    } //https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart


    var d3canvas = document.querySelector('#chart-container');
    var svg = d3.select(d3canvas).append("svg").attr("width", d3canvas.clientWidth).attr("height", d3canvas.clientHeight); //create the scale

    var radialScale = d3.scaleLinear().domain([0, 10]) //max number, change data position helper line/label_coords
    .range([0, 125]); //Edit this for the size too

    var ticks = [2, 4, 6, 8, 10]; //create the axes

    ticks.forEach(function (t) {
      return svg.append("circle").attr("cx", d3canvas.clientWidth / 2).attr("cy", d3canvas.clientHeight / 2).attr("fill", "none").attr("stroke", "#747679").attr("r", radialScale(t));
    });

    function angleToCoordinate(angle, value) {
      var x = Math.cos(angle) * radialScale(value);
      var y = Math.sin(angle) * radialScale(value);
      return {
        "x": d3canvas.clientWidth / 2 + x,
        "y": d3canvas.clientHeight / 2 - y
      };
    } //data position helper


    for (var i = 0; i < features.length; i++) {
      var ft_name = features[i];
      var angle = Math.PI / 2 + 2 * Math.PI * i / features.length;
      var line_coordinate = angleToCoordinate(angle, 10);
      var label_coordinate = angleToCoordinate(angle, 10.5); //draw axis line

      svg.append("line").attr("x1", d3canvas.clientWidth / 2).attr("y1", d3canvas.clientHeight / 2).attr("x2", line_coordinate.x).attr("y2", line_coordinate.y).attr("stroke", "#747679"); //draw axis label

      svg.append("text").attr("x", label_coordinate.x).attr("y", label_coordinate.y).attr("fill", "#747679").text(ft_name);
    }

    var line = d3.line().x(function (d) {
      return d.x;
    }).y(function (d) {
      return d.y;
    });
    var colors = ["#FA8C00", "#40FD87", "#D074FF"];

    function getPathCoordinates(data_point) {
      var coordinates = [];

      for (var i = 0; i < features.length; i++) {
        var _ft_name = features[i];

        var _angle = Math.PI / 2 + 2 * Math.PI * i / features.length;

        coordinates.push(angleToCoordinate(_angle, data_point[_ft_name]));
      }

      return coordinates;
    }

    console.log(data.length);

    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      console.log(d);
      console.log("CALL");
      var _color = colors[i];
      var coordinates = getPathCoordinates(d); //draw the path element

      svg.append("path").datum(coordinates).attr("d", line).attr("stroke-width", 3).attr("stroke", _color).attr("fill", _color).attr("stroke-opacity", 1).attr("opacity", 0.66);
    }
  }

  ; // Call

  startChart(data); // - - - - - - - - - - - - - - - - - - - -
  //
  // END D3JS
  //
  // - - - - - - - - - - - - - - - - - - - -
}); // - - - - - - - - - - - - - - - - - - - -
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
//# sourceMappingURL=welcome-e791b4e320d23a86b15d.js.map