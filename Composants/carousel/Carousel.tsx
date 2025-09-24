import { useFetcher } from "../../src/fetcher";
import "./carousel.css";
import { useNavigate } from "react-router-dom";


type Props = {
  url: string;    
  title: string;  
};

export default function Carousel({ url, title }: Props) {
  const { data, isError, isLoading } = useFetcher(url);
  const navigate = useNavigate();

  if (isLoading) return <p>Chargement {title}...</p>;
  if (isError) return <p>Erreur pour {title} 😢</p>;

  return (
    <div className="carousel">
      <h2>{title}</h2>
      <div className="carousel-row">
        {data.results.map((movie: any) => (
          <div 
            key={movie.id} 
            className="movie-card" 
            onClick={() => navigate(`/film/${movie.id}`)}
          >
            <img 
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
              alt={movie.title} 
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
