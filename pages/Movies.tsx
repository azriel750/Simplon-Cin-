import Carousel from "../Composants/carousel/Carousel";
import { useFetcher } from "../src/fetcher";


export default function Movies() {
    const apiKey = import.meta.env.VITE_TMDB_KEY;
const { data: genres, isError } = useFetcher(
  `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=fr-FR`
);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold"> Liste des films</h1>
      <p>Carrousels des films par genre à venir...</p>
{genres?.genres.slice(0, 5).map((genre) => (
  <Carousel
    key={genre.id}
    url={`https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&api_key=${apiKey}&language=fr-FR&page=1`}
    title={genre.name}
  />
))}
  
    </div>
  );
}
