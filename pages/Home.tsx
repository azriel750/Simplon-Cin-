import Carousel from "../Composants/carousel/Carousel";
import { useNavigate } from "react-router-dom";
import { useFetcher } from "../src/fetcher";
import type { MovieResponse, Movie } from "./types";
import "../public/Css/Home.css";

export default function Home() {
  const apiKey = import.meta.env.VITE_TMDB_KEY;
  const navigate = useNavigate();

  const { data, isError, isLoading } = useFetcher<MovieResponse>(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=1`
  );

  if (isLoading) return <p style={{ color: "white", padding: "20px" }}>Chargement...</p>;
  if (isError || !data) return <p style={{ color: "white", padding: "20px" }}>Erreur avec l'API 😢</p>;

  const randomIndex = Math.floor(Math.random() * data.results.length);
  const bannerMovie: Movie = data.results[randomIndex];

  const handleClick = () => {
    navigate(`/movie/${bannerMovie.id}`);
  };

  return (
    <div className="home-page">
      <div
        className="banner"
        onClick={handleClick}
        style={{
          backgroundImage: `linear-gradient(to top, rgba(18,18,18,1) 20%, rgba(18,18,18,0.1) 100%), url(https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "6rem 2rem",
          cursor: "pointer",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{bannerMovie.title}</h1>
        <p style={{ maxWidth: "700px", lineHeight: 1.4 }}>{bannerMovie.overview}</p>
      </div>
      <Carousel
        url={`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=1`}
        title="Films Populaires"
        type="movie"
        showButtons={true}
      />

      <Carousel
        url={`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=fr-FR&page=1`}
        title="Mieux Notés"
        type="movie"
        showButtons={true}
      />

      <Carousel
        url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=fr-FR&page=1`}
        title="À Venir"
        type="movie"
        showButtons={true}
      />
    </div>
  );
}
