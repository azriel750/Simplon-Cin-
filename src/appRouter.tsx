import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Series from "../pages/Series";
import Film from "../pages/Film"
import NotFound from "../pages/NotFound";
import { Navbar } from "../Composants/acceuil/Navbar";

export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/serie/:id" element={<Series />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
