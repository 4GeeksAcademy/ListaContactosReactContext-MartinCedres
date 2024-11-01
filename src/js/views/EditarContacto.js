import React from 'react'
import { useParams } from 'react-router-dom';
import NuevoContacto from './NuevoContacto';

//ESTE COMPONENTE DEBERIA AGREGARLO AL HOME EN EL BOTON DE EDITAR CONTACTO DE LAS TARJETAS 

const EditarContacto = () => {
    //logica
    const params = useParams()
    console.log(params);

    return (
        <div className='container border border-info'>
            <NuevoContacto contactId={params.contactId} />
        </div>
    )
}

export default EditarContacto