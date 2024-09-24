"use client";

import { Link, Button, Breadcrumbs, BreadcrumbItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import React, { useEffect } from "react";
import { deleteCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi2";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import { FiSun, FiMoon } from "react-icons/fi";
import { useRouter } from "next/router";

const NavbarAdmin = () => {
	const router = useRouter();
	const pathname = usePathname().replace("/", "").replace("-", " ");
	const [showSidebar, setShowSidebar] = React.useState(false);
	const [winScroll, setWinScroll] = React.useState("");
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [theme, setTheme] = React.useState("light");

	useEffect(() => {
		window?.addEventListener("scroll", () => {
			if (window?.scrollY < 100) {
				setWinScroll("");
			} else {
				setWinScroll("nav-blur");
			}
		});
	}, []);

	const handleSideBar = () => {
		setShowSidebar(!showSidebar);
	};

	const handleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	const handleLogout = () => {
		deleteCookie("token");
		router.push("/");
	};

	return (
		<section className="w-full pt-4 sticky top-[1%] z-50">
			<nav className="z-50 flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-md duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start backdrop-saturate-200 backdrop-blur-2xl bg-white/80 shadow-blur dark:bg-gray-950/80 dark:shadow-dark-blur" navbar-scroll="false">
				<div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
					<nav>
						<Breadcrumbs className="flex flex-wrap w-full pt-1 mr-12 bg-transparent rounded-lg sm:mr-10">
							<BreadcrumbItem size="sm" className="text-gray-400" textValue="Pages" startContent={<HiHome />}>
								Pages
							</BreadcrumbItem>
							<BreadcrumbItem size="sm" className="hidden capitalize text-slate-700 md:inline" textValue={pathname}>
								{pathname}
							</BreadcrumbItem>
						</Breadcrumbs>
						<h6 className="pt-1 mb-0 font-bold text-gray-500 capitalize dark:text-white">{pathname}</h6>
					</nav>
					<div className="items-center w-[24px] h-[24px] hidden p-0 transition-all ease-nav-brand text-sm text-slate-500 xl:block">
						<button onClick={handleSideBar}>{showSidebar ? <FaBarsStaggered className="w-5 h-5 text-gray-500" /> : <FaBars className="w-5 h-5 text-gray-500" />}</button>
					</div>
					<div className="flex items-center justify-end mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto" id="navbar">
						<div className="flex items-center md:ml-auto">
							<div className="flex items-center justify-center w-full gap-4 align-middle transition-all rounded-lg flex-nowrap ease-soft">
								<div className="items-center w-[24px] h-[24px] inline p-0 transition-all ease-nav-brand text-sm text-slate-500 xl:hidden">
									<button onClick={handleSideBar}>{showSidebar ? <FaBarsStaggered className="w-5 h-5 text-gray-500" /> : <FaBars className="w-5 h-5 text-gray-500" />}</button>
								</div>
								<Button isIconOnly onClick={handleTheme} color="default" size="sm" variant="faded" aria-label="Change theme" className="transition-all rounded-md ease-nav-brand outline outline-2 outline-offset-2 outline-primary">
									{theme === "dark" ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
								</Button>
								<Dropdown placement="bottom-end" className="bg-[#f9fafc] mt-4 ml-4">
									<DropdownTrigger>
										<Avatar isBordered size="sm" color="primary" radius="sm" as="button" className="transition-transform" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
									</DropdownTrigger>
									<DropdownMenu aria-label="Profile Actions" variant="flat">
										<DropdownItem key="profile" textValue="profile">
											<Link href="/dashboard/profile" className="text-gray-700">
												Profile
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
