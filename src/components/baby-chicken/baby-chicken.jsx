import { useEffect, useRef, useState } from 'react';
import BabyChickenMouthClosedImage from '../../assets/images/baby-chicken-mouth-closed.png';
import BabyChickenMouthOpenImage from '../../assets/images/baby-chicken-mouth-open.png';
import { isBabyChickenOnLeftSide } from '../../exports/functions';
import './baby-chicken.scss';

function BabyChicken(props) {
  const interval = useRef(null);

  const [isMouthClosed, setIsMouthClosed] = useState(true);

  // Animate the baby chicken
  useEffect(() => {
    // Grow and move off screen
    animateBabyChicken(`#${props.id}`);

    // Change baby chicken image repeatedly
    interval.current = setInterval(() => setIsMouthClosed(!isMouthClosed), 300);

    return () => clearInterval(interval.current);
    //eslint-disable-next-line
  }, [props.id, isMouthClosed]);

  // Animates the baby chicken by making it grow and moving it off the screen
  function animateBabyChicken(babyId) {
    const babyChicken = document.querySelector(babyId);

    if (!babyChicken) return;

    let moveDirection = '70vw'; // Move to the right off-screen
    let lookDirection = '180deg'; // Baby chicken looks to right side
    const isLeftSide = isBabyChickenOnLeftSide(props.style.left);
    isLeftSide && (moveDirection = '-70vw') && (lookDirection = '0deg');

    babyChicken.style.setProperty('--move-off-screen-direction', moveDirection);
    babyChicken.style.setProperty('--baby-chicken-flip', lookDirection);
    babyChicken.classList.add('grow-and-move-off-screen');
  }

  return (
    <div id={props.id} className="baby-chicken" style={props.style}>
      <img
        src={
          isMouthClosed
            ? BabyChickenMouthClosedImage
            : BabyChickenMouthOpenImage
        }
        alt="Baby Chicken"
      />
    </div>
  );
}

export default BabyChicken;
