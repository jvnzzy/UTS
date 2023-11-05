import * as LibSaya from "./grafLibrary.js";

var canvasKita;
const df = "cereal.csv";

canvasKita = document.querySelector("#canvas1");
var ctx;
ctx = canvasKita.getContext("2d");
var imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);

fetch(df)
  .then((response) => response.text())
  .then((csvData) => {
    Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        const data = [
          {
            name: "100% Bran",
            calories: 70,
          },
          {
            name: "100% Natural Bran",
            calories: 120,
          },
          {
            name: "All-Bran",
            calories: 70,
          },
          {
            name: "Bran Flakes",
            calories: 90,
          },
          {
            name: "Cheerios",
            calories: 110,
          },
          {
            name: "Corn Flakes",
            calories: 100,
          },
        ];

        const barWidth = 20;
        const spacing = 10;
        const startX = 50;
        const startY = canvasKita.height - 50;

        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          const barHeight = item.calories;
          const x = startX + (barWidth + spacing) * i;
          const y = startY - barHeight;

          ctx.fillStyle = "blue"; // Set bar color
          ctx.fillRect(x, y, barWidth, barHeight);

          ctx.fillStyle = "black"; // Set text color
          ctx.fillText(item.name, x, startY + 20); // Display label below bar
        }
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching CSV file:", error);
  });

ctx.putImageData(imageDataSaya, 0, 0);
