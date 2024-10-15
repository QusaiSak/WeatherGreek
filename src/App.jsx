import { Route, Routes } from "react-router-dom";
import PoseidonDashboard from "./components/GreekDashboard";
import { Navbar } from "./components/Navbar";
import Leaderboard from "./components/Leader";
import Home from "./components/pages/Home";
import RainfallReportForm from "./components/Form";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/dashboard" element={<PoseidonDashboard />} />
      <Route path="/form" element={<RainfallReportForm/>} />
      <Route path="/lead" element={<Leaderboard/>} />
    </Routes>
      
    </>
    
  );
}

export default App;
