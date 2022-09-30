import Chicken from './components/chicken/chicken';
import Egg from './components/egg/egg';
import './App.scss';
import 'animate.css';
import Scoreboard from './components/scoreboard/scoreboard';
import { useState } from 'react';

function App() {
  const [score, setScore] = useState('000');

  return (
    <div className="App">
      <Scoreboard score={score} />
      <Egg />
      <Chicken mouthIsClosed={true} />
    </div>
  );
}

export default App;
