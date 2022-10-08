import { useEffect } from 'react';
import { animateCSS } from '../../exports/functions';
import './egg.scss';

function Egg({ id, style }) {
  // Animate the egg
  useEffect(() => {
    animateCSS(`#${id}`, 'egg-wobble', false);
  }, [id]);

  return <div id={id} className="egg" style={style}></div>;
}

export default Egg;
