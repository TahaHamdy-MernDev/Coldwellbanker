
import AOS from 'aos';
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import ProjectRoutes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import "animate.css/animate.compat.css"
import 'aos/dist/aos.css';
function App() {
  AOS.init();

  return (
    <Router>
    <I18nextProvider i18n={i18n}>
      <ProjectRoutes /> 
    </I18nextProvider>
  </Router>
  )
}

export default App
