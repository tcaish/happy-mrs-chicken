import ChickenMouthClosedImage from '../../assets/images/chicken-mouth-closed.png';
import ChickenMouthOpenImage from '../../assets/images/chicken-mouth-open.png';
import './chicken.scss';

function Chicken({ mouthIsClosed = true }) {
  return (
    <div className="chicken">
      <img
        src={mouthIsClosed ? ChickenMouthClosedImage : ChickenMouthOpenImage}
        alt="Chicken"
      />
    </div>
  );
}

export default Chicken;
