import * as LibSaya from "./grafLibrary.js";

var canvasKita;

canvasKita = document.querySelector("#canvas1");
var ctx;
ctx = canvasKita.getContext("2d");
var imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);

// var point_array = [
//   { x: 100, y: 100 },
//   { x: 150, y: 150 },
//   { x: 50, y: 150 },
// ];

var point_array = [
  { x: 50, y: 150 },
  { x: 100, y: 100 },
  { x: 150, y: 150 },
  { x: 100, y: 250 },
  { x: 50, y: 150 },
];
LibSaya.polygon(imageDataSaya, point_array, 255, 0, 0);

var m = LibSaya.createTranslation(10, 0);
var p2 = LibSaya.transform_array(point_array, m);
LibSaya.polygon(imageDataSaya, p2, 0, 255);

var timer = 0;
var geser = 0;
var sudut = 0;
function draw() {
  timer += 1;
  if (timer > 10) {
    ctx.clearRect(0, 0, canvasKita.width, canvasKita.height);
    imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);
    LibSaya.dda_line(imageDataSaya, 0, 308, canvasKita.width, 308, 0, 0, 0);
    LibSaya.dda_line(imageDataSaya, 180, 353, 230, 353, 0, 0, 0);
    LibSaya.dda_line(imageDataSaya, 50, 353, 100, 353, 0, 0, 0);
    LibSaya.dda_line(imageDataSaya, 350, 353, 300, 353, 0, 0, 0);

    var t = LibSaya.createTranslation(geser, 0);
    var r = LibSaya.rotation_fp(point_array[0].x, point_array[0].y, sudut);
    m = LibSaya.multiplyMatrix(t, r);
    geser += 10;
    sudut += 0.1;
    p2 = LibSaya.transform_array(point_array, m);
    LibSaya.polygon(imageDataSaya, p2, 0, 255, 0);
    ctx.putImageData(imageDataSaya, 0, 0);
    timer = 0;
  }
  requestAnimationFrame(draw);
}
canvasKita.addEventListener("click", function (ev) {
  var rect = canvasKita.getBoundingClientRect();

  var x = ev.clientX - rect.left;
  var y = ev.clientY - rect.top;
  console.log(x + " " + y);
});
draw();
// setInterval(draw, 100);

ctx.putImageData(imageDataSaya, 0, 0);
