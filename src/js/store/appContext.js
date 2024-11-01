import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// No cambies, aquí es donde inicializamos nuestro contexto, de forma predeterminada será nulo.

//CREA EL CONTEXTO
export const Context = React.createContext(null);

// Esta función inyecta la tienda global en cualquier vista/componente donde quieras usarla, inyectaremos el contexto en layout.js, puedes verlo aquí:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = PassedComponent => {
	//CREA EL PROVIDER QUE COMPARTIRA LOS DATOS 
	const StoreWrapper = props => {
		//esto se pasará como valor de contexto CREA EL ESTADO GLOBAL Y LA FUNCION PARA ACTUALIZARLO
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			/**
			 * EDITAR ESTO!
			 * Esta función es equivalente a "window.onLoad", solo se ejecuta una vez durante toda la vida útil de la aplicación.
			 * debe realizar sus solicitudes de ajax o buscar solicitudes de api aquí. No utilice setState() para guardar datos en el
			 * almacenar, en su lugar utilice acciones, como esta:
			 *
			 * state.actions.loadSomeData(); <---- llamar a esta función desde las acciones de flux.js
			 * 
			 *
			 **/
			//TRAIGO DATOS DEL SERVIDOR
			state.actions.traerDatosServidor()

		}, []);

		// El valor inicial del contexto ya no es nulo, sino el estado actual de este componente,
		// el contexto ahora tendrá disponibles las funciones getStore, getActions y setStore, porque fueron declaradas
		// sobre el estado de este componente

		//CREA EL CODIGO DEL ESTADO 
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
