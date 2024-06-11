import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/Carousel/hero"
import ModalCookies from "../../components/modalCookies/modalCookies";
import ActivitiesLanding from "../../components/activities/activities-landing";
import Contact from "../Contact/contact";
import Footer from "../../components/footer/Footer";
import AboutUsLandingPage from "../../components/about-landing/about-landing";

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
