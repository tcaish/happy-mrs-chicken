import './play-button.scss';

function PlayButton({ setPlayButtonClicked }) {
  return (
    <div className="play-button">
      <button onClick={() => setPlayButtonClicked(true)}>Play</button>
    </div>
  );
}

export default PlayButton;
