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
import PlayButton from './components/play-button/play-button';
import SoundButton from './components/sound-button/sound-button';
import Footer from './components/footer/footer';
import useSound from 'use-sound';
import './App.scss';
import './exports/animations.scss';
import 'animate.css';
import ScoreReached from './components/score-reached/score-reached';

function App() {
  const [playThemeSong, themeSongMethods] = useSound(ThemeSong, {
    onend: () => setSoundOn(false)
  });
  const [playFartSound] = useSound(FartSound);

  const [firstLoad, setFirstLoad] = useState(true);
  const [userClicked, setUserClicked] = useState(false);

  // Chicken states
  const interval = useRef(null);
  const [chickenImage, setChickenImage] = useState(ChickenMouthClosedImage);
  const [chickenShouldAnimate, setChickenShouldAnimate] = useState(false);
  const [babyChickens, setBabyChickens] = useState([]);

  // Egg states
  const [eggs, setEggs] = useState([]);

  // Scoreboard states
  const [score, setScore] = useState(49);
  const [scoreText, setScoreText] = useState('049');

  // Play button states
  const [canClickPlayButton, setCanClickPlayButton] = useState(false);
  const [playButtonClicked, setPlayButtonClicked] = useState(false);

  // Score reached states
  const [showScoreReached, setShowScoreReached] = useState(false);
  const [scoreReached, setScoreReached] = useState(0);

  // Sound button states
  const [soundOn, setSoundOn] = useState(true);

  // On first page load, do special animations for all objects on screen
  useEffect(() => {
    if (firstLoad) {
      animateCSS('.chicken', 'backInDown').then(() => {
        animateCSS('.chicken', 'shakeY').then(() =>
          setChickenShouldAnimate(true)
        );
      });
      animateCSS('.scoreboard', 'backInLeft');
      animateCSS('.sound-button', 'backInRight');
      animateCSS('.play-button', 'backInUp').then(() => {
        setFirstLoad(false);
        setCanClickPlayButton(true);
      });
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
    playButtonClicked && playThemeSong();
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
  function changeChickenImageOnClick() {
    setChickenImage(ChickenMouthOpenImage);
    setTimeout(() => setChickenImage(ChickenMouthClosedImage), 300);
  }

  // Update scoreboard to reflect new egg laid
  function updateScoreboard() {
    const newScore = score + 1;

    if (newScore < 10) setScoreText(`00${newScore}`);
    else if (newScore < 100) setScoreText(`0${newScore}`);
    else setScoreText(`${newScore}`);

    setScore(newScore);

    if (newScore % 50 === 0) {
      setScoreReached(newScore);
      setShowScoreReached(true);
    }
  }

  // Handles what happens when the user clicks within the page
  function handleUserClick(e) {
    if (userClicked || !playButtonClicked || isMouseClickOutOfBounds(e)) return;

    // Stop chicken's shaking animation
    const chicken = document.querySelector('.chicken');
    chicken.classList.remove(`animate__animated`, 'animate__shakeY');

    setChickenShouldAnimate(false);
    setUserClicked(true);

    // Move chicken to random location and lay an egg
    moveChickenToRandomLocationAndLayEgg(
      eggs,
      setEggs,
      babyChickens,
      setBabyChickens
    );

    // Make chicken fart
    playFartSound();

    // Change chicken image to mouth open
    changeChickenImageOnClick();

    // Add one to the scoreboard
    updateScoreboard();

    // Make chicken jump
    animateCSS('.chicken', 'jump', false).then(() => {
      setChickenShouldAnimate(true);
      setUserClicked(false);
    });
  }

  return (
    <div className="App" onMouseDown={handleUserClick}>
      {eggs.map((egg) => egg)}
      {babyChickens.map((babyChicken) => babyChicken)}

      <Chicken firstLoad={firstLoad} chickenImage={chickenImage} />

      {!playButtonClicked && (
        <PlayButton
          firstLoad={firstLoad}
          setPlayButtonClicked={setPlayButtonClicked}
          canClickPlayButton={canClickPlayButton}
        />
      )}

      <Scoreboard firstLoad={firstLoad} scoreText={scoreText} />
      <SoundButton soundOn={soundOn} setSoundOn={setSoundOn} />

      <Footer />

      {/* {showScoreReached && ( */}
      <ScoreReached
        scoreReached={scoreReached}
        setShowScoreReached={setShowScoreReached}
      />
      {/* )} */}
    </div>
  );
}

export default App;
