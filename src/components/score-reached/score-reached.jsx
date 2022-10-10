import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { animateCSS } from '../../exports/functions';
import './score-reached.scss';

function ScoreReached({ scoreReached, setShowScoreReached }) {
  // Animate component into view, throw confetti, then animate out
  useEffect(() => {
    // Throw confetti
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.3 } });

    // Fade in
    animateCSS('.score-reached', 'fadeInDown', true).then(() => {
      // Fade out after 2.5 seconds
      setTimeout(
        () =>
          animateCSS('.score-reached', 'fadeOutUp', true).then(() => {
            // Remove score reached component from view
            const scoreReachedNode = document.querySelector('.score-reached');
            scoreReachedNode.style.setProperty('display', 'none');
            setShowScoreReached(false);
          }),
        2500
      );
    });
  }, [setShowScoreReached]);

  return (
    <div className="score-reached">
      <div className="score-reached-text-container">
        <h1>You're up to {scoreReached} eggs laid 🎉</h1>
        <h2>Keep it up!</h2>
      </div>
    </div>
  );
}

export default ScoreReached;
