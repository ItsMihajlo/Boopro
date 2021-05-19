import { useEffect, useState } from 'react';
import './App.css';
// import AuthContext from './contexts/AuthContext';
import Login from './screens/Login';
import MovieList from './screens/MovieList';
import { useDispatch } from 'react-redux';
import { getMovies } from './store/actions/movies';
import genresJson from './data/geners.json';

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn')
  );

  useEffect(() => {
    if (isLoggedIn) {
      genresJson.genres.map((genre) => {
        dispatch(getMovies(genre.id));
      });
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      {isLoggedIn ? <MovieList /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}

export default App;
