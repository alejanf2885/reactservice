import { BrowserRouter, Routes, Route } from "react-router-dom";
import TablaMultiplicar from "./components/parametro/TablaMultiplicar.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tabla/:numero" element={<TablaMultiplicar />} />
      </Routes>
    </BrowserRouter>
  );
}
