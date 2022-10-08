import { useEffect } from 'react';
import ChickenImage from '../../assets/images/chicken-mouth-closed.png';
import './baby-chicken.scss';

function BabyChicken(props) {
  // Animate the egg
  useEffect(() => {
    const babyId = `#${props.id}`;
    const node = document.querySelector(babyId);

    // Grow
    node.classList.add('grow');
    // animateCSS(babyId, 'grow', false).then(() => {});
  }, [props.id]);

  return (
    <div id={props.id} className="baby-chicken" style={props.style}>
      <img src={ChickenImage} alt="Baby Chicken" />
    </div>
  );
}

export default BabyChicken;
