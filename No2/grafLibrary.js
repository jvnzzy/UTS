var canvasKita;
canvasKita = document.querySelector("#canvas1");

export function gbr_titik(imageDataTemp, x, y, r, g, b) {
  var index;
  index = 4 * (Math.ceil(x) + Math.ceil(y) * canvasKita.width);
  imageDataTemp.data[index] = r;
  imageDataTemp.data[index + 1] = g;
  imageDataTemp.data[index + 2] = b;
  imageDataTemp.data[index + 3] = 255;
}
export function dda_line(imageData, x1, y1, x2, y2, r, g, b) {
  var dx = x2 - x1; // bisa postif bisa negatif tergantung posisi x2 sebelum atau sesudah x1
  var dy = y2 - y1; // bisa positif atau negatif
  if (Math.abs(dx) > Math.abs(dy)) {
    //jalan di x
    if (x2 > x1) {
      // ke kanan
      var y = y1;
      for (var x = x1; x < x2; x++) {
        y = y + dy / Math.abs(dx); //1/m
        gbr_titik(imageData, x, y, r, g, b);
      }
    } else {
      //kekiri
      var y = y1;
      for (var x = x1; x > x2; x--) {
        y = y + dy / Math.abs(dx); //1/m
        gbr_titik(imageData, x, y, r, g, b);
      }
    }
  } else {
    if (y2 > y1) {
      // ke kanan
      var x = x1;
      for (var y = y1; y < y2; y++) {
        x = x + dx / Math.abs(dy); //1/m
        gbr_titik(imageData, x, y, r, g, b);
      }
    } else {
      //kekiri
      var x = x1;
      for (var y = y1; y > y2; y--) {
        x = x + dx / Math.abs(dy); //1/m
        gbr_titik(imageData, x, y, r, g, b);
      }
    }
  }
}

export function gbr_lingkaran(imageDataTemp, xc, yc, radius, r, g, b) {
  for (var x = xc - radius; x < xc + radius; x++) {
    var y = yc + Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
    gbr_titik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);

    var y = yc - Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
    gbr_titik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
  }
  for (var x = xc - radius; x < xc + radius; x++) {
    var y = yc + Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
    gbr_titik(imageDataTemp, Math.ceil(y), Math.ceil(x), r, g, b);

    var y = yc - Math.sqrt(Math.pow(radius, 2) - Math.pow(x - xc, 2));
    gbr_titik(imageDataTemp, Math.ceil(y), Math.ceil(x), r, g, b);
  }
}

export function lingkaran_polar(imageDataTemp, xc, yc, radius, r, g, b) {
  for (var theta = 0; theta < Math.PI * 2; theta += 0.53) {
    var x = xc + radius * Math.cos(theta);
    var y = yc + radius * Math.sin(theta);

    gbr_titik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
    lingkaran_baru(imageDataTemp, Math.ceil(x), Math.ceil(y), 10, 0, 0, 0);
  }
}

export function lingkaran_baru(imageDataTemp, xc, yc, radius, r, g, b) {
  for (var theta = 0; theta < Math.PI * 2; theta += 0.01) {
    var x = xc + radius * Math.cos(theta);
    var y = yc + radius * Math.sin(theta);

    gbr_titik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
  }
}

export function ellipse_polar(
  imageDataTemp,
  xc,
  yc,
  radiusX,
  radiusY,
  r,
  g,
  b
) {
  for (var theta = 0; theta < Math.PI * 2; theta += 0.01) {
    var x = xc + radiusX * Math.cos(theta);
    var y = yc + radiusY * Math.sin(theta);

    gbr_titik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
  }
}

export function polyline(imageDataTemp, point_array, r, g, b) {
  var point = point_array[0];

  dda_line(imageDataTemp, point.x, point.y, 150, 100, 255, 0, 0);

  for (var i = 1; i < point_array.length; i++) {
    var point_2 = point_array[i];

    dda_line(imageDataTemp, point.x, point.y, point_2.x, point_2.y, r, g, b);
    point = point_2;
  }
}
export function polygon(imageDataTemp, point_array, r, g, b) {
  var point = point_array[0];

  for (var i = 1; i < point_array.length; i++) {
    var point_2 = point_array[i];

    dda_line(imageDataTemp, point.x, point.y, point_2.x, point_2.y, r, g, b);
    point = point_2;
  }
  dda_line(
    imageDataTemp,
    point.x,
    point.y,
    point_array[0].x,
    point_array[0].y,
    r,
    g,
    b
  );
}

