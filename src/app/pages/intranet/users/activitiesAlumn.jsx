import React from "react";
import TitleInfo from "../../../components/admin/alumnPage/titleInfo";
import AddActivitie from "../../../components/admin/activitiesAlumn/addActivitieButtom";


function ActivitiesAlumn() {
    return (
        <>
            <div>
                <TitleInfo />
                <div className="flex justify-center items-center gap-32 ml-[-50px]">
                <h1 className="text-4xl text-gray-400">Gestion de Alumno por actividad</h1>
                <AddActivitie />
           </div>
            </div>
        </>

    );
}

export default ActivitiesAlumn;