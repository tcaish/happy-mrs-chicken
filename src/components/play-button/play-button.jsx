import { useEffect } from 'react';
import './play-button.scss';

function PlayButton({ firstLoad, setPlayButtonClicked, canClickPlayButton }) {
  // On first load, set play button to middle of screen below chicken
  useEffect(() => {
    if (firstLoad) {
      const playButton = document.querySelector('.play-button');

      // Divide by 2 to get top-left corner to middle of screen; subtract
      // width of play button / 2 to get it in the middle; add 125 to get below
      // chicken
      playButton.style.setProperty(
        'top',
        `${window.innerHeight / 2 - 86 / 2 + 125}px`
      );
      playButton.style.setProperty(
        'left',
        `${window.innerWidth / 2 - 200 / 2}px`
      );
    }
  });

  return (
    <div className="play-button">
      <h1 onClick={() => canClickPlayButton && setPlayButtonClicked(true)}>
        Play
      </h1>
    </div>
  );
}

export default PlayButton;
