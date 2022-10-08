import { useEffect } from 'react';
import useSound from 'use-sound';
import { animateCSS } from '../../exports/functions';
import HatchSound from '../../assets/sounds/hatch.mp3';
import './egg.scss';

function Egg({ id, style }) {
  const [playHatchSound] = useSound(HatchSound);

  // Animate the egg
  useEffect(() => {
    const eggId = `#${id}`;
    const node = document.querySelector(eggId);

    // Wobble
    animateCSS(eggId, 'egg-wobble', false).then(() => {
      playHatchSound();

      // Shrink
      animateCSS(eggId, 'shrink', false).then(() => {
        node.parentElement.removeChild(node);
      });
    });
  }, [id, playHatchSound]);

  return <div id={id} className="egg" style={style}></div>;
}

export default Egg;
