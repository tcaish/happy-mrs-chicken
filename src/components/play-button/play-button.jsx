import { useEffect } from 'react';
import './play-button.scss';
import './play-button.mobile.scss';

function PlayButton({ firstLoad, setPlayButtonClicked, canClickPlayButton }) {
  // On first load, set play button to middle of screen below chicken
  useEffect(() => {
    if (firstLoad) {
      const playButton = document.querySelector('.play-button');
      const screenWidth = window.innerWidth;

      let playButtonHeight = 86;
      let playButtonWidth = 200;
      let additionalHeightAdj = 90;

      // If on mobile device
      if (screenWidth <= 576) {
        playButtonHeight = 63;
        playButtonWidth = 160;
        additionalHeightAdj = 60;
      }

      // Divide by 2 to get top-left corner to middle of screen; subtract
      // width of play button / 2 to get it in the middle; add 125 to get below
      // chicken
      playButton.style.setProperty(
        'top',
        `${
          window.innerHeight / 2 - playButtonHeight / 2 + additionalHeightAdj
        }px`
      );
      playButton.style.setProperty(
        'left',
        `${window.innerWidth / 2 - playButtonWidth / 2}px`
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
