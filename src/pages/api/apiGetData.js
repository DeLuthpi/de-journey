import axios from "axios";

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

	return { getData };
};

export default apiGetData;
