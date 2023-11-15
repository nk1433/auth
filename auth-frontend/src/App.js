import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/signup';
import Login from './components/login';
import Data from './components/data';
import Home from './components/home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="data" element={<Data />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
