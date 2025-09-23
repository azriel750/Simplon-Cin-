import { useParams } from "react-router-dom";

export default function Movie() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold"> Détail du film</h1>
      <p>ID du Movie : {id}</p>
    </div>
  );
}
