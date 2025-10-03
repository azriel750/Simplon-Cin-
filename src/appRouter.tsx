import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "../Composants/acceuil/Navbar";
import PersonDetail from "../pages/PersonDetail"
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Series from "../pages/Series"; 
import Serie from "../pages/Serie"; 
import Film from "../pages/Film";
import NotFound from "../pages/NotFound";


export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/tv/:id" element={<Serie />} />
        <Route path="/movie/:id" element={<Film />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/person/:id" element={<PersonDetail />} />
      </Routes>
    </Router>
  );
}
