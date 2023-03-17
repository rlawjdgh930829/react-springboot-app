import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import User from './components/User/User';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className='App'>
      <Navbar></Navbar>
      <br />
      <Routes>
        <Route path='/' exact={true} element={<Home />} />
        <Route path='/user/:userId' exact={true} element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
