"use client";

import { Link, Button, Breadcrumbs, BreadcrumbItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi2";
import { HiOutlineBars3, HiOutlineBars3BottomLeft, HiOutlineBars3BottomRight } from "react-icons/hi2";
import { FiSun, FiMoon } from "react-icons/fi";
import { useRouter } from "next/router";
import apiAuth from "@/pages/api/apiAuth";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "@/redux/slices/userLoggedSlice";
import { sidebarMini, sidebarExpand } from "@/helpers/handleSidebar";

const NavbarAdmin = () => {
	const router = useRouter();
	const pathname = usePathname();
	const [theme, setTheme] = useState("light");
	const { userLog } = apiAuth();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userLogged.user);
	const [newPathname, setNewPathname] = useState("");

	// get user data when page reload
	useEffect(() => {
		getUserLogged();
		if (pathname !== "/dashboard") {
			const newPath = pathname.replace("/dashboard/", "").replace("-", " ");
			setNewPathname(newPath);
		} else {
			const newPath = pathname.replace("/", "");
			setNewPathname(newPath);
		}
	}, []);

	const getUserLogged = () => {
		const token = getCookie("token");
		// set user data when token is not null
		if (token) {
			userLog("user", (res) => dispatch(setData(res)));
		}
	};

	const handleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	const handleLogout = () => {
		deleteCookie("token");
		router.push("/");
	};

	return (
		<section navbar-section="true" className="w-full pt-4" navbar-scroll="true">
			<nav navbar-main="true" className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all ease-in duration-250 rounded-2xl lg:flex-nowrap lg:justify-start">
				<div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
					<nav>
						<Breadcrumbs className="flex flex-wrap w-full pt-1 mr-12 bg-transparent rounded-lg sm:mr-10">
							<BreadcrumbItem size="sm" className="text-gray-400" textValue="Pages" startContent={<HiHome />}>
								Pages
							</BreadcrumbItem>
							<BreadcrumbItem size="sm" className="hidden text-white capitalize md:inline" textValue={newPathname}>
								{newPathname}
							</BreadcrumbItem>
						</Breadcrumbs>
						<h6 className="pt-1 mb-0 font-bold text-gray-500 capitalize dark:text-white">{newPathname}</h6>
					</nav>
					<div className="items-center w-[24px] h-[24px] hidden p-0 transition-all text-sm text-slate-500 xl:block">
						<button mini-trigger="true" onClick={sidebarMini} className="transition-all duration-500 ease-in-out" aria-expanded="true">
							<HiOutlineBars3 mini-open="true" className="inline text-gray-500 size-6" stroke="currentColor" strokeWidth="2.4" />
							<HiOutlineBars3BottomLeft mini-close="true" className="hidden text-gray-500 size-6" stroke="currentColor" strokeWidth="2.4" />
						</button>
					</div>
					<div className="flex items-center justify-end mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto" id="navbar">
						<div className="flex items-center md:ml-auto">
							<div className="flex items-center justify-center w-full gap-4 align-middle transition-all rounded-lg flex-nowrap">
								<div className="items-center w-[24px] h-[24px] inline p-0 transition-all text-sm text-slate-500 xl:hidden">
									<button expand-trigger="true" onClick={sidebarExpand} className="transition-all duration-500 ease-in-out" aria-expanded="false">
										<HiOutlineBars3 expand-open="true" className="inline text-gray-500 size-6" stroke="currentColor" strokeWidth="2.4" />
										<HiOutlineBars3BottomRight expand-close="true" className="hidden text-gray-500 size-6" stroke="currentColor" strokeWidth="2.4" />
									</button>
								</div>
								<Button isIconOnly onClick={handleTheme} color="default" size="sm" variant="faded" aria-label="Change theme" className="transition-all rounded-md outline outline-2 outline-offset-2 outline-primary">
									{theme === "dark" ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
								</Button>
								<Dropdown placement="bottom-end" className="mt-4 ml-4 bg-gray-50">
									<DropdownTrigger>
										<Avatar isBordered size="sm" color="primary" radius="sm" as="button" className="transition-transform" src={user?.profilePictureUrl} />
									</DropdownTrigger>
									<DropdownMenu aria-label="Profile Actions" variant="flat">
										<DropdownItem key="profile" textValue="profile">
											<Link href="/dashboard/profile" className="text-gray-700">
												Profile Information
											</Link>
										</DropdownItem>
										<DropdownItem key="logout" color="danger" textValue="logout">
											<Link onClick={handleLogout} className="text-danger">
												Logout
											</Link>
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</section>
	);
};

export default NavbarAdmin;
