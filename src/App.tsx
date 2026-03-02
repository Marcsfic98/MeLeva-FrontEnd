import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./assets/components/navbar/Navbar";

import Footer from "./assets/components/footer/Footer";
import Home from "./assets/pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
