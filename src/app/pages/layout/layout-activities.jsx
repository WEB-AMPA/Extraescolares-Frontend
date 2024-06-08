
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Actividades from '../../components/activities/InformationActivities.jsx';
import ActivitiesCard from '../../components/activities/Activities.jsx';


function About() {
    return (
        <div>
            <Navbar />
            <Actividades/> 
            <ActivitiesCard/>
            <Footer />
        </div>

    );
}

export default About;