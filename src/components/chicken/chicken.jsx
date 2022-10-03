import './chicken.scss';

function Chicken({ chickenImage }) {
  return (
    <div className="chicken">
      <img src={chickenImage} alt="Chicken" />
    </div>
  );
}

export default Chicken;
