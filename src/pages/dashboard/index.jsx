import SidebarAdmin from "@/components/SidebarAdmin";
import NavbarAdmin from "@/components/NavbarAdmin";
import { geistSans, geistMono } from "@/helpers/const";
import { Card, CardBody } from "@nextui-org/react";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import apiGetData from "@/pages/api/apiGetData";
import { useRouter } from "next/router";
import { TbRosetteDiscount, TbCategory2, TbMap2, TbInvoice, TbUsers } from "react-icons/tb";
import { CgImage } from "react-icons/cg";

const DashboardPage = () => {
	const router = useRouter();
	const { getData } = apiGetData();
	const [dataStatistic, setDataStatistic] = useState([]);
	const [countBanners, setCountBanners] = useState(0);
	const [countCategories, setCountCategories] = useState(0);
	const [countDestinations, setCountDestinations] = useState(0);
	const [countPromos, setCountPromos] = useState(0);
	const [countTransactions, setCountTransactions] = useState(0);
	const [countUsers, setCountUsers] = useState(0);

	useEffect(() => {
		getData("banners", (res) => setCountBanners(res?.data.data.length));
		getData("categories", (res) => setCountCategories(res?.data.data.length));
		getData("activities", (res) => setCountDestinations(res?.data.data.length));
		getData("promos", (res) => setCountPromos(res?.data.data.length));
		getData("all-transactions", (res) => setCountTransactions(res?.data.data.length));
		getData("all-user", (res) => setCountUsers(res?.data.data.length));

		setData();
	}, [countBanners, countCategories, countDestinations, countPromos, countTransactions, countUsers]);

	const setData = () => {
		setDataStatistic([
			{ name: "Banners", value: countBanners, title: "Items", link: "/dashboard/banner", icon: <CgImage className="size-8" /> },
			{ name: "Categories", value: countCategories, title: "Items", link: "/dashboard/category", icon: <TbCategory2 className="size-8" /> },
			{ name: "Destinations", value: countDestinations, title: "Items", link: "/dashboard/destination", icon: <TbMap2 className="size-8" /> },
			{ name: "Promos", value: countPromos, title: "Items", link: "/dashboard/special-deals", icon: <TbRosetteDiscount className="size-8" /> },
			{ name: "Transactions", value: countTransactions, title: "Transaction", link: "/dashboard/transaction", icon: <TbInvoice className="size-8" /> },
			{ name: "Total Users", value: countUsers, title: "Users", link: "/dashboard/user-list", icon: <TbUsers className="size-8" /> },
		]);
	};

	return (
		<div className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}>
			<SidebarAdmin />
			<main className="relative h-full min-h-screen transition-all duration-500 ease-in-out xl:ml-72 rounded-xl">
				<NavbarAdmin />
				<div className="w-full p-6 mx-auto">
					<div className="flex flex-wrap -mx-3">
						<div className="w-full max-w-full px-3 my-auto shrink-0 md:flex-0 md:w-2/4 lg:w-2/3">
							<h5 className="mb-0 text-2xl font-semibold dark:text-white">Data Statistic</h5>
						</div>
					</div>
					<div className="flex flex-wrap w-full gap-3 px-2 mt-6 md:gap-0 md:px-0">
						{dataStatistic?.map((item, index) => (
							<div key={index} className="flex flex-col w-full pb-4 md:w-2/6 lg:w-1/4 md:px-0">
								<Card isPressable onClick={() => router.push(item?.link)} className="w-full md:w-[95%] py-4 transition-all duration-500 ease-in-out hover:scale-105 shadow-lg">
									<CardBody className="px-4 py-0">
										<div className="flex flex-row items-center gap-2 flex-nowrap">
											<div className="p-3 text-white rounded-lg bg-bluenavy">{item?.icon}</div>
											<div className="flex flex-col flex-nowrap">
												<h4 className="text-base font-bold">{item?.name}</h4>
												<small className="text-default-500">
													{item?.value}&nbsp;{item?.title}
												</small>
											</div>
										</div>
									</CardBody>
								</Card>
							</div>
						))}
					</div>
					<Footer />
				</div>
			</main>
		</div>
	);
};

export default DashboardPage;
