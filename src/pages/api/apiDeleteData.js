import axios from "axios";
import { apiUrl, apiKey } from "@/helpers/const";
import { getCookie } from "cookies-next";

const apiDeleteData = () => {
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
