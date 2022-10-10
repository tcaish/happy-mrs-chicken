import { useEffect } from 'react';
import './footer.scss';

function Footer() {
  useEffect(() => {
    const footer = document.querySelector('.footer');
    const screenWidth = window.innerWidth;

    if (screenWidth <= 765) {
      footer.style.setProperty('left', '0');
    } else {
      // Subtract width of footer / 2 to get it in the middle
      footer.style.setProperty('left', `${screenWidth / 2 - 759.23 / 2}px`);
    }
  });

  return (
    <div className="footer">
      <p className="footer-instructions">
        Click the play button, then click anywhere in the browser window to
        play.
      </p>
      <p className="footer-disclaimer">
        We do not own the theme music or the idea behind this game. This was
        re-created for learning purposes.
      </p>
    </div>
  );
}

export default Footer;
