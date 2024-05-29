// No import needed since React is not used in this file

import AboutUs from '../../components/about-us/about-us';
import Mision from '../../components/about-us/mision';
import Equipment from '../../components/about-us/equipment';
import Profiles from '../../components/about-us/profiles';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

function About() {
    return (
        <div>
            <Navbar />
            <AboutUs />
            <Mision />
            <Equipment />
            <Profiles />
            <Footer />
        </div>
    )
}

export default About;