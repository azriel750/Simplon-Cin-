import Carousel from "../Composants/carousel/Carousel";
import { useFetcher } from "../src/fetcher";
import type { Genre } from "./types";

export default function Serie() { 
  const apiKey = import.meta.env.VITE_TMDB_KEY;


  const { data: genres, isError, isLoading } = useFetcher<{ genres: Genre[] }>(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=fr-FR`
  );

  if (isLoading) return <p style={{ color: "white", padding: "20px" }}>Chargement genres TV...</p>;
  if (isError || !genres) return <p style={{ color: "white", padding: "20px" }}>Erreur genres TV 😢</p>;

  return (
    <div className="series-page" style={{ padding: "1.5rem" }}>
      {genres.genres.slice(0, 5).map((genre) => (
        <div key={genre.id} className="genre-carousel">
          <Carousel
            url={`https://api.themoviedb.org/3/discover/tv?with_genres=${genre.id}&api_key=${apiKey}&language=fr-FR&page=1`}
            title={genre.name}
            type="tv"
            showButtons={true}  
          />
        </div>
      ))}
    </div>
  );
}
