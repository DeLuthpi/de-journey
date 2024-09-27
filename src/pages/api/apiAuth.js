import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { apiUrl, apiKey } from "@/helpers/const";

export default function apiAuth() {
	// Login and Register
	const auth = async (url, payload) => {
		try {
			const res = await axios.post(`${apiUrl}${url}`, payload, {
				headers: {
					apiKey: `${apiKey}`,
				},
			});

			if (url === "login") {
				setCookie("token", res.data.token);
			}

			return res;
		} catch (err) {
			return err;
		}
	};

	// Get User Logged in
	const userLog = async (url, callback) => {
		try {
			const res = await axios.get(`${apiUrl}${url}`, {
				headers: {
					apiKey: `${apiKey}`,
					Authorization: `Bearer ${getCookie("token")}`,
				},
			});

			callback(res?.data.data);
		} catch (err) {
			return err;
		}
	};

	return { auth, userLog };
}
