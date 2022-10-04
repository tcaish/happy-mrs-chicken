import Egg from '../components/egg/egg';

// Animates an element based on animate.css
export const animateCSS = (element, animation, prefix = true) => {
  // We create a Promise and return it
  return new Promise((resolve, reject) => {
    const prefixText = 'animate__';

    const animationName = prefix ? `${prefixText}${animation}` : `${animation}`;
    const node = document.querySelector(element);

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
export const moveChickenToRandomLocationAndLayEgg = (eggs, setEggs) => {
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomLocations() {
    return [randomIntFromInterval(0, 84), randomIntFromInterval(0, 89)];
  }

  let [randomVertical, randomHorizontal] = getRandomLocations();

  // Get new random locations so we don't collide with scoreboard
  while (randomVertical < 13 && randomHorizontal > 81)
    [randomVertical, randomHorizontal] = getRandomLocations();

  const chicken = document.querySelector('.chicken');
  chicken.style.setProperty('--chicken-vertical', `${randomVertical}%`);
  chicken.style.setProperty('--chicken-horizontal', `${randomHorizontal}%`);

  // Lay egg at same location as chicken
  setEggs([
    ...eggs,
    <Egg
      style={{
        top: `${randomVertical + 4}%`,
        left: `${randomHorizontal + 2.4}%`
      }}
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
