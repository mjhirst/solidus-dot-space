//Load when the DOM is ready or Canvas will be null
$(document).ready(function () {
  
  //ThreeJS
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
  
  //Load OBJ
    obj = new THREE.Object3D();
    {
      const mtlLoader = new THREE.MTLLoader();
      mtlLoader.load('solidus_launch.mtl', (mtlParseResult) => {
        const objLoader = new OBJLoader2();
        const materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
        objLoader.addMaterials(materials);
        objLoader.load('solidus_launch.obj', (root) => {
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
      time *= 0.0001;  // convert time to seconds
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
  //END ThreeJS
  
  //D3js
 let data = [];
 let features = ["Complexity","Cost","Speed","Space","ROI"];
 //generate the data
 for (var i = 0; i < 3; i++){
     var point = {}
     //each feature will be a random number from 1-9
     features.forEach(f => point[f] = 1 + Math.random() * 8);
     data.push(point);
 }
 console.log(data);
 
 //https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart
 const d3canvas = document.querySelector('#chart-container');
 console.log(d3canvas.clientWidth, d3canvas.clientHeight);
 
 let svg = d3.select(d3canvas).append("svg")
 .attr("width", d3canvas.clientWidth)
 .attr("height", d3canvas.clientHeight);

 //create the scale
 let radialScale = d3.scaleLinear()
 .domain([0,10])
 .range([0,125]); //Edit this for the size too
 let ticks = [2,4,6,8,10];

 //create the axes
 ticks.forEach(t =>
    svg.append("circle")
    .attr("cx", d3canvas.clientWidth / 2)
    .attr("cy", d3canvas.clientHeight / 2)
    .attr("fill", "none")
    .attr("stroke", "#747679")
    .attr("r", radialScale(t))
    );

  function angleToCoordinate(angle, value){
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return {"x": (d3canvas.clientWidth / 2) + x, "y": (d3canvas.clientHeight / 2) - y};
  }

//data position helper
for (var i = 0; i < features.length; i++) {
  let ft_name = features[i];
  let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
  let line_coordinate = angleToCoordinate(angle, 10);
  let label_coordinate = angleToCoordinate(angle, 10.5);

  //draw axis line
  svg.append("line")
  .attr("x1", d3canvas.clientWidth / 2)
  .attr("y1", d3canvas.clientHeight / 2)
  .attr("x2", line_coordinate.x)
  .attr("y2", line_coordinate.y)
  .attr("stroke","#747679");

  //draw axis label
  svg.append("text")
  .attr("x", label_coordinate.x)
  .attr("y", label_coordinate.y)
  .attr("fill", "#747679")
  .text(ft_name);
}

let line = d3.line()
.x(d => d.x)
.y(d => d.y);
let colors = ["#FA8C00", "#40FD87", "#D074FF"];

function getPathCoordinates(data_point){
  let coordinates = [];
  for (var i = 0; i < features.length; i++){
      let ft_name = features[i];
      let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
      coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
  }
  return coordinates;
}

for (var i = 0; i < data.length; i ++){
  let d = data[i];
  let color = colors[i];
  let coordinates = getPathCoordinates(d);

  //draw the path element
  svg.append("path")
  .datum(coordinates)
  .attr("d",line)
  .attr("stroke-width", 3)
  .attr("stroke", color)
  .attr("fill", color)
  .attr("stroke-opacity", 1)
  .attr("opacity", 0.66);
}


  });
  


  