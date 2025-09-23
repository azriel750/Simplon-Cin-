import './App.css'
import { Navbar } from '../Composants/acceuil/Navbar'
import Carousel from '../Composants/carousel/Carousel'


function App() {


  return (
    <>
     <Navbar />
     <Carousel genreId={28} genreName="Action" />
    </>
  )
}

export default App
