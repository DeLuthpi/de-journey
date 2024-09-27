import SidebarAdmin from "@/components/SidebarAdmin";
import NavbarAdmin from "@/components/NavbarAdmin";
import { geistSans, geistMono } from "@/helpers/const";
import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image, Button, Link, Input } from "@nextui-org/react";
import apiGetData from "@/pages/api/apiGetData";
import { FiSearch, FiPlus } from "react-icons/fi";
import Footer from "@/components/Footer";

const BannerPage = () => {
	const { getData } = apiGetData();
	const [banners, setBanners] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getData("banners", (res) => setBanners(res?.data.data));
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	return (
		<div className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}>
			<SidebarAdmin />
			<main className="relative h-full min-h-screen transition-all duration-500 ease-in-out xl:ml-72 rounded-xl">
				<NavbarAdmin />
				<div className="w-full p-6 mx-auto">
					<div className="flex flex-wrap -mx-3">
						<div className="w-full max-w-full px-3 my-auto shrink-0 md:flex-0 md:w-2/4 lg:w-2/3">
							<h5 className="mb-0 text-2xl font-semibold dark:text-white">Banner List</h5>
						</div>
						<div className="flex justify-between w-full max-w-full gap-2 px-3 shrink-0 flex-nowrap md:w-2/4 lg:w-1/3">
							<Input
								isClearable
								radius="lg"
								classNames={{
									label: "text-black/50 dark:text-white/90",
									input: ["bg-transparent", "text-black/90 dark:text-white/90", "placeholder:text-default-700/50 dark:placeholder:text-white/60"],
									innerWrapper: "bg-transparent",
									inputWrapper: ["shadow-md", "bg-default-200/50", "dark:bg-default/60", "backdrop-blur-xl", "backdrop-saturate-200", "hover:bg-default-200/70", "dark:hover:bg-default/70", "group-data-[focus=true]:bg-default-200/50", "dark:group-data-[focus=true]:bg-default/60", "!cursor-text"],
								}}
								placeholder="Type to search..."
								startContent={<FiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}
							/>
							<Button color="success" className="w-6/12 font-medium" startContent={<FiPlus />}>
								add new
							</Button>
						</div>
					</div>
					<div className="flex flex-wrap mt-6 -mx-3">
						{banners.map((list, index) => (
							<div key={index} className="w-full max-w-full px-3 mb-4 shrink-0 sm:flex-0 sm:w-4/12">
								<div className="relative flex flex-col min-w-0 border-0 break-word rounded-2xl bg-clip-border">
									<Card shadow="md" isPressable onPress={() => console.log("item pressed")}>
										<CardBody className="p-0 overflow-visible">
											<Image shadow="sm" radius="lg" width="100%" alt={list?.name} className="w-full object-cover h-[140px]" src={list?.imageUrl} />
										</CardBody>
										<CardFooter className="justify-between min-h-16 text-small">
											<div className="font-semibold text-left text-wrap">{list?.name}</div>
											<Button as={Link} href={`/dashboard/banner/${list?.id}`} className="px-0 text-white text-tiny bg-bluenavy" radius="full" size="sm">
												Detail
											</Button>
										</CardFooter>
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

export default BannerPage;
