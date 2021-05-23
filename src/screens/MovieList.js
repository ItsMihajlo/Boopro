import './Login.css';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './MoveList.css';
import genresJson from '../data/geners.json';
import Popover from '../components/Popover';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const MovieList = () => {
  const { movies } = useSelector((state) => state.movies);

  let [focusedX, setFocusedX] = useState(0);
  let [focusedY, setFocusedY] = useState(0);
  const scrollRef = useRef();

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

  // const fetchMovies = async (genre) => {
  //   const result = await axios.get(
  //     `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&api_key=d38aa8716411ef7d8e9054b34a6678ac`
  //   );

  //   //ako treba da se prikazu samo 6 filma i ne vise (jer nisam razumeo da li treba
  //   //6 filma po zanru ili da se samo vide 6 filma na 1080p ekranu), menja se, na const data = resault.data.resaults.slice(0.6);
  //   const data = result.data.results;
  //   movies[genre.name] = data;
  //   setMovies({ ...movies, [genre.name]: data });
  // };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress);

    return () => window.removeEventListener('keyup', handleKeyPress);
  }, []);

  const handleKeyPress = (event) => {
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
      focusedY = 0;
      setFocusedY(focusedY);
    } else if (event.key === 'ArrowUp' && focusedX > 0) {
      focusedX -= 1;
      setFocusedX(focusedX);
      scroll();
      focusedY = 0;
      setFocusedY(focusedY);
    } else if (event.key === 'ArrowLeft' && focusedY > 0) {
      focusedY -= 1;
      setFocusedY(focusedY);
      scrollY();
    }
  };

  const scroll = () => {
    // window.scrollTo({ top: focusedX * 350 * 1.2, behavior: 'smooth' });
    scrollRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
  };
  const scrollY = () => {
    // window.scrollTo({ left: focusedY * 220 * 1.2, behavior: 'smooth' });
    scrollRef.current.scrollIntoView({
      block: 'center',
      inline: 'center',
      behavior: 'smooth',
    });
    // scrollRef.current.scrollTo({
    //   left: focusedY * 220 * 1.2,
    //   behavior: 'smooth',
    // });
    // const element = document.getElementById([genre.id]);
    // console.log(element);
    // window.scrollTo({ right: focusedY * 220 * 1.2 });
  };

  return (
    <div className="genre_list">
      {genresJson.genres.map((genre, indexX) => (
        <div key={genre.id} className="movie_list_wrapper">
          <div className="genre_name">{genre.name}</div>
          <SimpleBar autoHide={false} forceVisible="x" className="simple_bar">
            <div className="movie_list">
              {movies[genre.id] &&
                movies[genre.id].map((movie, indexY) => (
                  <div ref={scrollRef} key={movie.id} className="movie">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      className={
                        indexX === focusedX && indexY === focusedY
                          ? 'focused_movie_poster'
                          : 'movie_poster'
                      }
                    />

                    {indexX === focusedX && indexY === focusedY && (
                      <div ref={scrollRef} className="movie_name">
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
                    )}
                  </div>
                ))}
            </div>
          </SimpleBar>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
