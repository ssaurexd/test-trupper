import axios from "axios";

export const api = axios.create({
	baseURL: 'https://api.datos.gob.mx/v1/calidadAire'
})