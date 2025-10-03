import { useFetcher } from "../../src/fetcher";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import type { MovieResponse, TVResponse, Movie, TVShow } from "../../pages/types";
import "./carousel.css";

type Props = {
  url?: string;   
  items?: Movie[] | TVShow[];  
  title: string;
  type: "movie" | "tv";
  showButtons?: boolean;
};

export default function Carousel({ url, title, type, items, showButtons = true }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


  const { data, isError, isLoading } = url
    ? useFetcher<MovieResponse | TVResponse>(url)
    : { data: null, isError: false, isLoading: false };


  const content = items || (data && "results" in data ? data.results : []) || [];

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

      {showButtons && (
        <button className="carousel-btn left" onClick={() => scroll(-1)}>‹</button>
      )}

      <div className="carousel-row" ref={rowRef}>
        {content.map((item: Movie | TVShow) => (
          <div
            key={item.id}
            className="movie-card"
            onClick={() => navigate(`/${type}/${item.id}`)}
          >
            <img
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                  : "/fallback.jpg"
              }
              alt={type === "movie" ? (item as Movie).title : (item as TVShow).name}
            />
            <p>{type === "movie" ? (item as Movie).title : (item as TVShow).name}</p>
          </div>
        ))}
      </div>

      {showButtons && (
        <button className="carousel-btn right" onClick={() => scroll(1)}>›</button>
      )}
    </div>
  );
}
