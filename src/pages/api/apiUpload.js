import { apiUrl, apiKey } from "@/helpers/const";
import axios from "axios";
import { getCookie } from "cookies-next";

const apiUpload = () => {
	const upload = async (url, payload) => {
		try {
			const res = await axios.post(`${apiUrl}${url}`, payload, {
				headers: {
					apiKey: `${apiKey}`,
					Authorization: `Bearer ${getCookie("token")} `,
					"Content-Type": "multipart/form-data",
				},
			});

			return res;
		} catch (err) {
			return err;
		}
	};

	return { upload };
};

export default apiUpload;
