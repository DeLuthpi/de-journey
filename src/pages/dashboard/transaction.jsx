import SidebarAdmin from "@/components/SidebarAdmin";
import NavbarAdmin from "@/components/NavbarAdmin";
import { geistSans, geistMono } from "@/helpers/const";
import { useEffect, useState } from "react";
import { Card, CardBody, Divider, Input } from "@nextui-org/react";
import apiGetData from "@/pages/api/apiGetData";
import { FiSearch } from "react-icons/fi";
import Footer from "@/components/Footer";
import moment from "moment";
import currency from "currency.js";
import ViewModal from "@/components/ModalViewTransaction";
import { useDispatch, useSelector } from "react-redux";
import { setTransaction } from "@/redux/slices/transactionSlice";

const TransactionListPage = () => {
	const dispatch = useDispatch();
	const { getDataAuth } = apiGetData();
	const [allTransactions, setAllTransactions] = useState([]);
	const [showViewModal, setShowViewModal] = useState(false);
	const [search, setSearch] = useState("");
	const user = useSelector((state) => state.userLogged.user);

	const formatCurrency = (value) => {
		const convert = (amount) => currency(amount, { symbol: "Rp. ", separator: ",", decimal: "." });
		return convert(value).format();
	};

	useEffect(() => {
		getDataAuth("all-transactions", (res) => setAllTransactions(res?.data.data));
	}, [showViewModal]);

	const handleShowViewModal = async (id) => {
		const getTransactionById = async () => {
			await getDataAuth(`transaction/${id}`, (res) => {
				dispatch(setTransaction(res?.data.data));
			});
		};

		try {
			await getTransactionById();
			setShowViewModal(!showViewModal);
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
						<div className="flex flex-wrap w-full gap-3 px-2 md:gap-0 md:px-0">
							{allTransactions?.length === 0 ? (
								<div className="flex justify-center w-full py-20 text-3xl font-semibold text-center capitalize">no transaction data</div>
							) : (
								allTransactions
									?.map((list, index) => (
										<div key={index} className="w-full max-w-full mb-2 md:px-3">
											<div className="relative flex flex-col min-w-0 border-0 break-word rounded-2xl bg-clip-border">
												<Card isPressable onPress={() => handleShowViewModal(list?.id)} className="w-full hover:bg-content2">
													<CardBody className="w-full">
														<div className="flex flex-col items-start justify-between gap-1 text-sm">
															<h1 className="font-semibold capitalize text-small text-inherit">{list?.invoiceId}</h1>
															<Divider className="my-1" />
															<div className="flex flex-col items-start w-full md:flex-row md:justify-between">
																<div className="flex flex-col items-start w-full md:w-1/5 lg:w-[25%]">
																	<p className={`inline text-tiny capitalize ${list?.status === "success" ? "text-success" : list?.status === "cancelled" || list?.status === "failed" ? "text-danger" : "text-orangejuice"}`}>{list?.status}</p>
																	<p className="inline text-tiny text-foreground-400">{list?.transaction_items.length} item</p>
																</div>
																<div className="flex flex-col items-start w-full md:w-2/5 lg:w-1/3">
																	<div className="flex flex-row items-center w-full gap-2 flex-nowrap">
																		<p className="inline w-24 text-tiny text-foreground-400">Total Transaction</p>
																		<p className="inline text-tiny text-foreground-400">:&nbsp;{formatCurrency(list?.totalAmount)}</p>
																	</div>
																	<div className="flex flex-row items-center w-full gap-2 flex-nowrap">
																		<p className="inline w-24 text-tiny text-foreground-400">Payment Method</p>
																		<p className="inline text-tiny text-foreground-400">:&nbsp;{list?.payment_method?.name}</p>
																	</div>
																</div>
																<div className="flex flex-col items-start w-full md:w-2/5 lg:w-1/3">
																	<p className="inline capitalize text-tiny text-foreground-400">{`order date : ${moment(list?.orderDate).format("DD MMM YYYY • HH:mm")}`}</p>
																	{list?.proofPaymentUrl === null ? <p className="inline capitalize text-tiny text-danger">{`${user?.role === "admin" ? "not yet paid" : `* please pay before ${moment(list?.expiredDate).format("DD MMM YYYY • HH:mm")}`}`}</p> : <p className="inline capitalize text-tiny text-success">already paid</p>}
																</div>
															</div>
														</div>
													</CardBody>
												</Card>
											</div>
										</div>
									))
									.reverse()
							)}
						</div>
					</div>
					<Footer />
					<ViewModal showViewModal={showViewModal} setShowViewModal={setShowViewModal} />
				</div>
			</main>
		</div>
	);
};

export default TransactionListPage;
