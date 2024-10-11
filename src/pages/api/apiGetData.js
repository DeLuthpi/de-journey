import axios from "axios";
import { getCookie } from "cookies-next";

const apiGetData = () => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	const apiKey = process.env.NEXT_PUBLIC_API_KEY;

	const getData = async (url, callback) => {
		try {
			const res = await axios.get(`${apiUrl}${url}`, {
				headers: {
					apiKey: `${apiKey}`,
				},
			});

			callback(res);
		} catch (err) {
			console.log(err);
		}
	};

	const getDataAuth = async (url, callback) => {
		try {
			const res = await axios.get(`${apiUrl}${url}`, {
				headers: {
					apiKey: `${apiKey}`,
					Authorization: `Bearer ${getCookie("token")} `,
				},
			});

			callback(res);
		} catch (err) {
			console.log(err);
		}
	};

	return { getData, getDataAuth };
};

export default apiGetData;
