import Chicken from './components/chicken/chicken';
import Egg from './components/egg/egg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Egg />
      <Chicken mouthIsClosed={true} />
    </div>
  );
}

export default App;
