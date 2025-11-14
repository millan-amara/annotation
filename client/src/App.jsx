import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Jobs from "./pages/Jobs";
import WorkerDashboard from "./pages/WorkerDashboard";
import WorkerJobs from "./pages/WorkerJobs";
import JobDetails from "./pages/JobDetails";
import Payments from "./pages/Payments";
import Capabilities from './pages/Capabilities';
import ScrollToTop from './components/ScrollToTop.jsx';


function App() {

  return (
    <Router>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/user/dashboard" element={<WorkerDashboard />} />
          <Route path="/workerjobs" element={<WorkerJobs />} />
          <Route path="/workerjobs/show" element={<JobDetails />} />
          <Route path="/user/payments" element={<Payments />} />
        </Routes>
    </Router>
  );
}

export default App