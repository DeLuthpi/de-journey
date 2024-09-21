import axios from "axios";
import { getCookie } from "cookies-next";

const apiUpload = () => {
	const upload = async (url, payload) => {
		try {
			const res = await axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`, payload, {
				headers: {
					apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
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
