const quantize = require("../node_modules/quantize/quantize");

function createPixelArray(imgData, pixelCount, quality, forRect) {
  const pixels = imgData;
  const pixelArray = [];

  for (let i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
    offset = i * 4;
    r = pixels[offset + 0];
    g = pixels[offset + 1];
    b = pixels[offset + 2];
    a = pixels[offset + 3];

    // If pixel is mostly opaque and not white
    if (typeof a === "undefined" || a >= 125) {
      if (forRect || !(r > 250 && g > 250 && b > 250)) {
        pixelArray.push([r, g, b]);
      }
    }
  }
  return pixelArray;
}

function validateOptions(options) {
  let { colorCount, quality } = options;

  if (typeof colorCount === "undefined" || !Number.isInteger(colorCount)) {
    colorCount = 10;
  } else if (colorCount === 1) {
    throw new Error(
      "colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()"
    );
  } else {
    colorCount = Math.max(colorCount, 2);
    colorCount = Math.min(colorCount, 20);
  }

  if (
    typeof quality === "undefined" ||
    !Number.isInteger(quality) ||
    quality < 1
  ) {
    quality = 10;
  }

  return {
    colorCount,
    quality,
  };
}

/*
 * Color Thief v2.3.2
 * by Lokesh Dhakar - http://www.lokeshdhakar.com
 *
 * Thanks
 * ------
 * Nick Rabinowitz - For creating quantize.js.
 * John Schulz - For clean up and optimization. @JFSIII
 * Nathan Spady - For adding drag and drop support to the demo page.
 *
 * License
 * -------
 * Copyright Lokesh Dhakar
 * Released under the MIT license
 * https://raw.githubusercontent.com/lokesh/color-thief/master/LICENSE
 *
 * @license
 */

/*
  CanvasImage Class
  Class that wraps the html image element and canvas.
  It also simplifies some of the canvas context manipulation
  with a set of helper functions.
*/
const isValidFocusRect = function (focusRect) {
  return (
    !!focusRect &&
    typeof focusRect === "object" &&
    focusRect.top !== undefined &&
    focusRect.left !== undefined &&
    focusRect.width !== undefined &&
    focusRect.height !== undefined
  );
};
const CanvasImage = function (image, focusRect) {
  this.canvas = document.createElement("canvas");
  this.context = this.canvas.getContext("2d");

  if (!isValidFocusRect(focusRect)) {
    this.width = this.canvas.width = image.naturalWidth;
    this.height = this.canvas.height = image.naturalHeight;
    this.context.drawImage(image, 0, 0, this.width, this.height);
  } else {
    this.width = this.canvas.width = focusRect.width;
    this.height = this.canvas.height = focusRect.height;
    this.context.drawImage(
      image,
      focusRect.left,
      focusRect.top,
      focusRect.width,
      focusRect.height,
      0,
      0,
      focusRect.width,
      focusRect.height
    );
  }
};

CanvasImage.prototype.getImageData = function () {
  return this.context.getImageData(0, 0, this.width, this.height);
};

var ColorThief = function () {};

/*
 * getColor(sourceImage[, quality])
 * returns {r: num, g: num, b: num}
 *
 * Use the median cut algorithm provided by quantize.js to cluster similar
 * colors and return the base color from the largest cluster.
 *
 * Quality is an optional argument. It needs to be an integer. 1 is the highest quality settings.
 * 10 is the default. There is a trade-off between quality and speed. The bigger the number, the
 * faster a color will be returned but the greater the likelihood that it will not be the visually
 * most dominant color.
 *
 * */
ColorThief.prototype.getColor = function (
  sourceImage,
  quality = 10,
  focusRect
) {
  const palette = this.getPalette(sourceImage, 5, quality, focusRect);
  const dominantColor = palette[0];
  return dominantColor;
};

/*
 * getPalette(sourceImage[, colorCount, quality])
 * returns array[ {r: num, g: num, b: num}, {r: num, g: num, b: num}, ...]
 *
 * Use the median cut algorithm provided by quantize.js to cluster similar colors.
 *
 * colorCount determines the size of the palette; the number of colors returned. If not set, it
 * defaults to 10.
 *
 * quality is an optional argument. It needs to be an integer. 1 is the highest quality settings.
 * 10 is the default. There is a trade-off between quality and speed. The bigger the number, the
 * faster the palette generation but the greater the likelihood that colors will be missed.
 *
 *
 */
ColorThief.prototype.getPalette = function (
  sourceImage,
  colorCount,
  quality,
  focusRect
) {
  const options = validateOptions({
    colorCount,
    quality,
  });

  // Create custom CanvasImage object
  const image = new CanvasImage(sourceImage, focusRect);
  const imageData = image.getImageData();
  const pixelCount = image.width * image.height;

  const pixelArray = createPixelArray(
    imageData.data,
    pixelCount,
    options.quality,
    !!focusRect
  );

  // Send array to quantize function which clusters values
  // using median cut algorithm
  const cmap = quantize(pixelArray, options.colorCount);
  const palette = cmap ? cmap.palette() : null;

  return palette;
};

ColorThief.prototype.getColorFromUrl = function (imageUrl, callback, quality) {
  const sourceImage = document.createElement("img");

  sourceImage.addEventListener("load", () => {
    const palette = this.getPalette(sourceImage, 5, quality);
    const dominantColor = palette[0];
    callback(dominantColor, imageUrl);
  });
  sourceImage.src = imageUrl;
};

ColorThief.prototype.getImageData = function (imageUrl, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", imageUrl, true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function () {
    if (this.status == 200) {
      let uInt8Array = new Uint8Array(this.response);
      i = uInt8Array.length;
      let binaryString = new Array(i);
      for (let i = 0; i < uInt8Array.length; i++) {
        binaryString[i] = String.fromCharCode(uInt8Array[i]);
      }
      let data = binaryString.join("");
      let base64 = window.btoa(data);
      callback("data:image/png;base64," + base64);
    }
  };
  xhr.send();
};

ColorThief.prototype.getColorAsync = function (
  imageUrl,
  callback,
  quality,
  focusRect
) {
  const thief = this;
  this.getImageData(imageUrl, function (imageData) {
    const sourceImage = document.createElement("img");
    sourceImage.addEventListener("load", function () {
      const palette = thief.getPalette(sourceImage, 5, quality, focusRect);
      const dominantColor = palette[0];
      callback(dominantColor, this);
    });
    sourceImage.src = imageData;
  });
};

module.exports = ColorThief;
