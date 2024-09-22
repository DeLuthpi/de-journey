import React, { useEffect } from "react";
import NavbarComponent from "@/components/NavbarComponent";
import apiAuth from "./api/apiAuth";
import formValidate from "@/utils/validation";
import { geistSans, geistMono, loginImg1, loginImg2, year, loginShape } from "@/helpers/const";
import { Input, Divider, Button } from "@nextui-org/react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const LoginPage = () => {
	const router = useRouter();
	const { auth } = apiAuth();
	const { userLog } = apiAuth();
	const { validateInput } = formValidate();
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [errors, setErrors] = React.useState();
	const [isVisible, setIsVisible] = React.useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	useEffect(() => {
		setErrors([]);
	}, [email, password]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			email: e.target.email.value,
			password: e.target.password.value,
		};

		setErrors(validateInput(email, password));

		if (errors?.email && errors?.pass) {
			toast.error("Login failed. Please try again.");
		} else if (errors?.email) {
			toast.error(`${errors?.msgEmail}`);

			if (errors?.pass) {
				toast.error("Login failed. Please try again.");
			} else {
				toast.error(`${errors?.msgEmail}`);
			}
		} else {
			if (errors?.pass) {
				toast.error(`${errors?.msgPass}`);
			} else {
				const onSubmit = async (payload) => {
					const res = await auth("login", payload);
					return res;
				};

				const res = await onSubmit(payload);

				if (res?.status === 200) {
					toast.success("Login success");
					setTimeout(() => {
						const getUserLogged = async () => {
							const res = await userLog("user");
							return res;
						};

						getUserLogged();
						if (res?.data.data.role === "admin") {
							router.push("/dashboard");
						} else {
							router.push("/");
						}
					}, 1500);
				} else {
					toast.error("Login failed. Please try again.");
				}
			}
		}
	};

	return (
		<div className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-[family-name:var(--font-geist-sans)]`}>
			<main className="relative flex flex-col flex-wrap">
				<NavbarComponent />
				<div className="absolute inset-x-0 flex flex-wrap min-h-screen p-0 overflow-hidden align-middle">
					<div className="relative w-full px-5 mx-auto md:px-4 xl:max-w-full lg:max-w-7xl md:max-w-5xl sm:max-w-2xl">
						<div className="flex flex-wrap justify-center h-full lg:gap-20 xl:gap-52">
							{/* layout for form */}
							<div className="flex flex-col w-full md:mx-auto md:w-7/12 lg:w-5/12 lg:mx-0">
								<div className="flex flex-col justify-center h-full px-6 pt-5 md:pt-20 lg:px-8">
									<div className="sm:mx-auto sm:w-full sm:max-w-sm">
										<h2 className="mx-10 text-sm font-bold leading-9 tracking-tight text-center text-gray-700 max-md:text-base max-sm:text-sm md:text-2xl">Login to your account</h2>
									</div>

									<div className="my-5 sm:mx-auto sm:w-full sm:max-w-sm">
										<form className="mb-5 space-y-6" onSubmit={handleSubmit}>
											<Input type="email" size="sm" label="Email" name="email" value={email} className="max-w-full" onChange={(e) => setEmail(e.target.value)} autoComplete="off" variant="bordered" color={errors?.email ? "danger" : "primary"} isInvalid={errors?.email ? true : false} errorMessage={errors?.msgEmail} description="We'll never share your email with anyone else." autoFocus />
											<Input
												type={isVisible ? "text" : "password"}
												size="sm"
												label="Password"
												name="password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												variant="bordered"
												color={errors?.pass ? "danger" : "primary"}
												isInvalid={errors?.pass ? true : false}
												errorMessage={errors?.msgPass}
												className="max-w-full"
												endContent={
													<button className="my-auto focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
														{isVisible ? <BsEyeFill className="text-base pointer-events-none text-default-400" /> : <BsEyeSlashFill className="text-base pointer-events-none text-default-400" />}
													</button>
												}
											/>

											<div>
												<button type="submit" className="flex justify-center w-full px-3 py-2 text-sm font-semibold leading-6 text-white rounded-md shadow-sm bg-primary hover:bg-[#cc8100] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
													LOGIN
												</button>
											</div>
										</form>
										<div className="relative my-10">
											<Divider />
											<div className="absolute w-full text-center -top-3">
												<span className="w-3/5 px-4 text-sm text-center text-gray-700 bg-gray-50">or login with</span>
											</div>
										</div>
										<Button color="primary" className="w-full text-gray-700 rounded-lg" variant="ghost">
											<FcGoogle />
											Google
										</Button>
									</div>
								</div>
								<div className="mt-10 mb-4 md:mt-0 md:mb-10">
									<p className="text-xs text-center text-gray-600 lg:text-left">{`© ${year} De Journey Vacations. All Right Reserved `}</p>
								</div>
							</div>

							{/* layout for image */}
							<div className="flex-col flex-wrap hidden w-6/12 xl:w-5/12 lg:flex">
								<div className="flex flex-col justify-center w-full h-full">
									<div className="w-full p-10 mt-20 md:mx-auto bg-primary rounded-xl">
										<div className="bg-white border border-gray-50 bg-opacity-30 rounded-xl">
											<div className="relative">
												<div className="mt-8 mb-56 ml-8 text-2xl font-semibold text-white xl:text-4xl xl:mb-64 pb-28 xl:pb-28 w-72 xl:w-96">Start your journey with one click, explore the beautiful world!</div>
												<img className="absolute -right-5 z-50 -bottom-56 xl:-bottom-64 xl:w-[380px] xl:h-[385px] w-[330px] h-[335px]" src={loginImg2} alt="login image" width={330} height={335} />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="absolute left-0 right-0 hidden w-8 mx-auto lg:block -bottom-20">
							<div className="bg-[#fa8443] absolute -right-48 xl:-right-96 bottom-[26rem] xl:bottom-[30rem] p-5 rounded-full blur-md"></div>
						</div>
						<div className="absolute left-0 right-0 hidden mx-auto lg:block -bottom-20 w-96">
							<img className="absolute -right-4 xl:-right-[7.5rem] -bottom-16 xl:-bottom-24 opacity-50 xl:w-[600px] xl:h-[450px] w-[500px] h-[400px]" src={loginShape} alt="shape image" width={600} height={600} />
						</div>
						<img className="absolute bottom-0 left-0 right-0 w-full h-48 md:hidden" src={loginImg1} alt="login image mobile" width={600} height={600} />
					</div>
				</div>
			</main>
		</div>
	);
};

export default LoginPage;
