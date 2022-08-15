import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import TestPage from './components/Test/TestPage/TestPage';
import { useContext, useState } from 'react';
import AppContext from './context/appContext';
import Modal from './components/Test/Modal/Modal';

function App() {
  const amounts = [
    {value: 10, label: 10},
    {value: 15, label: 15},
    {value: 20, label: 20},
    {value: 25, label: 25},
    {value: 30, label: 30},
  ]
  
  const [selectedAmount, setSelectedAmount] = useState(null)
  
  const changeHandler = e => {
    setSelectedAmount(e)
  }

  const ctx = useContext(AppContext)
  return (
    <div className="App">
      {!ctx.isAuth&&<Login onLogIn={ctx.logInHandler} 
      amounts={amounts} 
      changeHandler={changeHandler} 
      selectedAmount={selectedAmount}/>}
      {ctx.isAuth&&<TestPage amounts={amounts} selectedAmount={selectedAmount}/>}
    </div>
  );
}

export default App;
