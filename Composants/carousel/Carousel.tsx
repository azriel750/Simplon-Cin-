import { useFetcher } from "../../src/fetcher";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import "./carousel.css";

type Props = {
  url?: string;   
  items?: any[];  
  title: string;
  type: "movie" | "tv";
};

export default function Carousel({ url, items, title, type }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data, isError, isLoading } = url
    ? useFetcher(url)
    : { data: null, isError: false, isLoading: false };

  const content = items || data?.results || [];

  const scroll = (direction: number) => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      rowRef.current.scrollBy({
        left: direction * clientWidth,
        behavior: "smooth",
      });
    }
  };

  if (url && isLoading) return <p>Chargement {title}...</p>;
  if (isError) return <p>Erreur pour {title} 😢</p>;
  if (!content.length) return <p>Aucun contenu trouvé</p>;

  return (
    <div className="carousel">
      <h2>{title}</h2>
      <button className="carousel-btn left" onClick={() => scroll(-1)}>‹</button>
      <div className="carousel-row" ref={rowRef}>
        {content.map((item: any) => (
          <div
            key={item.id}
            className="movie-card"
            onClick={() => navigate(`/${type}/${item.id}`)}
          >
            <img
              src={
                item.poster_path || item.profile_path
                  ? `https://image.tmdb.org/t/p/w200${item.poster_path || item.profile_path}`
                  : "/fallback.jpg"
              }
              alt={item.title || item.name}
            />
            <p>{item.title || item.name}</p>
          </div>
        ))}
      </div>
      <button className="carousel-btn right" onClick={() => scroll(1)}>›</button>
    </div>
  );
}
