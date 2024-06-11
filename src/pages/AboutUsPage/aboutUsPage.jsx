

import AboutUs from '../../components/Web/about-us/about-us';
import Mision from '../../components/Web/about-us/mision';
import Equipment from '../../components/Web/about-us/equipment';
import Profiles from '../../components/Web/about-us/profiles';
import Navbar from '../../components/Web/navbar/Navbar';
import Footer from '../../components/Web/footer/Footer';

function AboutUsPage() {
    return (
        <div>
            <Navbar />
            <AboutUs />
            <Mision />
            <Equipment />
            <Profiles />
            <Footer />
        </div>

    );
}

export default AboutUsPage;