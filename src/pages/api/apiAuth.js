import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

export default function apiAuth() {
	// Login and Register
	const auth = async (url, payload) => {
		try {
			const res = await axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`, payload, {
				headers: {
					apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
				},
			});

			setCookie("token", res.data.token);
			return res;
		} catch (err) {
			return err;
		}
	};

	// Login User and Logout User
	const userLog = async (url) => {
		try {
			const res = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`, {
				headers: {
					apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
					Authorization: `Bearer ${getCookie("token")}`,
				},
			});

			return res;
		} catch (err) {
			return err;
		}
	};

	return { auth, userLog };
}
