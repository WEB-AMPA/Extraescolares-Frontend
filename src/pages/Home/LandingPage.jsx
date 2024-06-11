import Navbar from "../../components/Web/navbar/Navbar";
import Hero from "../../components/Web/Carousel/hero"
import ModalCookies from "../../components/Web/modalCookies/modalCookies";
import ActivitiesLanding from "../../components/Web/activities/activities-landing";
import Contact from "../Contact/contact";
import Footer from "../../components/Web/footer/Footer";
import AboutUsLandingPage from "../../components/Web/about-landing/about-landing";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ModalCookies />
      <AboutUsLandingPage />
      <ActivitiesLanding />
      <Contact />
      <Footer />
    </div>
  );
}

export default LandingPage;
