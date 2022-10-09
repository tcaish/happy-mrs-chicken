import { useEffect } from 'react';
import useSound from 'use-sound';
import { animateCSS } from '../../exports/functions';
import HatchSound from '../../assets/sounds/hatch.mp3';
import './egg.scss';

function Egg(props) {
  const [playHatchSound] = useSound(HatchSound);

  // Animate the egg
  useEffect(() => {
    const eggId = `#${props.id}`;
    const node = document.querySelector(eggId);

    // Wobble
    animateCSS(eggId, 'egg-wobble', false).then(() => {
      playHatchSound();

      // Shrink
      animateCSS(eggId, 'shrink', false).then(() => {
        node.parentElement && node.parentElement.removeChild(node);
      });
    });
    // eslint-disable-next-line
  }, [props.id, playHatchSound]);

  return <div id={props.id} className="egg" style={props.style}></div>;
}

export default Egg;
