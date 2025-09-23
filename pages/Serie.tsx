import { useParams } from "react-router-dom";

export default function Serie() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Détail de la série</h1>
      <p>ID de la série : {id}</p>
    </div>
  );
}
