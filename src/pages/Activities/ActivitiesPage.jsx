
import Navbar from '../../components/Web/navbar/Navbar.jsx';
import Footer from '../../components/Web/footer/Footer.jsx';
import Actividades from '../../components/Web/activities/InformationActivities.jsx';
import ActivitiesCard from '../../components/Web/activities/ActivitiesCards.jsx';


function ActivitiesPage() {
    return (
        <div>
            <Navbar />
            <Actividades/> 
            <ActivitiesCard/>
            <Footer />
        </div>

    );
}

export default ActivitiesPage;