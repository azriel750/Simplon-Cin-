import { useFetcher } from "../../src/fetcher";
import { useNavigate, useParams } from "react-router-dom";
import "./carousel.css";

type Props = {
  url: string;    
  title: string;  
};

export default function Carousel({ url, title }: Props) {
  const { data, isError, isLoading } = useFetcher(url);
  const navigate = useNavigate();
  const { id } = useParams();
console.log("Film id:", id);

  if (isLoading) return <p>Chargement {title}...</p>;
  if (isError) return <p>Erreur pour {title} </p>;

  return (
    <div className="carousel">
      <h2>{title}</h2>
      <div className="carousel-row">
        {data.results.map((movie: any) => (
          <div 
            key={movie.id} 
            className="movie-card" 
            
           onClick={() => {
  console.log("click movie id:", movie.id);
  navigate(`/film/${movie.id}`);
}}
          >
            <img 
  src={movie.poster_path 
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` 
    : "/fallback.jpg"} 
  alt={movie.title} 
/>
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
