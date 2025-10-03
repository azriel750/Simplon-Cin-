import Carousel from "../Composants/carousel/Carousel";
import { useParams, useNavigate } from "react-router-dom";
import { useFetcher } from "../src/fetcher";
import type { TVShow, Credits, Movie } from "./types";
import "../public/Css/Serie.css";

export default function SerieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_TMDB_KEY;

  const serieData = useFetcher<TVShow>(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=fr-FR`
  );

  const creditsData = useFetcher<Credits>(
    `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}&language=fr-FR`
  );

  const recommendationsData = useFetcher<{ results: Movie[] }>(
    `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${apiKey}&language=fr-FR`
  );

  if (serieData.isLoading || creditsData.isLoading || recommendationsData.isLoading) {
    return <p>Chargement...</p>;
  }

  if (!serieData.data) return <p>Détails non disponibles</p>;

  const serie = serieData.data;
  const cast = creditsData.data?.cast || [];
  const recs = recommendationsData.data?.results || [];

  return (
    <div className="body">
      <div className="serie-detail">
        <div
          className="banner"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${serie.backdrop_path})`,
          }}
        >
          <h1>{serie.name}</h1>
          <p>{serie.overview}</p>
        </div>
        <div className="info">
          <p>
            <strong>Genres :</strong>{" "}
            {serie.genres?.map((g) => g.name).join(", ") || "Non renseigné"}
          </p>
          <p><strong>Note :</strong> {serie.vote_average} / 10</p>
          <p><strong>Nombre de saisons :</strong> {serie.number_of_seasons || "?"}</p>
          <p><strong>Nombre d'épisodes :</strong> {serie.number_of_episodes || "?"}</p>
          <p><strong>Première diffusion :</strong> {serie.first_air_date || "?"}</p>
        </div>
        <div className="casting">
          <h2>Casting principal</h2>
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
            type="tv"
          />
        )}
      </div>
    </div>
  );
}
