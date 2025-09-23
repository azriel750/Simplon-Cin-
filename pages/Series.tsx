import Carousel from "../Composants/carousel/Carousel";


export default function Series() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Liste des séries</h1>
      <p>Carrousels des séries par genre à venir...</p>
      <Carousel genreId={28} genreName="Action" />
    </div>
  );
}
