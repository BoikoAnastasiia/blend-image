import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import playerImage from './player.jpeg';
import textureImage from './texture.png';
import './App.css';

function App() {
  const [sliderValue, setSlide] = useState(0.5);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const texture = useRef();
  const player = useRef();
  useEffect(() => {
    setFabricCanvas(initFabric());
  }, []);

  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.add(
        new fabric.Image(player.current, { scaleX: 0.2, scaleY: 0.2 }),
        new fabric.Image(texture.current, {
          scaleX: 0.2,
          scaleY: 0.2,
          left: 400,
          opacity: 0.2,
        })
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

  const handleChange = (e) => {
    setSlide(+e.target.value);
  };

  const addFilter = () => {
    let fabricTexture = new fabric.Image(texture.current, { opacity: 0.2 });
    fabricCanvas._objects[0].filters = [];
    const filter = new fabric.Image.filters.BlendImage({
      image: fabricTexture,
      mode: 'multiply',
      alpha: sliderValue,
    });

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
      /> */}
      <canvas className="canvas" id="blend"></canvas>
      <img src={playerImage} alt="asd" ref={player} />
      <img src={textureImage} alt="asd" ref={texture} />
    </div>
  );
}

export default App;
