import React from "react";

export default function formValidate() {
	const [invalidEmail, setInvalidEmail] = React.useState();
	const [invalidPassword, setInvalidPassword] = React.useState();

	const validateEmail = (payload) => {
		const regex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;

		if (payload === "") {
			setInvalidEmail({ err: true, msg: "Email must be filled" });
		} else {
			if (!regex.test(payload)) {
				setInvalidEmail({ err: true, msg: "Invalid Email" });
			} else {
				setInvalidEmail({ err: false, msg: "" });
			}
		}

		return invalidEmail;
	};

	const validatePassword = (payload) => {
		if (payload === "") {
			setInvalidPassword({ err: true, msg: "Password must be filled" });
		} else {
			setInvalidPassword({ err: false, msg: "" });
		}

		return invalidPassword;
	};

	return { validateEmail, validatePassword };
}
