import { useFetcher } from "../../src/fetcher";
import { useNavigate } from "react-router-dom";
import "./carousel.css";

type Props = {
  url: string;
  title: string;
  type: "movie" | "tv"; 
};

export default function Carousel({ url, title, type }: Props) {
  const { data, isError, isLoading } = useFetcher(url);
  const navigate = useNavigate();

  if (isLoading) return <p>Chargement {title}...</p>;
  if (isError) return <p>Erreur pour {title} 😢</p>;

  return (
    <div className="carousel">
      <h2>{title}</h2>
      <div className="carousel-row">
        {data.results.map((item: any) => (
          <div
            key={item.id}
            className="movie-card"
            onClick={() => navigate(`/${type}/${item.id}`)} 
          >
            <img
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                  : "/fallback.jpg"
              }
              alt={item.title || item.name}
            />
            <p>{item.title || item.name}</p> 
          </div>
        ))}
      </div>
    </div>
  );
}
