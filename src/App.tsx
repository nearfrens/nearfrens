
import { AboutPage } from "./components/about/aboutPage";
import { MapPage } from "./components/map/mapPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";


function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <MapPage/> } />
            <Route path="/about" element={ <AboutPage />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
