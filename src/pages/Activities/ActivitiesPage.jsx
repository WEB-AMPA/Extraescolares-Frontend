
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Actividades from '../../components/activities/InformationActivities.jsx';
import ActivitiesCard from '../../components/activities/ActivitiesCards.jsx';


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