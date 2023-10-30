import * as LibSaya from "./grafLibrary.js";
var canvasKita;

const csvFilePath = "themes.csv"

canvasKita = document.querySelector("#canvas1");
var ctx;
ctx = canvasKita.getContext("2d");
var imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);


fetch(csvFilePath)
  .then(response => response.text())
  .then(csvData => {
    Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        const data = results.data;
        console.log(data); // Data yang telah diurai dari file CSV
      }
    });
  })
  .catch(error => {
    console.error('Error fetching CSV file:', error);
  });

ctx.putImageData(imageDataSaya, 0, 0);
