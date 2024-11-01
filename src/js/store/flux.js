const apiUrl = "https://playground.4geeks.com/contact/"
const getState = ({ getStore, getActions, setStore }) => {
	return {
		//STORE: DONDE SE GUARDAN LOS DATOS 
		store: {
			contactos: [] //para almacenar datos de contactos 
			/*demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]*/
		},
		//ACTIONS: FUNCIONES PARA MODIFICAR EL STORE. 
		actions: {

			traerDatosServidor: () => {

				fetch(apiUrl + "agendas/Martin1982/contacts", {
					method: "GET"
				})
					.then((respuesta) => {
						return respuesta.json()
					})
					.then((data) => {
						setStore({ contactos: data.contacts })
						console.log(data);
					})
					.catch((error) => {
						return error;
					}
					)
			},

			envioDatosServidor: (contacto) => {

				fetch(apiUrl + 'agendas/Martin1982/contacts', {
					method: "POST",

					headers: {
						"content-Type": "application/json"
					},
					body: JSON.stringify(contacto),
				})
					.then((respuesta) => {
						if (respuesta.ok) {
							return respuesta.json(); //devuelve la respuesta como JSON
						}
					})
					.then((data) => {
						if (data) {
							setStore({ contactos: getStore().contactos.concat(data) })
						}
						console.log(data); //maneja los datos de la respuesta
					})
					.catch((error) => {
						return error
					})
			},

			actualizarContacto: (contacto, id) => {

				fetch(apiUrl + 'agendas/Martin1982/contacts/' + id, {
					method: "PUT",

					headers: {
						"content-Type": "application/json"
					},
					body: JSON.stringify(contacto),
				})
					.then((respuesta) => {
						if (respuesta.ok) {
							return respuesta.json(); //devuelve la respuesta como JSON
						}
					})
					.then((data) => {
						if (data) {
							setStore({ //BUSCO EL CONTACTO CON EL MISMO ID DEL QUE EDITAR, SI COINCIDE CON EL ID RETORNO EL YA EDITADO Y DE LO CONTRARIO RETORNO SIN EDITAR
								contactos: getStore().contactos.map(item => {
									if (item.id == id) {
										return data
									}
									return item
								})
							})
						}
						console.log(data); //maneja los datos de la respuesta
					})
					.catch((error) => {
						return error
					})
			},


			//metodo delete
			eliminarContacto(id) {
				fetch(`${apiUrl}agendas/Martin1982/contacts/${id}`, {
					method: "DELETE",
				})
					.then((respuesta) => {
						if (respuesta.ok) {
							getActions().traerDatosServidor()

						} else {
							console.error("Error al eliminar el contacto");
						}
					})
					.catch((error) => console.error(error));
			}


		}
	};
};

export default getState;
