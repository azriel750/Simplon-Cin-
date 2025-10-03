import Carousel from "../Composants/carousel/Carousel";
import { useParams, useNavigate } from "react-router-dom";
import { useFetcher } from "../src/fetcher";
import "../public/Css/film.css";

export default function Film() {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_TMDB_KEY;

  const film = useFetcher(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr-FR`
  );
  const credits = useFetcher(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=fr-FR`
  );
  const recommendations = useFetcher(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&language=fr-FR`
  );

  if (film.isLoading || credits.isLoading || recommendations.isLoading)
    return <p>Chargement...</p>;

  if (!film.data) return <p>Détails non disponibles</p>;

  return (
    <div className="film-detail">
      {/* Bannière */}
      <div
        className="banner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${film.data?.backdrop_path})`,
        }}
      >
        <h1>{film.data?.title}</h1>
        <p>{film.data?.overview}</p>
      </div>

      {/* Infos principales */}
      <div className="info">
        <p>
          <strong>Genres :</strong>{" "}
          {film.data?.genres?.map((g: any) => g.name).join(", ") || "Non renseigné"}
        </p>
        <p>
          <strong>Note :</strong> {film.data?.vote_average} / 10
        </p>
        <p>
          <strong>Durée :</strong>{" "}
          {film.data?.runtime ? `${film.data.runtime} min` : "Non renseignée"}
        </p>
        <p>
          <strong>Budget :</strong>{" "}
          {film.data?.budget
            ? `${film.data.budget.toLocaleString()} $`
            : "Inconnu"}
        </p>
      </div>

      {/* Casting */}
      <div className="casting">
        <h2>Casting</h2>
        <div className="casting-row">
          {credits.data?.cast?.slice(0, 10).map((actor: any) => (
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
      {recommendations.data?.results?.length > 0 && (
        <Carousel
          url={`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&language=fr-FR`}
          title="Recommandations"
          type="movie"
        />
      )}
    </div>
  );
}
