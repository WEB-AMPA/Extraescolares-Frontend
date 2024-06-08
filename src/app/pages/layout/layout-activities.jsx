
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Actividades from '../../components/activities/SectionActivities';
import ActivitiesCard from '../../components/activities/ActivitiesCard.jsx';


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