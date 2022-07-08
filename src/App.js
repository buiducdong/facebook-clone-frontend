import './App.scss';
import HomePage from './pages/homePage/HomePage';
import LoginPage from './pages/authPage/LoginPage';
import { Route, Routes } from 'react-router-dom';
import ActivateEmail from './pages/authPage/ActivateEmail';
import { useSelector } from 'react-redux';
import Profile from './pages/profile/Profile';
import Stories from './pages/stories/Stories';
import Create from './pages/stories/Create';

function App() {
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;
  return (
    <Routes>
      <Route path='/' element={<LoginPage />}></Route>
      <Route index element={isLogged ? <HomePage /> : <LoginPage />} />
      <Route path='/stories/:userId' element={isLogged ? <Stories /> : <LoginPage />} />
      <Route path='/stories/create' element={isLogged ? <Create /> : <LoginPage />} />
      <Route path='/user/activation/:activation_token' element={<ActivateEmail />} />
      <Route
        path='/profile/:userId'
        element={isLogged && user ? <Profile /> : <LoginPage />}
      />
    </Routes>
  );
}

export default App;
