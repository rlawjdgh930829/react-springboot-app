import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import User from './components/User/User';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

function App() {
  return (
    <div className='App'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' exact={true} element={<Home />} />
        <Route path='/user/:userId' exact={true} element={<User />} />
        <Route
          path='/auth'
          exact={true}
          element={
            localStorage.getItem('currentUser') != null ? (
              <Navigate to='/' />
            ) : (
              <Auth />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
