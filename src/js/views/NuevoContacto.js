import React, { useState, useEffect, useContext } from 'react' // Para hacer que el componente sea Consumer Paso 1 Importo useContext
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom'
import { Context } from '../store/appContext' //Paso 2 importo Context
const NuevoContacto = ({ contactId }) => {
    //logica
    const { store, actions } = useContext(Context); // Paso 3 llamo a store, action 
    const context = useContext(Context);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();


    const envioDatos = () => {
        const nuevoContacto = { name, email, phone, address };

        //METODO POST ENVIO DE DATOS AL SERVIDOR

        if (!contactId) {
            context.actions.envioDatosServidor(nuevoContacto)

        } else {
            context.actions.actualizarContacto(nuevoContacto, contactId)
        }
        navigate("/")

    }

    useEffect(() => {
        if (store.contactos) {
            if (store.contactos.length > 0 && contactId) {
                const result = store.contactos.find(item => item.id == contactId)
                if (result) {
                    setName(result.name)
                    setAddress(result.address)
                    setEmail(result.email)
                    setPhone(result.phone)
                }
            }

        }

    }, [store.contactos])

    return (
        <div className="container border border-light-subtle p-3">
            <h2 className='text-center'>{!contactId ? "Añadir Nuevo Contacto" : `Editar Contacto: ${name}`}</h2>

            <h5>Nombre</h5>
            <input className='form-control'
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <h5>Email</h5>
            <input className='form-control'
                type="text"
                placeholder='Ingrese su Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <h5>Teléfono</h5>
            <input className='form-control'
                type="text"
                placeholder='Ingrese su teléfono'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />

            <h5>Domicilio</h5>
            <input className='form-control'
                type="text"
                placeholder='Ingrese su domicilio'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />

            <button className='btn btn-primary mt-3' onClick={() => {
                //hace un post con la informacion de contacto
                envioDatos();
                //METOOD GET  
                // el navigate en este caso deberia usarse en el segundo .then() y me lleva al home
                // navigate("/")

            }

            }>{!contactId ? "Crear Contacto" : "Editar Contacto"}</button>

            <p><a className='link-opacity-100' href="/">Volver a contactos</a>
            </p>

        </div>
    )
}

export default NuevoContacto