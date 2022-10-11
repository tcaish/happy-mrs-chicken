import { useEffect } from 'react';
import './chicken.scss';

function Chicken({ firstLoad, chickenImage }) {
  // On first load, set chicken to middle of screen
  useEffect(() => {
    if (firstLoad) {
      const chicken = document.querySelector('.chicken');

      // Divide by 2 to get top-left corner to middle of screen; subtract
      // width of chicken / 2 to get it in the middle
      chicken.style.setProperty(
        '--chicken-vertical',
        `${window.innerHeight / 2 - 145.88 / 2 - 40}px`
      );
      chicken.style.setProperty(
        '--chicken-horizontal',
        `${window.innerWidth / 2 - 150 / 2}px`
      );
    }
  });

  return (
    <div className="chicken">
      <img src={chickenImage} alt="Chicken" />
    </div>
  );
}

export default Chicken;
