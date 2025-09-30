import Carousel from "../Composants/carousel/Carousel";
import { useNavigate } from "react-router-dom";
import { useFetcher } from "../src/fetcher";
import "../public/Css/home.css";

export default function Home() {
  const apiKey = import.meta.env.VITE_TMDB_KEY;
  const navigate = useNavigate();

  const { data, isError, isLoading } = useFetcher(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=1`
  );

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur avec l'API</p>;

  const randomIndex = Math.floor(Math.random() * data.results.length);
  const bannerMovie = data.results[randomIndex];

  const handleClick = () => {
    navigate(`/movie/${bannerMovie.id}`);
  };

  return (
    <body>
      <div className="body">

        <div
          className="banner"
          onClick={handleClick}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            padding: "6rem 2rem",
            cursor: "pointer",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            {bannerMovie.title}
          </h1>
        </div>

        <Carousel
          url={`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=1`}
          title="Films Populaires"
          type="movie"
        />

        <Carousel
          url={`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=fr-FR&page=1`}
          title="Mieux Notés"
          type="movie"
        />

        <Carousel
          url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=fr-FR&page=1`}
          title="À Venir"
          type="movie"
        />
      </div>
    </body>
  );
}
