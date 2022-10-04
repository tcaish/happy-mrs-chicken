import Chicken from './components/chicken/chicken';
import Scoreboard from './components/scoreboard/scoreboard';
import { useEffect, useRef, useState } from 'react';
import {
  animateCSS,
  isMouseClickOutOfBounds,
  moveChickenToRandomLocationAndLayEgg
} from './exports/functions';
import FartSound from './assets/sounds/fart.mp3';
import ThemeSong from './assets/sounds/happy-mrs-chicken-song.mp3';
import ChickenMouthClosedImage from './assets/images/chicken-mouth-closed.png';
import ChickenMouthOpenImage from './assets/images/chicken-mouth-open.png';
import './App.scss';
import './exports/animations.scss';
import 'animate.css';
import PlayButton from './components/play-button/play-button';
import SoundButton from './components/sound-button/sound-button';
import useSound from 'use-sound';

function App() {
  const [playThemeSong, themeSongMethods] = useSound(ThemeSong, {
    onend: () => setSoundOn(false)
  });
  const [firstLoad, setFirstLoad] = useState(true);
  const [userClicked, setUserClicked] = useState(false);

  // Chicken states
  const interval = useRef(null);
  const [chickenImage, setChickenImage] = useState(ChickenMouthClosedImage);
  const [chickenShouldAnimate, setChickenShouldAnimate] = useState(false);

  // Egg states
  const [eggs, setEggs] = useState([]);

  // Scoreboard states
  const [score, setScore] = useState(0);
  const [scoreText, setScoreText] = useState('000');

  // Play button states
  const [playButtonClicked, setPlayButtonClicked] = useState(false);

  // Sound button states
  const [soundOn, setSoundOn] = useState(true);

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
      animateCSS('.sound-button', 'backInRight');
      animateCSS('.play-button', 'backInUp');
    }
  }, [firstLoad]);

  // Makes the chicken bounce up and down
  useEffect(() => {
    // If it should animate and it's not on first page load
    if (chickenShouldAnimate && !firstLoad) {
      interval.current = setInterval(() => {
        const chicken = document.querySelector('.chicken');
        if (
          !chicken.classList.contains('animate__shakeY') &&
          !chicken.classList.contains('jump')
        )
          animateCSS('.chicken', 'shakeY');
      }, 6000);
    } else {
      clearInterval(interval.current);
    }
  }, [chickenShouldAnimate, firstLoad]);

  // Play theme music once play button is clicked
  useEffect(() => {
    if (playButtonClicked) playThemeSong();
    // eslint-disable-next-line
  }, [playButtonClicked]);

  // Play and pause theme music when sound button is toggled
  useEffect(() => {
    if (playButtonClicked) {
      soundOn ? playThemeSong() : themeSongMethods.pause();
    }
    // eslint-disable-next-line
  }, [soundOn, playButtonClicked]);

  // When user clicks, this sets chicken image to mouth open, then changes it
  // back before jump animation ends.
  function handleChickenImageOnClick() {
    setChickenImage(ChickenMouthOpenImage);
    setTimeout(() => setChickenImage(ChickenMouthClosedImage), 300);
  }

  // Update the scoreboard
  function updateScoreboard() {
    const newScore = score + 1;

    if (newScore < 10) setScoreText(`00${newScore}`);
    else if (newScore < 100) setScoreText(`0${newScore}`);
    else setScoreText(`${newScore}`);

    setScore(newScore);
  }

  // Handles what happens when the user clicks within the page
  function handleClick(e) {
    if (userClicked || !playButtonClicked || isMouseClickOutOfBounds(e)) return;

    // Stop chicken's shaking animation
    const chicken = document.querySelector('.chicken');
    chicken.classList.remove(`animate__animated`, 'animate__shakeY');

    setChickenShouldAnimate(false);
    setUserClicked(true);

    // Move chicken to random location
    moveChickenToRandomLocationAndLayEgg(eggs, setEggs);

    // Make chicken fart
    const audio = new Audio(FartSound);
    audio.play();

    // Change chicken image to mouth open
    handleChickenImageOnClick();

    // Update the scoreboard
    updateScoreboard();

    // Make chicken jump
    animateCSS('.chicken', 'jump', false).then(() => {
      setChickenShouldAnimate(true);
      setUserClicked(false);
    });
  }

  return (
    <div className="App" onMouseDown={handleClick}>
      {eggs.map((egg) => egg)}

      <Scoreboard firstLoad={firstLoad} scoreText={scoreText} />
      <SoundButton soundOn={soundOn} setSoundOn={setSoundOn} />

      <Chicken
        firstLoad={firstLoad}
        chickenImage={chickenImage}
        chickenShouldAnimate={chickenShouldAnimate}
      />

      {!playButtonClicked && (
        <PlayButton setPlayButtonClicked={setPlayButtonClicked} />
      )}
    </div>
  );
}

export default App;
