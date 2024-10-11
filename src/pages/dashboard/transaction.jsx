import SidebarAdmin from "@/components/SidebarAdmin";
import NavbarAdmin from "@/components/NavbarAdmin";
import { geistSans, geistMono, noImage } from "@/helpers/const";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Link, Input } from "@nextui-org/react";
import apiGetData from "@/pages/api/apiGetData";
import { FiSearch, FiPlus, FiTrash2 } from "react-icons/fi";
import Footer from "@/components/Footer";
import { GrEdit } from "react-icons/gr";
import EditModal from "@/components/Dashboard/ModalEditPromo";
import moment from "moment";
import { LuCalendarCheck2, LuCalendarClock } from "react-icons/lu";
import currency from "currency.js";

const TransactionListPage = () => {
	const { getDataAuth } = apiGetData();
	const [allTransactions, setAllTransactions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedTransaction, setSelectedTransaction] = useState([]);
	const [showEditModal, setShowEditModal] = useState(false);
	const [search, setSearch] = useState("");

	const formatCurrency = (value) => {
		const convert = (amount) => currency(amount, { symbol: "Rp. ", separator: ",", decimal: "." });
		return convert(value).format();
	};

	useEffect(() => {
		setLoading(true);
		getDataAuth("all-transactions", (res) => setAllTransactions(res?.data.data));
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, [showEditModal]);

	const handleShowEditModal = async (id) => {
		const getTransaction = async () => {
			await getDataAuth(`transaction/${id}`, (res) => {
				setSelectedTransaction(res?.data.data);
			});
		};

		try {
			await getTransaction();
			setShowEditModal(!showEditModal);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getDataAuth("all-transactions", (res) => {
			const dataFiltered = res?.data.data.filter((transaction) => transaction?.invoiceId.toLowerCase().includes(search.toLowerCase()));
			setAllTransactions(dataFiltered);
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
							<h5 className="mb-0 text-2xl font-semibold dark:text-white">Transaction List</h5>
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
								placeholder="Search Invoice..."
								startContent={<FiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}
							/>
						</div>
					</div>
					<div className="flex flex-wrap mt-6 -mx-3">
						{allTransactions?.map((list, index) => (
							<div key={index} className="w-full max-w-full px-3 mb-4 transition-all duration-700 ease-in-out shrink-0 sm:flex-0 hover:scale-105">
								<div className="relative flex flex-col min-w-0 border-0 break-word rounded-2xl bg-clip-border">
									<Card className="w-full">
										<CardBody className="flex-row items-center justify-between flex-nowrap">
											<div tabIndex="-1" className="inline-flex items-center gap-2 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 justify-start text-sm">
												<div className="flex flex-col items-start">
													<h1 className="capitalize text-small text-inherit">{list?.invoiceId}</h1>
												</div>
												<div className="flex flex-col items-start px-2">
													<p className={`inline text-tiny ${list?.status === "success" ? "text-success" : "text-orangejuice"}`}>{list?.status}</p>
												</div>
												<div className="flex flex-col items-start px-2">
													<p className="inline text-tiny text-foreground-400">{list?.payment_method?.name}</p>
												</div>
												<div className="flex flex-col items-start px-2">
													<p className="inline text-tiny text-foreground-400">{formatCurrency(list?.totalAmount)}</p>
												</div>
											</div>
											<Button variant="faded" className="px-1 min-w-fit max-h-7 gap-0.5" color="primary" size="sm" startContent={<GrEdit size={16} />}>
												Update status
											</Button>
										</CardBody>
									</Card>
								</div>
							</div>
						))}
					</div>
					<Footer />
					<EditModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} selectedTransaction={selectedTransaction} />
				</div>
			</main>
		</div>
	);
};

export default TransactionListPage;
