import React from "react";

export default function formValidate() {
	const [errors, setErrors] = React.useState([]);

	const validateInput = (action, email, password, name, passwordRepeat, role, phoneNumber) => {
		const regex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;

		if (action === "login") {
			if (email === "") {
				errors["email"] = true;
				errors["msgEmail"] = "Email is required";

				if (password === "") {
					errors["pass"] = true;
					errors["msgPass"] = "Password is required";
				} else {
					errors["pass"] = false;
					errors["msgPass"] = "";
				}
			} else if (password === "") {
				if (!regex.test(email)) {
					errors["email"] = true;
					errors["msgEmail"] = "Please enter the valid email";
				} else {
					errors["email"] = false;
					errors["msgEmail"] = "";
					errors["pass"] = true;
					errors["msgPass"] = "Password is required";
				}
			} else {
				errors["email"] = false;
				errors["msgEmail"] = "";
				errors["pass"] = false;
				errors["msgPass"] = "";

				if (!regex.test(email)) {
					errors["email"] = true;
					errors["msgEmail"] = "Please enter the valid email";
				}
			}
		} else if (action === "register") {
			if (email === "") {
				errors["email"] = true;
				errors["msgEmail"] = "Email must be filled";
			} else if (!regex.test(email)) {
				errors["email"] = true;
				errors["msgEmail"] = "Please enter the valid email";
			} else {
				errors["email"] = false;
				errors["msgEmail"] = "";
			}

			if (name === "") {
				errors["name"] = true;
				errors["msgName"] = "Name must be filled";
			} else {
				errors["name"] = false;
				errors["msgName"] = "";
			}

			if (password === "") {
				errors["pass"] = true;
				errors["msgPass"] = "Password must be filled";
			} else {
				errors["pass"] = false;
				errors["msgPass"] = "";
			}

			if (passwordRepeat === "") {
				errors["rPass"] = true;
				errors["msgRPass"] = "Repeat password must be filled";
			} else {
				errors["rPass"] = false;
				errors["msgRPass"] = "";
			}

			if (role === "") {
				errors["role"] = true;
				errors["msgRole"] = "Please select role user";
			} else {
				errors["role"] = false;
				errors["msgRole"] = "";
			}

			if (phoneNumber === "") {
				errors["phoneNumber"] = true;
				errors["msgPhoneNumber"] = "Phone number must be filled";
			} else {
				errors["phoneNumber"] = false;
				errors["msgPhoneNumber"] = "";
			}
		}

		setErrors(errors);

		return errors;
	};

	return { validateInput };
}
