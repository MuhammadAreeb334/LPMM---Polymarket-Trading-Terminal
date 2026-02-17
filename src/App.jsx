import { Route, Routes } from "react-router-dom";
import DashBoard from "./Pages/DashBoard";
import MainLayout from "./Layout/MainLayout";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashBoard />} />
      </Route>
    </Routes>
  );
}

export default App;
