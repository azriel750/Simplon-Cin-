import { BrowserRouter as RouterProvider, Routes, Route,  } from "react-router-dom";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Series from "../pages/Series";
import Serie from "../pages/Serie";
import Film from "../pages/Movie";
import NotFound from "../pages/NotFound";
import { Navbar } from "../Composants/acceuil/Navbar";

export default function AppRouter() {
  return (
    <RouterProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/serie/:id" element={<Serie />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </RouterProvider>
  );
}
