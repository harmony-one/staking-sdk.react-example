import './App.css';
import ValidatorInfo from './ValidatorInfo';
import StakingBlock from './StakingBlock';

function App() {
  return (
    <div className="App">
      <div className="column justify-content-center align-items-center">
        <ValidatorInfo validatorAddress="one1w7nvheulzwprf9d9a3r8sqtv5q47qlqx7kured" />
        <StakingBlock validatorAddress="one1w7nvheulzwprf9d9a3r8sqtv5q47qlqx7kured" />
      </div>
    </div>
  );
}

export default App;
