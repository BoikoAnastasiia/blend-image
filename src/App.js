import { fabric } from 'fabric';
import { useEffect, useState } from 'react';
import player from './player.jpeg';
import texture from './texture.png';
import './App.css';

function App() {
  const [sliderValue, setSlide] = useState(0.5);
  const [fabricCanvas, setFabricCanvas] = useState(null);

  useEffect(() => {
    setFabricCanvas(initFabric());
  }, []);

  useEffect(() => {
    if (fabricCanvas) {
      fabric.Image.fromURL(
        player,
        function (img) {
          img.set({ width: 1904, height: 1270, scaleX: 0.2, scaleY: 0.2 });
          fabricCanvas.add(img);
        },
        { crossOrigin: 'annonymous' }
      );

      fabric.Image.fromURL(
        texture,
        function (img) {
          img.set({
            width: 566,
            height: 802,
            scaleX: 0.9,
            scaleY: 0.9,
            left: 400,
          });
          fabricCanvas.add(img);
        },
        { crossOrigin: 'annonymous' }
      );
    }
  }, [fabricCanvas]);

  const initFabric = () => {
    return new fabric.Canvas('blend', {
      backgroundColor: 'white',
      width: 2000,
      height: 1000,
    });
  };

  console.log(fabricCanvas);

  const handleChange = (e) => {
    console.log(e.target.value);
    setSlide(+e.target.value);
  };

  const addFilter = () => {
    const filter = new fabric.Image.filters.BlendImage({
      image: fabricCanvas._objects[1],
      mode: 'multiply',
      alpha: 10,
    });
    fabricCanvas._objects[0].filters = [];
    fabricCanvas._objects[0].filters.push(filter);
    fabricCanvas._objects[0].applyFilters();
    fabricCanvas.requestRenderAll();
  };

  function resetFilter() {
    fabricCanvas._objects[0].filters = [];
    fabricCanvas._objects[0].applyFilters();
    fabricCanvas.requestRenderAll();
  }

  return (
    <div className="App">
      <button onClick={addFilter}>Apply Blend</button>
      <button onClick={resetFilter}>Reset</button>
      {/* <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        onChange={handleChange}
        value={sliderValue}
        // onBlur={handleBlur}
      /> */}
      <canvas className="canvas" id="blend"></canvas>
    </div>
  );
}

export default App;