export function floodFillNaive(
  imageDataTemp,
  canvasKita,
  x,
  y,
  toFlood,
  color
) {
  // cara kerja algoritma floodfill adalah sebagai berikut
  // kita pilih titik x,y
  // kita cek apakah titik tersebut sudah terwarna atau belum
  // bila belum kia akan warna lalu porses titik terdekat atau tetangga
  var index = 4 * (x + y * canvasKita.width);

  var r1 = imageDataTemp.data[index];
  var g1 = imageDataTemp.data[index + 1];
  var b1 = imageDataTemp.data[index + 2];

  if (r1 == toFlood.r && g1 == toFlood.g && b1 == toFlood.b) {
    imageDataTemp.data[index] = color.r;
    imageDataTemp.data[index + 1] = color.g;
    imageDataTemp.data[index + 2] = color.b;
    imageDataTemp.data[index + 3] = 255;

    floodFillNaive(imageDataTemp, canvasKita, x + 1, y, toFlood, color);
    floodFillNaive(imageDataTemp, canvasKita, x, y + 1, toFlood, color);

    floodFillNaive(imageDataTemp, canvasKita, x - 1, y, toFlood, color);
    floodFillNaive(imageDataTemp, canvasKita, x, y - 1, toFlood, color);
  }
}
export function floodFillStack(
  imageDataTemp,
  canvasKita,
  x0,
  y0,
  toFlood,
  color
) {
  var tumpukan = [];
  tumpukan.push({ x: x0, y: y0 });
  while (tumpukan.length > 0) {
    var titik_sekarang = tumpukan.pop();
    var index_skrg =
      4 * (titik_sekarang.x + titik_sekarang.y * canvasKita.width);

    var r1 = imageDataTemp.data[index_skrg];
    var g1 = imageDataTemp.data[index_skrg + 1];
    var b1 = imageDataTemp.data[index_skrg + 2];

    if (r1 == toFlood.r && g1 == toFlood.g && b1 == toFlood.b) {
      imageDataTemp.data[index_skrg] = color.r;
      imageDataTemp.data[index_skrg + 1] = color.g;
      imageDataTemp.data[index_skrg + 2] = color.b;
      imageDataTemp.data[index_skrg + 3] = 255;

      tumpukan.push({ x: titik_sekarang.x + 1, y: titik_sekarang.y });
      tumpukan.push({ x: titik_sekarang.x - 1, y: titik_sekarang.y });
      tumpukan.push({ x: titik_sekarang.x, y: titik_sekarang.y + 1 });
      tumpukan.push({ x: titik_sekarang.x, y: titik_sekarang.y - 1 });
    }
  }
}
export function translasi(titik_lama, T) {
  var x_baru = titik_lama.x + T.x;
  var y_baru = titik_lama.y + T.y;

  return { x: x_baru, y: y_baru };
}
export function penskalaan(titik_lama, S) {
  var x_baru = titik_lama.x * S.x;
  var y_baru = titik_lama.y * S.y;

  return { x: x_baru, y: y_baru };
}
export function rotasi(titik_lama, sudut) {
  var x_baru = titik_lama.x * Math.cos(sudut) - titik_lama.y * Math.sin(sudut);
  var y_baru = titik_lama.y * Math.cos(sudut) + titik_lama.y * Math.sin(sudut);

  return { x: x_baru, y: y_baru };
}
export function rotasi_fp(titik_lama, titik_pusat, sudut) {
  var p1 = translasi(titik_lama, { x: -titik_pusat.x, y: -titik_pusat.y });
  var p2 = rotasi(p1, sudut);
  var p3 = translasi(p2, titik_pusat);

  return p3;
}

export function skala_fp(titik_lama, titik_pusat, S) {
  var p1 = translasi(titik_lama, { x: -titik_pusat.x, y: -titik_pusat.y });
  var p2 = penskalaan(p1, S);
  var p3 = translasi(p2, titik_pusat);

  return p3;
}
export function translasi_array(array_titik, T) {
  var array_hasil = [];
  for (var i = 0; i < array_titik.length; i++) {
    var temp = rotasi_fp(array_titik[i], T);
    array_hasil.push(temp);
  }
  return array_hasil;
}
export function rotasi_array(array_titik, titik_pusat, sudut) {
  var array_hasil = [];
  for (var i = 0; i < array_titik.length; i++) {
    var temp = rotasi_fp(array_titik[i], titik_pusat, sudut);
    array_hasil.push(temp);
  }
  return array_hasil;
}
export function skala_array(array_titik, titik_pusat, S) {
  var array_hasil = [];
  for (var i = 0; i < array_titik.length; i++) {
    var temp = skala_fp(array_titik[i], titik_pusat, S);
    array_hasil.push(temp);
  }
  return array_hasil;
}

export function createIdentity() {
  var identitas = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  return identitas;
}

export function multiplyMatrix(m1, m2) {
  var hasil = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      for (var k = 0; k < 3; k++) {
        hasil[i][k] += m1[i][j] * m2[j][k];
      }
    }
  }
  return hasil;
}

export function createTranslation(Tx, Ty) {
  var translasi = [
    [1, 0, Tx],
    [0, 1, Ty],
    [0, 0, 1],
  ];
  return translasi;
}

export function createScale(Sx, Sy) {
  var skala = [
    [Sx, 0, 0],
    [0, Sy, 0],
    [0, 0, 1],
  ];
  return skala;
}

export function createRotation(theta) {
  var rotasi = [
    [Math.cos(theta), -Math.sin(theta), 0],
    [Math.sin(theta), Math.cos(theta), 0],
    [0, 0, 1],
  ];
  return rotasi;
}

export function rotation_fp(xc, yc, theta) {
  var m1 = createTranslation(-xc, -yc);
  var m2 = createRotation(theta);
  var m3 = createTranslation(xc, yc);

  var hasil;
  hasil = multiplyMatrix(m3, m2);
  hasil = multiplyMatrix(hasil, m1);
  return hasil;
}
export function scale_fp(xc, yc, Sx, Sy) {
  var m1 = createTranslation(-xc, -yc);
  var m2 = createRotation(Sx, Sy);
  var m3 = createTranslation(xc, yc);

  var hasil;
  hasil = multiplyMatrix(m3, m2);
  hasil = multiplyMatrix(hasil, m1);
  return hasil;
}

export function transform_titik(titik_lama, m) {
  var x_baru = m[0][0] * titik_lama.x + m[0][1] * titik_lama.y + m[0][2] * 1;
  var y_baru = m[1][0] * titik_lama.x + m[1][1] * titik_lama.y + m[1][2] * 1;

  return { x: x_baru, y: y_baru };
}

export function transform_array(array_titik, m) {
  var hasil = [];
  for (var i = 0; i < array_titik.length; i++) {
    var titik_hasil;
    titik_hasil = transform_titik(array_titik[i], m);
    hasil.push(titik_hasil);
  }
  return hasil;
}
