import SidebarAdmin from "@/components/SidebarAdmin";
import NavbarAdmin from "@/components/NavbarAdmin";
import { geistSans, geistMono } from "@/helpers/const";
import { useEffect, useState } from "react";
import { Card, CardBody, Avatar, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import apiAuth from "@/pages/api/apiAuth";
import apiPostData from "@/pages/api/apiPostData";
import { FiSearch } from "react-icons/fi";
import Footer from "@/components/Footer";
import { PiUserSwitchLight } from "react-icons/pi";
import { TbUserEdit, TbUserSearch } from "react-icons/tb";
import { toast } from "react-hot-toast";

const UserListPage = () => {
	const { userLog } = apiAuth();
	const { postData } = apiPostData();
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("");
	const truncate = (text) => (text?.length > 24 ? `${text.substring(0, 20)}...` : text);

	useEffect(() => {
		setLoading(true);
		userLog("all-user", (data) => setUsers(data));
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	const updateUserRole = async (id, name, role) => {
		const payload = {
			role: role,
		};

		const res = await postData(`update-user-role/${id}`, payload);
		if (res?.status === 200) {
			userLog("all-user", (data) => {
				const dataFiltered = data?.filter((user) => user?.name.toLowerCase().includes(search.toLowerCase()));
				setUsers(dataFiltered);
			});
			toast.success(`Role of ${name} has been updated to ${role}`);
		} else {
			toast.error(`Failed to update role of ${name}`);
		}
	};

	useEffect(() => {
		userLog("all-user", (data) => {
			const dataFiltered = data?.filter((user) => user?.name.toLowerCase().includes(search.toLowerCase()));
			setUsers(dataFiltered);
		});
	}, [search]);

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	return (
		<div className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}>
			<SidebarAdmin />
			<main className="relative h-full min-h-screen transition-all duration-500 ease-in-out xl:ml-72 rounded-xl">
				<NavbarAdmin />
				<div className="w-full p-6 mx-auto">
					<div className="flex flex-wrap -mx-3">
						<div className="w-full max-w-full px-3 my-auto shrink-0 md:flex-0 md:w-2/4 lg:w-2/3">
							<h5 className="mb-0 text-2xl font-semibold dark:text-white">User List</h5>
						</div>
						<div className="flex justify-between w-full max-w-full gap-2 px-3 shrink-0 flex-nowrap md:w-2/4 lg:w-1/3">
							<Input
								isClearable
								radius="lg"
								onChange={handleSearch}
								classNames={{
									label: "text-black/50 dark:text-white/90",
									input: ["bg-transparent", "text-black/90 dark:text-white/90", "placeholder:text-default-700/50 dark:placeholder:text-white/60"],
									innerWrapper: "bg-transparent",
									inputWrapper: ["shadow-md", "bg-default-200/50", "dark:bg-default/60", "backdrop-blur-xl", "backdrop-saturate-200", "hover:bg-default-200/70", "dark:hover:bg-default/70", "group-data-[focus=true]:bg-default-200/50", "dark:group-data-[focus=true]:bg-default/60", "!cursor-text"],
								}}
								placeholder="Type to search..."
								startContent={<FiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}
							/>
						</div>
					</div>
					<div className="flex flex-wrap mt-6 -mx-3">
						{users.map((user, index) => (
							<div key={index} className="w-full max-w-full px-3 mb-4 transition-all duration-700 ease-in-out shrink-0 sm:flex-0 md:w-6/12 lg:w-4/12 hover:scale-105">
								<div className="relative flex flex-col min-w-0 border-0 break-word rounded-2xl bg-clip-border">
									<Card className="w-full">
										<CardBody className="flex-row items-center justify-between flex-nowrap">
											<div tabIndex="-1" className="inline-flex items-center gap-2 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 justify-start text-sm">
												<Avatar isBordered radius="md" showFallback src={user?.profilePictureUrl} alt={user?.name} />
												<div className="inline-flex flex-col items-start">
													<span className="capitalize text-small text-inherit">{user?.name.toLowerCase()}</span>
													<span className="inline text-tiny text-foreground-400 min-[375px]:hidden min-[1024px]:inline min-[1440px]:hidden">{truncate(user?.email)}</span>
													<span className="hidden text-tiny text-foreground-400 min-[375px]:inline min-[1024px]:hidden min-[1440px]:inline">{user?.email}</span>
												</div>
											</div>
											<Dropdown placement="bottom-end" className="min-w-32">
												<DropdownTrigger>
													<Button variant="faded" className="px-1 min-w-fit max-h-7 gap-0.5" color={user?.role === "admin" ? "primary" : "success"} size="sm" startContent={<PiUserSwitchLight size={16} />}>
														<span className="hidden sm:inline">{user?.role}</span>
													</Button>
												</DropdownTrigger>
												<DropdownMenu aria-label="Change Role" disabledKeys={[user?.role === "admin" ? "admin" : "user"]} variant="solid" color="primary">
													<DropdownItem key="admin" onClick={() => updateUserRole(user?.id, user?.name, "admin")} startContent={<TbUserEdit className="flex-shrink-0 pointer-events-none" />}>
														Set as Admin
													</DropdownItem>
													<DropdownItem key="user" onClick={() => updateUserRole(user?.id, user?.name, "user")} startContent={<TbUserSearch className="flex-shrink-0 pointer-events-none" />}>
														Set as User
													</DropdownItem>
												</DropdownMenu>
											</Dropdown>
										</CardBody>
									</Card>
								</div>
							</div>
						))}
					</div>
					<Footer />
				</div>
			</main>
		</div>
	);
};

export default UserListPage;
