import Image from "next/image";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, NavbarMenuToggle, Avatar } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import { listMenu } from "@/helpers/const";

const NavbarComponent = () => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [login, setLogin] = React.useState(false);
	const [isAdmin, setIsAdmin] = React.useState(true);
	const [menuList, setMenuList] = React.useState(listMenu);
	const [theme, setTheme] = React.useState("light");

	const handleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	const handleLogout = () => {
		localStorage.clear();
		window.location.reload();
	};

	useEffect(() => {
		if (login === true) {
			setMenuList(() => {
				return [...menuList, { link: "/transaction", name: "Transaction", text: "transaction" }];
			});
		}
	}, [login]);

	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleOutSideClick = (event) => {
			if (!dropdownRef.current?.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};

		window.addEventListener("mousedown", handleOutSideClick);

		return () => {
			window.removeEventListener("mousedown", handleOutSideClick);
		};
	}, [dropdownRef]);

	return (
		<Navbar className="w-[94%] md:w-[97%] mx-auto mt-4 rounded-lg shadow-2xl justify-center" onMenuOpenChange={() => setIsMenuOpen(!isMenuOpen)}>
			<NavbarBrand>
				<Image className="w-auto h-auto dark:invert max-h-11" src="/images/logo/logo.png" alt="logo images" width={160} height={45} priority />
			</NavbarBrand>
			<NavbarContent className="hidden gap-12 lg:flex" justify="center">
				{menuList.map((menu) => (
					<NavbarItem key={menu?.text}>
						<Link color="foreground" href={menu?.link}>
							{menu?.name}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
			<NavbarContent as="div" justify="end">
				<Dropdown placement="bottom-end right" className={`${login ? "bg-[#f9fafc] mt-2" : "bg-[#f9fafc]"}`}>
					<DropdownTrigger>{login ? <Avatar isBordered as="button" className="transition-transform" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" /> : <NavbarMenuToggle data-open={isMenuOpen} aria-label={isMenuOpen ? "Open menu" : "Close menu"} className="transition-transform lg:hidden" />}</DropdownTrigger>
					<DropdownMenu variant="flat" ref={dropdownRef}>
						{menuList.map((menu) => (
							<DropdownItem key={menu?.text} textValue={menu?.text} className="flex lg:hidden">
								<Link href={menu?.link}>{menu?.name}</Link>
							</DropdownItem>
						))}

						<DropdownItem key="theme" textValue="theme" showDivider={login ? false : true}>
							<Link onClick={handleTheme}>Mode</Link>
						</DropdownItem>

						{login && (
							<DropdownItem key="profile" textValue="profile" showDivider={isAdmin ? false : true}>
								<Link href="/profile">Profile</Link>
							</DropdownItem>
						)}

						{login && isAdmin && (
							<DropdownItem key="dashboard" textValue="dashboard" showDivider={isAdmin ? true : false}>
								<Link href="/dashboard">Dashboard</Link>
							</DropdownItem>
						)}

						{login ? (
							<DropdownItem key="logout" color="danger" textValue="logout">
								<Link href="/logout" className="text-danger">
									Logout
								</Link>
							</DropdownItem>
						) : (
							<DropdownItem key="login" textValue="login">
								<Link href="/login">Login</Link>
							</DropdownItem>
						)}

						{login === false && (
							<DropdownItem key="register" textValue="register">
								<Link href="/register">Register</Link>
							</DropdownItem>
						)}
					</DropdownMenu>
				</Dropdown>
				{login === false && (
					<NavbarItem className="hidden lg:flex">
						<Link href="/login">Login</Link>
					</NavbarItem>
				)}

				{login === false && (
					<NavbarItem className="hidden lg:flex">
						<Button as={Link} color="primary" className="text-white rounded-full bg-primary" href="/register" variant="ghost">
							Register
						</Button>
					</NavbarItem>
				)}
			</NavbarContent>
		</Navbar>
	);
};

export default NavbarComponent;
