import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Jobs from "./pages/Jobs";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";


function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>

        {/* <WhatsAppButton />
        <Footer /> */}
    </Router>
  );
}

export default App