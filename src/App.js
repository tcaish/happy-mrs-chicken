import Chicken from './components/chicken/chicken';
import Egg from './components/egg/egg';
import Scoreboard from './components/scoreboard/scoreboard';
import { useEffect, useState } from 'react';
import { animateCSS, moveObjectToRandomLocation } from './exports/functions';
import FartSound from './assets/sounds/fart.mp3';
import './App.scss';
import './exports/animations.scss';
import 'animate.css';

function App() {
  const [firstLoad, setFirstLoad] = useState(true);
  const [userClicked, setUserClicked] = useState(false);

  // Chicken states
  const [mouthIsClosed, setMouthIsClosed] = useState(true);
  const [chickenShouldAnimate, setChickenShouldAnimate] = useState(false);

  // Scoreboard states
  const [score, setScore] = useState('000');

  // On first page load, do special animations
  useEffect(() => {
    if (firstLoad) {
      animateCSS('.chicken', 'backInDown').then(() => {
        animateCSS('.chicken', 'shakeY').then(() => {
          setFirstLoad(false);
          setChickenShouldAnimate(true);
        });
      });
      animateCSS('.scoreboard', 'backInLeft');
    }
  }, [firstLoad]);

  // Handles what happens when the user clicks within the page
  function handleClick() {
    if (userClicked) return;

    // Stop chicken's shaking animation
    const chicken = document.querySelector('.chicken');
    chicken.classList.remove(`animate__animated`, 'animate__shakeY', 'jump');

    setChickenShouldAnimate(false);
    setUserClicked(true);

    // Move chicken to random location
    moveObjectToRandomLocation('.chicken');

    // Make chicken fart
    const audio = new Audio(FartSound);
    audio.play();

    // Make chicken jump
    animateCSS('.chicken', 'jump', false).then(() => {
      setChickenShouldAnimate(true);
      setUserClicked(false);
    });
  }

  return (
    <div className="App" onMouseDown={handleClick}>
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
