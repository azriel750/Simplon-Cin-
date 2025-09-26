import { useParams } from "react-router-dom";
import { useFetcher } from "../src/fetcher";
import "./Film.css";

export default function Film() {
  const { id } = useParams<{ id: string }>();
  const apiKey = import.meta.env.VITE_TMDB_KEY;

  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr-FR`;
  console.log("Fetch URL:", url);

  const { data, isError, isLoading } = useFetcher(url);

  if (isLoading) return <p>Chargement du film...</p>;
  if (isError) return <p>Erreur lors du chargement du film.</p>;

  console.log("Film data:", data);

  if (!data) return <p>Aucun détail trouvé pour ce film.</p>;

  return (
    <div className="film-detail" style={{ padding: "2rem" }}>
      <h1>{data.title}</h1>
      <p><strong>Date de sortie :</strong> {data.release_date}</p>
      <p><strong>Note :</strong> {data.vote_average} / 10</p>
      <p>{data.overview}</p>
      {data.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title}
          style={{ marginTop: "1rem", borderRadius: "10px" }}
        />
      )}
    </div>
  );
}
