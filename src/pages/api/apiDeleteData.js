import axios from "axios";
import { getCookie } from "cookies-next";

const apiDeleteData = () => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	const apiKey = process.env.NEXT_PUBLIC_API_KEY;

	const deleteData = async (url) => {
		try {
			const res = await axios.delete(`${apiUrl}${url}`, {
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

	return { deleteData };
};

export default apiDeleteData;
