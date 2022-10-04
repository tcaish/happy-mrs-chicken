import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from 'react-icons/bs';
import './sound-button.scss';

function SoundButton({ soundOn, setSoundOn }) {
  return (
    <div className="sound-button" onClick={() => setSoundOn(!soundOn)}>
      {soundOn ? <BsFillVolumeUpFill /> : <BsFillVolumeMuteFill />}
    </div>
  );
}

export default SoundButton;
