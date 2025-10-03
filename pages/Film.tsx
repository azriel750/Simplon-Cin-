import Carousel from "../Composants/carousel/Carousel";
import { useParams, useNavigate } from "react-router-dom";
import { useFetcher } from "../src/fetcher";
import type { Movie, MovieResponse, Credits } from "./types";
import "../public/Css/Film.css";

export default function Film() {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_TMDB_KEY;

  const film = useFetcher<Movie>(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr-FR`
  );
  const credits = useFetcher<Credits>(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=fr-FR`
  );
  const recommendations = useFetcher<MovieResponse>(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&language=fr-FR`
  );

  if (film.isLoading || credits.isLoading || recommendations.isLoading)
    return <p>Chargement...</p>;
  if (!film.data) return <p>Détails non disponibles</p>;

  const movie: Movie = film.data;
  const cast = credits.data?.cast || [];
  const recs = recommendations.data?.results || [];

  return (
    <div className="film-detail">
      <div
        className="banner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
      <div className="info">
        <p>
          <strong>Genres :</strong>{" "}
          {movie.genres?.map((g) => g.name).join(", ") || "Non renseigné"}
        </p>
        <p>
          <strong>Note :</strong> {movie.vote_average} / 10
        </p>
        <p>
          <strong>Durée :</strong>{" "}
          {movie.runtime ? `${movie.runtime} min` : "Non renseignée"}
        </p>
        <p>
          <strong>Budget :</strong>{" "}
          {movie.budget ? `${movie.budget.toLocaleString()} $` : "Inconnu"}
        </p>
      </div>
      <div className="casting">
        <h2>Casting</h2>
        <div className="casting-row">
          {cast.slice(0, 10).map((actor) => (
            <div key={actor.id} className="actor-card">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "/fallback.jpg"
                }
                alt={actor.name}
                onClick={() => navigate(`/person/${actor.id}`)}
                style={{ cursor: "pointer" }}
              />
              <p>Interprète : {actor.name}</p>
              <span>Rôle : {actor.character}</span>
            </div>
          ))}
        </div>
      </div>
      {recs.length > 0 && (
        <Carousel
          items={recs}
          title="Recommandations"
          type="movie"
        />
      )}
    </div>
  );
}
