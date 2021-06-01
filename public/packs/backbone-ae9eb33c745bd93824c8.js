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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/*!******************************************!*\
  !*** ./app/javascript/packs/backbone.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);
//# sourceMappingURL=backbone-ae9eb33c745bd93824c8.js.map