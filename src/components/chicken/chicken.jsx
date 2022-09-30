import { useEffect, useRef } from 'react';
import ChickenMouthClosedImage from '../../assets/images/chicken-mouth-closed.png';
import ChickenMouthOpenImage from '../../assets/images/chicken-mouth-open.png';
import { animateCSS } from '../../exports/functions';
import './chicken.scss';

function Chicken({ firstLoad, mouthIsClosed, chickenShouldAnimate }) {
  const interval = useRef(null);

  // Makes the chicken bounce up and down
  useEffect(() => {
    // If it should animate and it's not on first page load
    if (chickenShouldAnimate && !firstLoad) {
      interval.current = setInterval(() => {
        animateCSS('.chicken', 'shakeY');
      }, 5000);
    } else {
      clearInterval(interval.current);
    }
  }, [chickenShouldAnimate, firstLoad]);

  return (
    <div className="chicken">
      <img
        src={mouthIsClosed ? ChickenMouthClosedImage : ChickenMouthOpenImage}
        alt="Chicken"
      />
    </div>
  );
}

export default Chicken;
