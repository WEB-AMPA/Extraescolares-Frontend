import React from "react";
/* import TitleInfo from "../../../components/admin/alumnPage/titleInfo"; */
import AddActivitie from "../../../components/admin/activitiesAlumn/addActivitieButtom";
import ActivitiesTable from "../../../components/admin/activitiesAlumn/activitiesTable";


function ActivitiesStudent() {
    return (
        <>
            <div>
               {/*  <TitleInfo /> */}
                <div className="flex justify-center items-center gap-32 ml-[-50px]">
                    <h1 className="text-4xl text-gray-400">Gestion de Alumno por actividad</h1>
                    <AddActivitie />
                </div>
                <div className="flex gap-5 justify-center m-2 p-2">
                    <div className="flex flex-row gap-1">
                        <h3 className="font-bold">Nombre Completo:</h3>
                        <p>Julieta Garcia Gonzalez</p>
                    </div>
                    <div className="flex flex-row gap-1">
                        <h3 className="font-bold">Curso:</h3>
                        <p>2º Primaria</p>
                    </div>
                    <div className="flex flex-row gap-1">
                        <h3 className="font-bold">Centro:</h3>
                        <p>CEIP Ciudad de los Ángeles</p>
                    </div>
                </div>
                <ActivitiesTable />
            </div>
        </>

    );
}

export default ActivitiesStudent;