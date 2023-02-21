import { useState } from 'react';

export const useSlider = (defaultState) => {
  const [slide, setSlide] = useState(defaultState);

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

  const Slider = () => (
    <input
      type="range"
      min="0"
      max="1"
      step="0.1"
      defaultValue={slide}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
  return [slide, Slider, setSlide];
};
