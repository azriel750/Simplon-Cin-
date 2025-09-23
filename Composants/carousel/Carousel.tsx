import "./carousel.css"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

type Props = {
  genreId: number;   
  genreName: string;
};

export default function Carousel({ genreId, genreName }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=3e817aee0590103e159550925c429594&language=fr-FR`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Erreur API:", err);
      }
    };

    fetchMovies();
  }, [genreId]);

  return (
    <div className="carousel">
      <h2>{genreName}</h2>
      <div className="carousel-row">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => navigate(`/film/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
