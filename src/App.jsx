import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import DeveloppementWeb from './pages/DeveloppementWeb';
import HebergementMaintenance from './pages/HebergementMaintenance';
import SeoReferencement from './pages/SeoReferencement';
import Parrainage from './pages/Parrainage';
import Journal from './pages/Journal';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/developpement-web" element={<DeveloppementWeb />} />
            <Route path="/services/hebergement-maintenance" element={<HebergementMaintenance />} />
            <Route path="/services/seo-referencement" element={<SeoReferencement />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/parrainage" element={<Parrainage />} />
            <Route path="/journal" element={<Journal />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
