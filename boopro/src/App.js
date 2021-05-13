import { useEffect, useState } from 'react';
import './App.css';
import AuthContext from './contexts/AuthContext';
import Login from './screens/Login';
import MovieList from './screens/MovieList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('email');
    if (isLoggedIn) {
      setIsLoggedIn(true);
      setEmail(email);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ email, isLoggedIn, setIsLoggedIn, setEmail }}
    >
      <div className="App">{isLoggedIn ? <MovieList /> : <Login />}</div>
    </AuthContext.Provider>
  );
}

export default App;
