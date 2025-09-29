import Carousel from "../Composants/carousel/Carousel";
import { useParams, useNavigate } from "react-router-dom";
import { useFetcher } from "../src/fetcher";
import "./Serie.css";

export default function SerieDetail() {
  const { id } = useParams();
  const apiKey = import.meta.env.VITE_TMDB_KEY;
  const navigate = useNavigate();

  const serieData = useFetcher(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=fr-FR`
  );

  const creditsData = useFetcher(
    `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}&language=fr-FR`
  );

  const recommendationsData = useFetcher(
    `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${apiKey}&language=fr-FR`
  );

  if (
    serieData.isLoading ||
    creditsData.isLoading ||
    recommendationsData.isLoading
  )
    return <p>Chargement...</p>;

  if (!serieData.data) return <p>Détails non disponibles</p>;

  const serie = serieData.data;
  const credits = creditsData.data;
  const recommendations = recommendationsData.data;

  return (
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
          <strong>Genres :</strong> {serie.genres.map((g: any) => g.name).join(", ")}
        </p>
        <p>
          <strong>Note :</strong> {serie.vote_average} / 10
        </p>
        <p>
          <strong>Nombre de saisons :</strong> {serie.number_of_seasons}
        </p>
        <p>
          <strong>Nombre d'épisodes :</strong> {serie.number_of_episodes}
        </p>
        <p>
          <strong>Première diffusion :</strong> {serie.first_air_date}
        </p>
      </div>
      <div className="casting">
        <h2>Casting principal</h2>
        <div className="casting-row">
          {credits?.cast?.slice(0, 10).map((actor: any) => (
            <div key={actor.id} className="actor-card">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "/fallback.jpg"
                }
                alt={actor.name}
              />
              <p>Interprète:{actor.name}</p>
              <span>Rôle :{actor.character}</span>
            </div>
          ))}
        </div>
      </div>
      {recommendations?.results?.length > 0 && (
        <Carousel
          url={`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${apiKey}&language=fr-FR`}
          title="Recommandations"
          type="tv"
        />
      )}
    </div>
  );
}
