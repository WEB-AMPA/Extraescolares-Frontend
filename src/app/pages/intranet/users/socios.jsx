import React from "react";
import SociosTable from '../../../components/admin/users/sociosTable'
import CrearSocio from "../../../components/admin/users/crearSocio";


function Socios () {
    return ( 
<>
<div>
<h1 className="flex justify-start text-3xl p-5 m-4 font-bold">Gestión de Socios</h1>
<CrearSocio />
<SociosTable />
</div>
</>
    
);
}

export default Socios;