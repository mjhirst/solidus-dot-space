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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/backbone.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/backbone.js":
/*!******************************************!*\
  !*** ./app/javascript/packs/backbone.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//TODO
//Rails loads ALL js files in each controller. Not Controler-specific ones...
//
//
//
//
//Load when the DOM is ready or Canvas will be null
$(document).ready(function () {
  var canvas = document.querySelector("#cube");
  cubeRenderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
  });
  cubeRenderer.setPixelRatio(window.devicePixelRatio); //Retina

  cubeRenderer.setSize(canvas.width * 2, canvas.height * 2);
  cubeRenderer.outputEncoding = THREE.sRGBEncoding; //1.
  //Create a cubeCamera

  var fov = 75;
  var aspect = 2; // the canvas default

  var near = 0.1;
  var far = 5;
  cubeCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  cubeCamera.position.z = 2; //2.
  //Create a Scene

  cubeScene = new THREE.Scene(); //7.
  //Add a directional light slightly above and to the left of the cubeCamera

  {
    var color = 0xffffff;
    var intensity = 1;
    var light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    cubeScene.add(light);
  } //3.
  //Create a box

  var boxWidth = 1;
  var boxHeight = 1;
  var boxDepth = 1;
  var geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth); //4.
  //Make a material

  var material = new THREE.MeshPhongMaterial({
    color: 0x44aa88
  });
  cube = new THREE.Mesh(geometry, material);
  console.log(JSON.stringify(cube)); //5.
  //Add to Scene

  cubeScene.add(cube);
  cubeRenderer.render(cubeScene, cubeCamera); // Start - Get mouse position

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
    //cubeRenderer.render(cubeScene, cubeCamera);
  }

  function getMouseX() {
    return posx;
  }

  function getMouseY() {
    return posy;
  } // End - Get mouse position

});

/***/ })

/******/ });
//# sourceMappingURL=backbone-cb836399069063732d03.js.map