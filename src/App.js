import { fabric } from 'fabric';
import { useEffect, useState } from 'react';
import player from './player.jpeg';
import texture from './texture.png';
import { useSlider } from './useSlider';
import './App.css';

function App() {
  const [sliderValue, Slider] = useSlider(0.5);

  useEffect(() => {
    const canvas = new fabric.Canvas('blend', {
      backgroundColor: 'white',
      width: 2000,
      height: 1000,
    });

    let mainImage;

    fabric.Image.fromURL(
      player,
      function (img) {
        img.set({ scaleX: 0.2, scaleY: 0.2 });
        mainImage = img;
        canvas.add(img);
      },
      { crossOrigin: 'annonymous' }
    );

    let secondImgObject;
    fabric.Image.fromURL(
      texture,
      function (img) {
        img.set({ width: 566, scaleX: 0.9, scaleY: 0.9, left: 400 });
        secondImgObject = img;
        canvas.add(img);
      },
      { crossOrigin: 'annonymous' }
    );

    function addFilter() {
      const filter = new fabric.Image.filters.BlendImage({
        image: secondImgObject,
        mode: 'multiply',
        alpha: sliderValue,
      });

      mainImage.filters.push(filter);
      mainImage.applyFilters();
      canvas.requestRenderAll();
    }
    function resetFilter() {
      mainImage.filters = [];
      mainImage.applyFilters();
      canvas.requestRenderAll();
    }

    document.getElementById('apply').addEventListener('click', addFilter);
    document.getElementById('reset').addEventListener('click', resetFilter);
  }, [sliderValue]);

  return (
    <div className="App">
      <button id="apply">Apply Blend</button>
      <button id="reset">Reset</button>
      <Slider />
      <canvas className="canvas" id="blend"></canvas>
    </div>
  );
}

export default App;
