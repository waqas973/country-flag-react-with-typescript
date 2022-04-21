import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Country from "./pages/country/Country";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:name" element={<Country />} />
    </Routes>
  );
};

export default Routers;
