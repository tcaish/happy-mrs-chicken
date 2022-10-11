import BabyChicken from '../components/baby-chicken/baby-chicken';
import Egg from '../components/egg/egg';

// Animates an element based on animate.css
export const animateCSS = (element, animation, prefix = true) => {
  // We create a Promise and return it
  return new Promise((resolve, reject) => {
    const prefixText = 'animate__';

    const animationName = prefix ? `${prefixText}${animation}` : `${animation}`;
    const node = document.querySelector(element);

    if (!node) return;

    prefix && node.classList.add(`${prefixText}animated`);
    node.classList.add(animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefixText}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });
};

// Moves an object from their current location to a new random location
export const moveChickenToRandomLocationAndLayEgg = (
  eggs,
  setEggs,
  babyChickens,
  setBabyChickens
) => {
  // Returns a random integer between a given min and max limit
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Returns random top and left locations that will be used to move the chicken
  function getRandomLocations() {
    return [
      randomIntFromInterval(0, window.innerHeight - 148),
      randomIntFromInterval(0, window.innerWidth - 151)
    ];
  }

  // Returns the styling for the egg given the vertical and horizontal
  // positioning.
  function getEggStyle(vertical, horizontal) {
    const screenWidth = window.innerWidth;
    let topAdj = 46;
    let leftAdj = 43;

    if (screenWidth <= 576) {
      topAdj = 40;
      leftAdj = 38;
    }

    return {
      top: `${vertical + topAdj}px`,
      left: `${horizontal + leftAdj}px`
    };
  }

  // Returns the styling for the baby chicken given the vertical and horizontal
  // positioning.
  function getBabyChickenStyle(vertical, horizontal) {
    const screenWidth = window.innerWidth;
    let topAdj = 46 + 23;
    let leftAdj = 43;

    if (screenWidth <= 576) {
      topAdj = 46 + 17;
      leftAdj = 40;
    }

    return {
      top: `${vertical + topAdj}px`,
      left: `${horizontal + leftAdj}px`
    };
  }

  let [randomVertical, randomHorizontal] = getRandomLocations();

  // Get new random locations so we don't collide with scoreboard
  while (randomVertical < 180 && randomHorizontal > window.innerWidth - 200)
    [randomVertical, randomHorizontal] = getRandomLocations();

  const chicken = document.querySelector('.chicken');
  chicken.style.setProperty('--chicken-vertical', `${randomVertical}px`);
  chicken.style.setProperty('--chicken-horizontal', `${randomHorizontal}px`);

  const eggStyle = getEggStyle(randomVertical, randomHorizontal);
  const babyChickenStyle = getBabyChickenStyle(
    randomVertical,
    randomHorizontal
  );

  // Lay egg at same location as chicken
  const newEggsLength = eggs.length + 1;
  setEggs([
    ...eggs,
    <Egg key={newEggsLength} id={`egg-${newEggsLength}`} style={eggStyle} />
  ]);

  // Spawn baby chicken
  const newBabyChickensLength = babyChickens.length + 1;
  setBabyChickens([
    ...babyChickens,
    <BabyChicken
      key={newBabyChickensLength}
      id={`baby-chicken-${newBabyChickensLength}`}
      style={babyChickenStyle}
    />
  ]);
};

// Detects if the user is clicking in the space they're not allowed to click
// (i.e. the scoreboard and sound button)
export function isMouseClickOutOfBounds(e) {
  const x = e.clientX;
  const y = e.clientY;
  const screenWidth = window.innerWidth;
  return x <= screenWidth && x >= screenWidth - 200 && y >= 0 && y <= 160;
}

// Calculates whether or not the baby chicken spawned on the left side of the
// screen.
export function isBabyChickenOnLeftSide(styleLeft) {
  const halfOfScreenWidth = window.innerWidth / 2;
  const styleLeftNumber = parseFloat(styleLeft.split('px')[0]);
  return styleLeftNumber <= halfOfScreenWidth;
}

// This checks if the current device is a mobile phone
export function isUserOnMobileDevice() {
  return /Android|iPhone/i.test(navigator.userAgent);
}
