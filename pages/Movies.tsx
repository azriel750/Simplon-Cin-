import Carousel from "../Composants/carousel/Carousel";
import { useFetcher } from "../src/fetcher";
import type { Genre } from "./types";

export default function Movies() {
  const apiKey = import.meta.env.VITE_TMDB_KEY;

  // Fetch des genres
  const { data: genres, isError, isLoading } = useFetcher<{ genres: Genre[] }>(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=fr-FR`
  );

  if (isLoading) return <p style={{ color: "white", padding: "20px" }}>Chargement genres...</p>;
  if (isError || !genres) return <p style={{ color: "white", padding: "20px" }}>Erreur genres 😢</p>;

  return (
    <div className="movies-page" style={{ padding: "1.5rem" }}>
      {genres.genres.slice(0, 5).map((genre) => (
        <div key={genre.id} className="genre-carousel">
          <Carousel
            url={`https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&api_key=${apiKey}&language=fr-FR&page=1`}
            title={genre.name}
            type="movie"
            showButtons={true} 
          />
        </div>
      ))}
    </div>
  );
}
