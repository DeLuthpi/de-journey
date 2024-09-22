import React from "react";

export default function formValidate() {
	const [errors, setErrors] = React.useState([]);

	const validateInput = (email, password) => {
		const regex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;

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

		setErrors(errors);

		return errors;
	};

	return { validateInput };
}
