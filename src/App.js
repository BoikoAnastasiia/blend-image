import { fabric } from 'fabric';
import { useEffect, useState } from 'react';
import player from './player.jpeg';
import texture from './texture.png';
import './App.css';

function App() {
  const [sliderValue, setSlide] = useState(0.5);

  const handleChange = (e) => {
    console.log(e.target.value);
    setSlide(e.target.value);
  };

  const handleBlur = (e) => {
    const { value, name } = e.target;
    if (e.target.value == '') {
      setSlide(name);
    }
  };

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
    console.log(object);
  }, [sliderValue]);

  return (
    <div className="App">
      <button id="apply">Apply Blend</button>
      <button id="reset">Reset</button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <canvas className="canvas" id="blend"></canvas>
    </div>
  );
}

export default App;
