import { Route, Routes } from "react-router-dom";
import MarketDetails from "./pages/MarketDetails.jsx";
import MainLayout from "./Layout/MainLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/market/:id" element={<MarketDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
