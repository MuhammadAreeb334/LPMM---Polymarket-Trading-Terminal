import { Route, Routes } from "react-router-dom";
import MarketDetails from "./Pages/MarketDetails";
import MainLayout from "./Layout/MainLayout";
import Dashboard from "./Pages/DashBoard";


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
