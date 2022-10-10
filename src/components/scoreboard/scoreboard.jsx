import './scoreboard.scss';
import './scoreboard.mobile.scss';

function Scoreboard({ scoreText }) {
  return (
    <div className="scoreboard">
      <span>{scoreText}</span>
    </div>
  );
}

export default Scoreboard;
