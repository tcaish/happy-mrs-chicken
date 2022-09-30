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
