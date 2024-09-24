import React, { useEffect } from "react";
import NavbarComponent from "@/components/NavbarComponent";
import apiAuth from "./api/apiAuth";
import apiUpload from "./api/apiUpload";
import formValidate from "@/utils/validation";
import { geistSans, geistMono, registerImg, patternLines, year } from "@/helpers/const";
import { Input, Divider, Button, Select, SelectItem } from "@nextui-org/react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const RegisterPage = () => {
	const router = useRouter();
	const { auth } = apiAuth();
	const { upload } = apiUpload();
	const { validateInput } = formValidate();
	const [email, setEmail] = React.useState("");
	const [name, setName] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [passwordRepeat, setPasswordRepeat] = React.useState("");
	const [role, setRole] = React.useState("");
	const [phoneNumber, setPhoneNumber] = React.useState("");
	const [profilePictureUrl, setProfilePictureUrl] = React.useState(null);
	const [errors, setErrors] = React.useState();
	const [errFile, setErrFile] = React.useState(false);
	const [msgErrFile, setMsgErrFile] = React.useState("");
	const [isVisiblePass, setIsVisiblePass] = React.useState(false);
	const [isVisibleRPass, setIsVisibleRPass] = React.useState(false);
	const toggleVisibilityPass = () => setIsVisiblePass(!isVisiblePass);
	const toggleVisibilityCPass = () => setIsVisibleRPass(!isVisibleRPass);

	useEffect(() => {
		setErrors([]);
	}, ["", email, password, name, passwordRepeat, role]);

	const handleUpload = async (e) => {
		e.preventDefault();

		const file = e.target.files[0];

		if (!file) {
			return;
		} else if (!file.type.startsWith("image/")) {
			setProfilePictureUrl(null);
			setErrFile(true);
			setMsgErrFile("Format file must be jpg, jpeg or png");
			toast.error("The file must be an image in \n jpg, jpeg or png format.");

			return false;
		}

		const dataImage = new FormData();
		dataImage.append("image", file);

		try {
			const res = await upload("upload-image", dataImage);
			setErrFile(false);
			setMsgErrFile("");
			setProfilePictureUrl(res.data.url);
			toast.success("Profile picture uploaded");
			return res.data.url;
		} catch (error) {
			setProfilePictureUrl(null);
			setErrFile(true);
			setMsgErrFile("Format file must be jpg, jpeg or png");
			toast.error("Failed to upload image. \n Maybe the image is too big. \n Try another image.");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			email: e.target.email.value,
			name: e.target.name.value,
			password: e.target.password.value,
			passwordRepeat: e.target.passwordrepeat.value,
			role: e.target.role.value,
			profilePictureUrl: profilePictureUrl,
			phoneNumber: e.target.phonenumber.value,
		};

		setErrors(validateInput("register", email, password, name, passwordRepeat, role));

		for (const key in payload) {
			if (!payload[key]) {
				toast.error("Please input all fields!");
				return;
			}
		}

		if (password === passwordRepeat) {
			const onSubmit = async (payload) => {
				const res = await auth("register", payload);
				return res;
			};

			const res = await onSubmit(payload);

			if (res?.status === 200) {
				toast.success("Registration success");
				setTimeout(() => {
					setProfilePictureUrl(null);
					setEmail("");
					setName("");
					setPassword("");
					setPasswordRepeat("");
					setRole("");
					setPhoneNumber("");
					setErrors("");
					router.push("/login");
				}, 3000);
			} else {
				toast.error("Registration failed. \n This email is already registered. \n Try another email or log in.");
			}
		} else {
			toast.error("Please check both passwords \n and make sure they match!");
			return;
		}
	};

	return (
		<div className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-[family-name:var(--font-geist-sans)]`}>
			<main className="relative flex flex-col flex-wrap">
				<NavbarComponent />
				<div className="absolute inset-x-0 flex flex-wrap min-h-screen p-0 overflow-hidden align-middle">
					<div className="relative w-full px-5 mx-auto md:px-4 xl:max-w-full lg:max-w-7xl md:max-w-5xl sm:max-w-2xl">
						<div className="absolute left-0 right-0 hidden w-8 mx-auto lg:block -bottom-20">
							<div className="absolute z-50 p-6 rounded-full bg-orangejuice -left-32 xl:-left-44 bottom-96 xl:bottom-[28rem] blur-md"></div>
						</div>
						<div className="flex flex-wrap justify-center h-full lg:w-5/6 xl:px-3 lg:mx-auto lg:gap-0">
							{/* layout for image */}
							<div className="flex-col flex-wrap hidden w-3/6 lg:flex">
								<div className="flex flex-col justify-center w-full h-full">
									<div className="relative w-full p-10 mt-20 md:mx-auto bg-primary rounded-xl">
										<img className="absolute top-0 bottom-0 left-0 w-full h-full opacity-20" src={patternLines} alt="pattern lines" width={1920} height={1080} />
										<div className="bg-white border border-gray-50 bg-opacity-40 rounded-xl">
											<div className="relative">
												<div className="mt-4 mb-56 ml-4 text-2xl font-semibold [text-shadow:_3px_3px_#283618] text-white xl:text-4xl xl:mb-64 pb-28 xl:pb-28 w-80 xl:w-96">Start your best journey with us, explore the beautiful world!</div>
												<img className="absolute -left-16 z-50 -bottom-[230px] xl:-bottom-[263px] xl:w-[450px] xl:h-[485px] w-[350px] h-[385px]" src={registerImg} alt="login image" width={450} height={485} />
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* layout for form */}
							<div className="flex flex-col w-full md:mx-auto md:w-7/12 lg:w-6/12 lg:mx-0">
								<div className="flex flex-col justify-center h-full px-4 pt-5 mt-20 md:mt-0 md:px-6 md:pt-24 lg:px-8">
									<div className="sm:mx-auto sm:w-full sm:max-w-sm">
										<h2 className="mx-0 font-bold leading-9 tracking-tight text-center text-gray-700 max-md:text-base max-sm:text-lg md:text-2xl lg:text-xl xl:text-2xl">Register an account</h2>
									</div>

									<div className="my-5 sm:mx-auto sm:w-full sm:max-w-sm">
										<form className="mb-5 space-y-2 md:space-y-3" onSubmit={handleSubmit}>
											<Input type="email" id="email" size="sm" label="Email" name="email" value={email} isRequired className="max-w-full" onChange={(e) => setEmail(e.target.value)} autoComplete="off" variant="bordered" color={errors?.email ? "danger" : "primary"} isInvalid={errors?.email ? true : false} errorMessage={errors?.msgEmail} autoFocus />
											<Input type="text" id="name" size="sm" label="Name" name="name" value={name} isRequired className="max-w-full" onChange={(e) => setName(e.target.value)} autoComplete="off" variant="bordered" color={errors?.name ? "danger" : "primary"} isInvalid={errors?.name ? true : false} errorMessage={errors?.msgName} />
											<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
												<Input
													type={isVisiblePass ? "text" : "password"}
													isRequired
													id="password"
													size="sm"
													label="Password"
													name="password"
													value={password}
													onChange={(e) => setPassword(e.target.value)}
													variant="bordered"
													color={errors?.pass ? "danger" : "primary"}
													isInvalid={errors?.pass ? true : false}
													errorMessage={errors?.msgPass}
													className="max-w-[49%] max-[375px]:max-w-full sm:max-w-full"
													endContent={
														<button className="my-auto focus:outline-none" type="button" onClick={toggleVisibilityPass} aria-label="toggle password visibility">
															{isVisiblePass ? <BsEyeFill className="text-base pointer-events-none text-default-400" /> : <BsEyeSlashFill className="text-base pointer-events-none text-default-400" />}
														</button>
													}
												/>
												<Input
													type={isVisibleRPass ? "text" : "password"}
													isRequired
													id="passwordrepeat"
													size="sm"
													label="Repeat Password"
													name="passwordrepeat"
													value={passwordRepeat}
													onChange={(e) => setPasswordRepeat(e.target.value)}
													variant="bordered"
													color={errors?.rPass ? "danger" : "primary"}
													isInvalid={errors?.rPass ? true : false}
													errorMessage={errors?.msgRPass}
													className="max-w-[49%] max-[375px]:max-w-full sm:max-w-full"
													endContent={
														<button className="my-auto focus:outline-none" type="button" onClick={toggleVisibilityCPass} aria-label="toggle PasswordRepeat visibility">
															{isVisibleRPass ? <BsEyeFill className="text-base pointer-events-none text-default-400" /> : <BsEyeSlashFill className="text-base pointer-events-none text-default-400" />}
														</button>
													}
												/>
											</div>
											<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
												<Select label="Role" id="role" size="sm" isInvalid={errors?.role ? true : false} color={errors?.role ? "danger" : "primary"} errorMessage={errors?.msgRole} placeholder="Select Role" value={role} onChange={(e) => setRole(e.target.value)} className="max-w-[49%] max-[375px]:max-w-full md:max-w-full rounded-md" variant="bordered">
													<SelectItem key="admin">Admin</SelectItem>
													<SelectItem key="user">User</SelectItem>
												</Select>
												<Input id="phonenumber" autoComplete="off" type="text" size="sm" label="Phone Number" name="phonenumber" value={phoneNumber} className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" onChange={(e) => setPhoneNumber(e.target.value)} variant="bordered" color="primary" />
											</div>
											<div className="flex flex-wrap w-full gap-0">
												<label className="block mb-1 text-sm font-normal text-primary dark:text-white" htmlFor="profilepicture">
													Upload profile picture
												</label>
												<input type="file" accept="image/*" onChange={handleUpload} id="profilepicture" name="profilepicture" className="block w-full px-1 py-2 mb-5 text-sm border-2 border-gray-200 rounded-lg cursor-pointer text-primary hover:border-gray-400 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"></input>
											</div>
											<div data-slot="helper-wrapper" className={`${errFile ? "flex" : "hidden"} p-1 relative flex-col gap-1.5`}>
												<div data-slot="error-message" className="text-tiny text-danger">
													{msgErrFile}
												</div>
											</div>
											<Button type="submit" size="md" className="w-full font-semibold rounded-lg" color="primary">
												Register
											</Button>
										</form>
										<div className="relative my-5">
											<Divider />
											<div className="absolute w-full text-center -top-3">
												<span className="w-3/5 px-4 text-sm text-center text-gray-700 bg-gray-50">or continue with</span>
											</div>
										</div>
										<Button className="w-full font-semibold text-gray-700 rounded-lg" variant="ghost">
											<FcGoogle />
											Google
										</Button>
									</div>
								</div>
								<div className="mt-6 mb-4 md:mt-0 lg:mb-10">
									<p className="text-xs text-center text-gray-600 lg:text-right">{`© ${year} De Journey Vacations. All Right Reserved `}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default RegisterPage;
