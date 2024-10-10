"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, NavbarMenuToggle, Avatar } from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { listMenu, logoImage } from "@/helpers/const";
import { usePathname } from "next/navigation";
import Link from "next/link";
import apiAuth from "@/pages/api/apiAuth";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "@/redux/slices/userLoggedSlice";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { TbUser, TbInvoice, TbLayoutDashboard } from "react-icons/tb";
import { MdOutlineNoteAlt } from "react-icons/md";

const NavbarComponent = () => {
	const token = getCookie("token");
	const currentPath = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isClient, setIsClient] = useState(false);
	const [calledPush, setCalledPush] = useState(false);
	const { userLog } = apiAuth();
	const dispatch = useDispatch();
	const user = useSelector((state) => state?.userLogged.user);
	const iconClass = "flex-shrink-0 text-xl pointer-events-none";

	useEffect(() => {
		setIsClient(true);

		// For Handle Error Abort fetching component for route
		if (calledPush) {
			return;
		}
		setCalledPush(true);

		// get user data when page reload and token is not null
		getUserLogged();
	}, []);

	const getUserLogged = () => {
		const token = getCookie("token");
		// set user data when token is not null
		if (token) {
			userLog("user", (res) => dispatch(setData(res)));
		}
	};

	const handleLogout = () => {
		deleteCookie("token");
		dispatch(setData(null));
	};

	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleOutSideClick = (event) => {
			if (!dropdownRef?.current?.contains(event?.target)) {
				setIsMenuOpen(false);
			}
		};

		window?.addEventListener("mousedown", handleOutSideClick);

		return () => {
			window?.removeEventListener("mousedown", handleOutSideClick);
		};
	}, [dropdownRef]);

	return (
		<>
			{isClient && (
				<Navbar className="w-[94%] md:w-4/5 mx-auto mt-4 rounded-lg shadow-lg justify-center" onMenuOpenChange={() => setIsMenuOpen(!isMenuOpen)}>
					<NavbarBrand>
						<img className="w-auto h-auto dark:invert max-h-11" src={logoImage} alt="logo images" width={160} height={45} />
					</NavbarBrand>
					<NavbarContent className="hidden gap-12 lg:flex" justify="center">
						{listMenu?.map((menu) => (
							<NavbarItem key={menu?.text}>
								<Link href={menu?.link} className={`${currentPath === menu?.link ? "text-orangejuice" : ""} text-bluenavy text-sm xl:text-base font-semibold hover:text-orangejuice`}>
									{menu?.name}
								</Link>
							</NavbarItem>
						))}
						{token && user?.role === "user" && (
							<NavbarItem key="transaction">
								<Link href="/transaction" className={`${currentPath === "/transaction" ? "text-orangejuice" : ""} text-bluenavy text-sm xl:text-base font-semibold hover:text-orangejuice`}>
									My Transaction
								</Link>
							</NavbarItem>
						)}
					</NavbarContent>
					<NavbarContent as="div" justify="end">
						<Dropdown placement="bottom-end" className={`${token ? "bg-gray-50 mt-2" : "bg-gray-50"}`}>
							<DropdownTrigger>{token ? <Avatar isBordered as="button" className="transition-transform" src={user?.profilePictureUrl} /> : <NavbarMenuToggle data-open={isMenuOpen} aria-label={isMenuOpen ? "Open menu" : "Close menu"} className="transition-transform lg:hidden" />}</DropdownTrigger>
							<DropdownMenu aria-label="Profile Actions" variant="flat" ref={dropdownRef}>
								{listMenu.map((menu) => (
									<DropdownItem key={menu?.text} textValue={menu?.text} className={`${currentPath === menu?.link ? "bg-primary hover:text-gray-700 text-white" : "text-gray-700"} flex lg:hidden`} startContent={menu?.icon}>
										<Link href={menu?.link} className="flex text-inherit">
											{menu?.name}
										</Link>
									</DropdownItem>
								))}

								{token && user?.role === "user" && (
									<DropdownItem key="transaction" textValue="transaction" className={`${currentPath === "/transaction" ? "bg-primary hover:text-gray-700 text-white" : "text-gray-700"} flex lg:hidden`} startContent={<TbInvoice className={iconClass} />}>
										<Link href="/transaction" className="flex text-inherit">
											My Transaction
										</Link>
									</DropdownItem>
								)}

								{token && (
									<DropdownItem key="profile" textValue="profile" showDivider={user?.role === "user" ? true : false} className={`${currentPath === "/profile" ? "bg-primary hover:text-gray-700 text-white" : "text-gray-700"}`} startContent={<TbUser className={iconClass} />}>
										<Link href="/profile" className="flex text-inherit">
											Profile
										</Link>
									</DropdownItem>
								)}

								{token && user?.role === "admin" && (
									<DropdownItem key="dashboard" textValue="dashboard" showDivider="true" startContent={<TbLayoutDashboard className={iconClass} />}>
										<Link href="/dashboard" className="flex text-gray-700">
											Dashboard
										</Link>
									</DropdownItem>
								)}

								{token ? (
									<DropdownItem key="logout" color="danger" textValue="logout" startContent={<AiOutlineLogout className={`text-danger ${iconClass}`} />}>
										<Link onClick={handleLogout} href="/" className="flex text-danger">
											Logout
										</Link>
									</DropdownItem>
								) : (
									<DropdownItem key="login" textValue="login" className={`${currentPath === "/login" ? "bg-primary hover:text-gray-700 text-white" : "text-gray-700"}`} startContent={<AiOutlineLogin className={iconClass} />}>
										<Link href="/login" className="flex text-inherit">
											Login
										</Link>
									</DropdownItem>
								)}

								{!token && (
									<DropdownItem key="register" textValue="register" className={`${currentPath === "/register" ? "bg-primary hover:text-gray-700 text-white" : "text-gray-700"}`} startContent={<MdOutlineNoteAlt className={iconClass} />}>
										<Link href="/register" className="flex text-inherit">
											Register
										</Link>
									</DropdownItem>
								)}
							</DropdownMenu>
						</Dropdown>
						{!token && (
							<NavbarItem className="hidden lg:flex">
								<Link href="/login" className={`${currentPath === "/login" ? "text-orangejuice" : ""} text-sm xl:text-base font-medium hover:text-orangejuice`}>
									Login
								</Link>
							</NavbarItem>
						)}

						{!token && (
							<NavbarItem className="hidden lg:flex">
								<Button as={Link} href="/register" color="primary" className="text-white rounded-full bg-primary" variant="ghost">
									Register
								</Button>
							</NavbarItem>
						)}
					</NavbarContent>
				</Navbar>
			)}
		</>
	);
};

export default NavbarComponent;
