import { useEffect } from 'react';
import useSound from 'use-sound';
import { animateCSS } from '../../exports/functions';
import HatchSound from '../../assets/sounds/hatch.mp3';
import BabyChirpSound from '../../assets/sounds/baby-chicken-chirp.mp3';
import './egg.scss';
import './egg.mobile.scss';

function Egg(props) {
  const [playHatchSound] = useSound(HatchSound);
  const [playChirpSound] = useSound(BabyChirpSound);

  // Animate the egg
  useEffect(() => {
    const eggId = `#${props.id}`;

    // Wobble
    animateCSS(eggId, 'egg-wobble', false).then(() => {
      playHatchSound();
      playChirpSound();

      // Shrink
      animateCSS(eggId, 'shrink', false).then(() => {
        // Remove egg from document
        const node = document.querySelector(eggId);
        node && node.parentElement.removeChild(node);
      });
    });
    // eslint-disable-next-line
  }, [props.id, playHatchSound, playChirpSound]);

  return <div id={props.id} className="egg" style={props.style}></div>;
}

export default Egg;
