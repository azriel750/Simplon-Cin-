import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold text-red-600">404 - Page non trouvée</h1>
      <p className="mt-4">
        Retour à la <Link to="/" className="text-blue-400 underline">page d’accueil</Link>
      </p>
    </div>
  );
}
