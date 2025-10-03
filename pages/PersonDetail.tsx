import { useParams } from "react-router-dom";
import { useFetcher } from "../src/fetcher";
import Carousel from "../Composants/carousel/Carousel";
import type { Person } from "./types";
import "../public/Css/PersonDetail.css";

export default function PersonDetail() {
  const { id } = useParams();
  const apiKey = import.meta.env.VITE_TMDB_KEY;

  const person = useFetcher<Person>(
    `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=fr-FR`
  );

  const credits = useFetcher<any>(
    `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}&language=fr-FR`
  );

  if (person.isLoading || credits.isLoading) return <p>Chargement...</p>;
  if (!person.data) return <p>Impossible de charger les infos</p>;

  const filmography = credits.data?.cast || [];

  return (
    <div className="person-detail">
      <div className="person-header">
        <img
          src={
            person.data.profile_path
              ? `https://image.tmdb.org/t/p/w300${person.data.profile_path}`
              : "/fallback.jpg"
          }
          alt={person.data.name}
        />
        <div className="person-info">
          <h1>{person.data.name}</h1>
          <p><strong>Date de naissance :</strong> {person.data.birthday || "Inconnue"}</p>
          <p><strong>Lieu :</strong> {person.data.place_of_birth || "Inconnu"}</p>
          {person.data.biography && (
            <p className="bio">{person.data.biography}</p>
          )}
        </div>
      </div>

      {filmography.length > 0 && (
        <div className="person-filmography">
          <h2>Filmographie</h2>
          <Carousel
            title="Films & Séries"
            type="movie"
            items={filmography}
          />
        </div>
      )}
    </div>
  );
}
