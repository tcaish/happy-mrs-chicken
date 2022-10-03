import './play-button.scss';

function PlayButton({ setPlayButtonClicked }) {
  return (
    <div className="play-button">
      <h1 onClick={() => setPlayButtonClicked(true)}>Play</h1>
    </div>
  );
}

export default PlayButton;
