import SidebarAdmin from "@/components/SidebarAdmin";
import NavbarAdmin from "@/components/NavbarAdmin";
import { geistSans, geistMono, noImage } from "@/helpers/const";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardFooter, Image, Button, Link, Input } from "@nextui-org/react";
import apiGetData from "@/pages/api/apiGetData";
import { FiSearch, FiPlus, FiTrash2 } from "react-icons/fi";
import Footer from "@/components/Footer";
import validateImage from "@/utils/validationImage";
import { GrEdit } from "react-icons/gr";
import CreateModal from "@/components/Dashboard/ModalCreateDestination";
import EditModal from "@/components/Dashboard/ModalEditDestination";
import DeleteModal from "@/components/Dashboard/ModalDeleteDestination";
import moment from "moment";
import { LuCalendarCheck2, LuCalendarClock } from "react-icons/lu";

const DestinationPage = () => {
	const { getData } = apiGetData();
	const [destinations, setDestinations] = useState([]);
	const [loading, setLoading] = useState(false);
	const { validateImg } = validateImage();
	const [selectedDestination, setSelectedDestination] = useState([]);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [search, setSearch] = useState("");

	useEffect(() => {
		setLoading(true);
		getData("activities", (res) => setDestinations(res?.data.data));
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, [showCreateModal, showEditModal, showDeleteModal]);

	const handleShowCreateModal = () => {
		setShowCreateModal(!showCreateModal);
	};

	const handleShowEditModal = async (id) => {
		const getDestination = async () => {
			await getData(`activity/${id}`, (res) => {
				setSelectedDestination(res?.data.data);
			});
		};

		try {
			await getDestination();
			setShowEditModal(!showEditModal);
		} catch (error) {
			console.log(error);
		}
	};

	const handleShowDeleteModal = async (id) => {
		const getDestination = async () => {
			await getData(`activity/${id}`, (res) => {
				setSelectedDestination(res?.data.data);
			});
		};
		try {
			await getDestination();
			setShowDeleteModal(!showDeleteModal);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getData("activities", (res) => {
			const dataFiltered = res?.data.data.filter((activity) => activity?.title.toLowerCase().includes(search.toLowerCase()));
			setDestinations(dataFiltered);
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
							<h5 className="mb-0 text-2xl font-semibold dark:text-white">Destination List</h5>
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
							<Button color="success" onClick={handleShowCreateModal} className="w-6/12 font-medium" startContent={<FiPlus />}>
								add new
							</Button>
						</div>
					</div>
					<div className="flex flex-wrap mt-6 -mx-3">
						{destinations.map((list, index) => (
							<div key={index} className="w-full max-w-full px-3 mb-4 transition-all duration-700 ease-in-out shrink-0 sm:flex-0 md:w-6/12 lg:w-4/12 hover:scale-105">
								<div className="relative flex flex-col min-w-0 border-0 break-word rounded-2xl bg-clip-border">
									<Card isFooterBlurred isPressable className="w-full h-[250px] col-span-12 sm:col-span-7">
										<CardHeader className="absolute z-10 flex-col items-start top-1">
											<p className="font-bold capitalize text-tiny [text-shadow:_1px_1px_#f0f0f0] text-slate-800/80">{`${list?.city}, ${list?.province}`}</p>
											<h4 className="text-xl text-left [text-shadow:_1px_1px_#f0f0f0] font-semibold text-slate-800/90">{list?.title}</h4>
										</CardHeader>
										<Image removeWrapper alt={list?.title} className="z-0 object-cover w-full h-full" src={noImage} />
										<CardFooter className="absolute bottom-0 z-10 bg-black/40 border-t-1 border-default-600 dark:border-default-100">
											<div className="flex items-center flex-grow gap-2 text-left">
												<div className="flex flex-col gap-2">
													<div className="flex items-center gap-2 flex-nowrap text-tiny text-white/60">
														<LuCalendarCheck2 className="size-5" /> {moment(list?.createdAt).format("DD MMM YYYY • HH:mm")}
													</div>
													<div className="flex items-center gap-2 flex-nowrap text-tiny text-white/60">
														<LuCalendarClock className="size-5" /> {moment(list?.updatedAt).format("DD MMM YYYY • HH:mm")}
													</div>
												</div>
											</div>
											<div className="flex justify-end gap-1 flex-nowrap">
												<Button as={Link} onClick={() => handleShowEditModal(list?.id)} className="h-6 px-2 py-4 m-0 text-white min-w-3 text-tiny bg-bluenavy" radius="sm" size="sm">
													<GrEdit className="size-4" />
												</Button>
												<Button as={Link} onClick={() => handleShowDeleteModal(list?.id)} className="h-6 px-2 py-4 m-0 text-white min-w-3 text-tiny bg-danger" radius="sm" size="sm">
													<FiTrash2 className="size-4" />
												</Button>
											</div>
										</CardFooter>
									</Card>
								</div>
							</div>
						))}
					</div>
					<Footer />
					<CreateModal showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} />
					<EditModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} selectedDestination={selectedDestination} />
					<DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} selectedDestination={selectedDestination} />
				</div>
			</main>
		</div>
	);
};

export default DestinationPage;
