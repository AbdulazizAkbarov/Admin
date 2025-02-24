import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MainPage from "./MainPage";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen">
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex h-full">
        <Sidebar collapsed={collapsed} />
      <MainPage />

      </div>

    </div>
  );
}

export default App;
