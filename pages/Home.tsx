
import { useNavigate } from "react-router-dom";
import { useFetcher } from "../src/fetcher";
import Carousel from "../Composants/carousel/Carousel";

export default function Home() {
  const apiKey = import.meta.env.VITE_TMDB_KEY;
  const navigate = useNavigate();


  const { data, isError, isLoading } = useFetcher(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=1`
  );

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur avec l’API</p>;

  const randomIndex = Math.floor(Math.random() * data.results.length);
  const bannerMovie = data.results[randomIndex];

  return (
    <div>
      <div className="banner" style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "4rem"
      }}>
        <h1>{bannerMovie.title}</h1>
        <button onClick={() => navigate(`/film/${bannerMovie.id}`)}>
          Voir le film
        </button>
      </div>


      <Carousel 
        url={`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=1`} 
        title="Films Populaires" 
      />

      <Carousel 
        url={`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=fr-FR&page=1`} 
        title="Mieux Notés" 
      />

      <Carousel 
        url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=fr-FR&page=1`} 
        title="À Venir" 
      />
    </div>
  );
}
