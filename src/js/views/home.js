import React, { useEffect, useContext } from "react"; //PASO 1 
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"; //PASO 2 
import ContactCard from "./contactCard";



export const Home = () => {
	//Logica 

	const { store, actions } = useContext(Context);//PASO 3 

	useEffect(() => {

	}, [])

	return (
		<div className="text-center mt-5">
			<Link to="/nuevo-contacto">
				<button className="btn btn-success">Agregar Contacto</button>
			</Link>

			{store.contactos.map((contacto) => {
				return (

					<ContactCard key={contacto.id} contacto={contacto} />
				)

			})}

		</div>

	)
};

