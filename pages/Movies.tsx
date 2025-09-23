import Carousel from "../Composants/carousel/Carousel";


export default function Movies() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold"> Liste des films</h1>
      <p>Carrousels des films par genre à venir...</p>
         <Carousel genreId={28} genreName="Action" />
             <Carousel genreId={35} genreName="Comédie" />
             <Carousel genreId={18} genreName="Drame" />
             <Carousel genreId={10749} genreName="Romance" />
             <Carousel genreId={27} genreName="Horreur" />
    </div>
  );
}
