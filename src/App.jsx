import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MainPage from "./MainPage";
import LoginPage from "./Pages/LoginPage";
import useMyStore from "./Store/my-store";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const state =useMyStore();
  return (
    <div className="h-screen">
      {state.token ? (
        <div>
              <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex h-full">
        <Sidebar collapsed={collapsed} />
      <MainPage />

      </div>

        </div>
      ):<LoginPage/>}
    </div>
  );
}

export default App;
