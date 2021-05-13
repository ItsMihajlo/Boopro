import './Login.css';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './MoveList.css';
import genresJson from '../data/geners.json';
import Popover from './Popover';

const MovieList = () => {
  const [movies, setMovies] = useState({});
  let [focusedX, setFocusedX] = useState(0);
  let [focusedY, setFocusedY] = useState(0);

  window.addEventListener(
    'keydown',
    function (e) {
      if (
        ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(
          e.code
        ) > -1
      ) {
        e.preventDefault();
      }
    },
    false
  );

  const fetchMovies = async (genre) => {
    const result = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&api_key=d38aa8716411ef7d8e9054b34a6678ac`
    );

    //ako treba da se prikazu samo 6 filma i ne vise (jer nisam razumeo da li treba
    //6 filma po zanru ili da se samo vide 6 filma na 1080p ekranu), menja se, na const data = resault.data.resaults.slice(0.6);
    const data = result.data.results;
    movies[genre.name] = data;
    setMovies({ ...movies, [genre.name]: data });
  };

  useEffect(() => {
    genresJson.genres.map(async (genre) => {
      fetchMovies(genre);
    });
    window.addEventListener('keyup', (event) => {
      event.preventDefault();
      //samim tim ako se uradi slice na samo 6 limit se takodje i smanjuje sa 19 na 5
      if (event.key === 'ArrowRight' && focusedY < 19) {
        focusedY += 1;
        setFocusedY(focusedY);
        scrollY();
      } else if (
        event.key === 'ArrowDown' &&
        focusedX < genresJson.genres.length - 1
      ) {
        focusedX += 1;
        setFocusedX(focusedX);
        scroll();
      } else if (event.key === 'ArrowUp' && focusedX > 0) {
        focusedX -= 1;
        setFocusedX(focusedX);
        scroll();
      } else if (event.key === 'ArrowLeft' && focusedY > 0) {
        focusedY -= 1;
        setFocusedY(focusedY);
        scrollY();
      }
    });
  }, []);

  const scroll = () => {
    window.scrollTo({ top: focusedX * 350 * 1.2, behavior: 'smooth' });
  };
  const scrollY = () => {
    window.scrollTo({ left: focusedY * 220 * 1.2, behavior: 'smooth' });
  };

  return (
    <div className="genre_list">
      {genresJson.genres.map((genre, indexX) => (
        <div key={genre.id} className="movie_list_wrapper">
          <div className="genre_name">{genre.name}</div>
          <div className="movie_list">
            {movies[genre.name] ? (
              movies[genre.name].map((movie, indexY) => (
                <div key={movie.id} className="movie">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    className={
                      indexX === focusedX && indexY === focusedY
                        ? 'focused_movie_poster'
                        : 'movie_poster'
                    }
                  />

                  {indexX === focusedX && indexY === focusedY ? (
                    <div className="movie_name">
                      {movie.title}

                      <Popover
                        className="popover"
                        name={movie.title}
                        overview={movie.overview}
                        vote_average={movie.vote_average}
                        date={movie.release_date}
                        background={movie.backdrop_path}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ))
            ) : (
              <> </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
