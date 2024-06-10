import React from "react";
import TitleInfo from "../../../components/admin/sociosPage/titleInfo";
import AddAlumn from "../../../components/admin/sociosPage/addAlumn";
import AlumnTable from "../../../components/admin/sociosPage/alumnTable";



function SociosInfo() {
    return (
        <>
            <div>
                <TitleInfo />
                <div className="flex justify-center items-center gap-32 ml-[-50px]">
                <AddAlumn />
                <h1 className="text-4xl text-gray-400">Alumnos Registrados</h1>
                </div>
                <AlumnTable />
            </div>
        </>

    );
}

export default SociosInfo;