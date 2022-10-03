import './scoreboard.scss';

function Scoreboard({ scoreText }) {
  return (
    <div className="scoreboard">
      <span>{scoreText}</span>
    </div>
  );
}

export default Scoreboard;
