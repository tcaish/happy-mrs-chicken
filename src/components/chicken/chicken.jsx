import { useEffect } from 'react';
import './chicken.scss';
import './chicken.mobile.scss';

function Chicken({ firstLoad, chickenImage }) {
  // On first load, set chicken to middle of screen
  useEffect(() => {
    if (firstLoad) {
      const chicken = document.querySelector('.chicken');
      const screenWidth = window.innerWidth;

      let chickenHeight = 145.88;
      let chickenWidth = 150;

      // If on mobile device
      if (screenWidth <= 576) {
        chickenHeight = 117.3;
        chickenWidth = 120;
      }

      // Divide by 2 to get top-left corner to middle of screen; subtract
      // width of chicken / 2 to get it in the middle
      chicken.style.setProperty(
        '--chicken-vertical',
        `${window.innerHeight / 2 - chickenHeight / 2 - 40}px`
      );
      chicken.style.setProperty(
        '--chicken-horizontal',
        `${window.innerWidth / 2 - chickenWidth / 2}px`
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
