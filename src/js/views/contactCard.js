import React, { useEffect, useContext } from 'react' // PASO 1 
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext'    // PASO 2 IMPORTO CONTEXTO 
import perfil from '../../img/perfil.jpg';


const ContactCard = ({ contacto }) => {
    const { store, actions } = useContext(Context); // PASO  3 LLAMO A STORE, ACTION 

    return (

        <div className='contact-card' style={{ maxWidth: '900px' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={perfil} className="img-fluid  rounded-circle" width="120" height="120" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{contacto.name}</h5>
                        <p className="card-text">
                            <i className="fa fa-map-marker" aria-hidden="true"></i> {contacto.address} <br />
                            <i className="fa fa-phone" aria-hidden="true"></i> {contacto.phone}<br />
                            <i className="fa fa-envelope" aria-hidden="true"></i> {contacto.email}
                        </p>
                        <div className="d-flex justify-content-end">
                            <Link to={`/editar-contacto/${contacto.id}`} className="btn btn-primary me-2">Editar</Link>
                            <button className="btn btn-danger" onClick={() => actions.eliminarContacto(contacto.id)}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        //   <div className='contact-card'>
        //      <p>Nombre: {contacto.name} </p>
        //     <p>Email: {contacto.email} </p>
        //    <p>Telefono: {contacto.phone} </p>
        //   <p>Direccion: {contacto.addres} </p>
        // </div>
    );

};

export default ContactCard










