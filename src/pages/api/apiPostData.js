import axios from "axios";
import { getCookie } from "cookies-next";

const apiPostData = () => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	const apiKey = process.env.NEXT_PUBLIC_API_KEY;

	const postData = async (url, payload) => {
		try {
			const res = await axios.post(`${apiUrl}${url}`, payload, {
				headers: {
					apiKey: `${apiKey}`,
					Authorization: `Bearer ${getCookie("token")} `,
				},
			});

			return res;
		} catch (err) {
			return err;
		}
	};

	return { postData };
};

export default apiPostData;
