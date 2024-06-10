import React from "react";
import SociosTable from '../../../components/admin/users/sociosTable'
import CrearSocio from "../../../components/admin/users/crearSocio";
import SearchBar from "../../../components/admin/users/searchBar";


function Socios () {
    return ( 
<>
<div>
<h1 className="flex justify-start text-3xl p-5 m-4 font-bold">Gestión de Socios</h1>
<div className="flex justify-center items-center">
      <CrearSocio />
      <SearchBar />
    </div>
<SociosTable />
</div>
</>
    
);
}

export default Socios;