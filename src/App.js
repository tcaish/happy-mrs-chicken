import Chicken from './components/chicken/chicken';
import Egg from './components/egg/egg';
import './App.scss';
import 'animate.css';
import Scoreboard from './components/scoreboard/scoreboard';
import { useEffect, useState } from 'react';
import { animateCSS } from './exports/functions';

function App() {
  const [firstLoad, setFirstLoad] = useState(true);

  // Chicken states
  const [mouthIsClosed, setMouthIsClosed] = useState(true);
  const [chickenShouldAnimate, setChickenShouldAnimate] = useState(false);

  // Scoreboard states
  const [score, setScore] = useState('000');

  // On first page load, do special animations
  useEffect(() => {
    if (firstLoad) {
      animateCSS('.chicken', 'backInDown').then(() => {
        animateCSS('.chicken', 'shakeY');
      });
      animateCSS('.scoreboard', 'backInLeft');

      setFirstLoad(false);
      setChickenShouldAnimate(true);
    }
  }, [firstLoad]);

  // Handles what happens when the chicken is clicked
  function onChickenClicked() {}

  return (
    <div className="App">
      <Scoreboard firstLoad={firstLoad} score={score} />
      {/* <Egg /> */}
      <Chicken
        firstLoad={firstLoad}
        mouthIsClosed={mouthIsClosed}
        chickenShouldAnimate={chickenShouldAnimate}
      />
    </div>
  );
}

export default App;
