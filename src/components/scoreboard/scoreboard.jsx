import './scoreboard.scss';

function Scoreboard({ score }) {
  return (
    <div className="scoreboard">
      <span>{score}</span>
    </div>
  );
}

export default Scoreboard;
