import React from "react";
import SociosTable from '../../components/admin/users/sociosTable'
import CrearSocio from "../../components/admin/users/createSocio";
import SearchBar from "../../components/admin/users/searchBar";


function Socios() {
    return (
        <>
            <div>
                <h1 class="flex justify-center text-3xl p-5 m-4 font-bold ml-[-600px]">Gestión de Socios</h1>
                <div className="flex justify-center items-center ml-[-350px]">
                    <CrearSocio />
                    <SearchBar />
                </div>
                <SociosTable />
            </div>
        </>

    );
}

export default Socios;