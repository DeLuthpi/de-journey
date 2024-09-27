import { apiUrl, apiKey } from "@/helpers/const";
import axios from "axios";

const apiGetData = () => {
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

	return { getData };
};

export default apiGetData;
