import SidebarAdmin from "@/components/SidebarAdmin";
import NavbarAdmin from "@/components/NavbarAdmin";
import { geistSans, geistMono } from "@/helpers/const";
import { useEffect, useState } from "react";
import { Card, CardBody, User, Input } from "@nextui-org/react";
import apiGetData from "@/pages/api/apiGetData";
import { FiSearch } from "react-icons/fi";
import Footer from "@/components/Footer";

const UserListPage = () => {
	const { getData } = apiGetData();
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("");

	useEffect(() => {
		setLoading(true);
		getData("all-user", (res) => setUsers(res?.data.data));
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	useEffect(() => {
		getData("all-user", (res) => {
			const dataFiltered = res?.data.data.filter((user) => user?.name.toLowerCase().includes(search.toLowerCase()));
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
						{users.map((list, index) => (
							<div key={index} className="w-full max-w-full px-3 mb-4 transition-all duration-700 ease-in-out shrink-0 sm:flex-0 md:w-6/12 lg:w-4/12 hover:scale-105">
								<div className="relative flex flex-col min-w-0 border-0 break-word rounded-2xl bg-clip-border">
									<Card isPressable className="w-full">
										<CardBody>
											<User
												name={list?.name}
												description={list?.email}
												avatarProps={{
													src: list?.profilePictureUrl,
													alt: list?.name,
												}}
											/>
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
