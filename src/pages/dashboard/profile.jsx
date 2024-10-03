import SidebarAdmin from "@/components/SidebarAdmin";
import NavbarAdmin from "@/components/NavbarAdmin";
import { geistSans, geistMono, noImage } from "@/helpers/const";
import { useEffect, useState } from "react";
import { Card, CardBody, Image, Button, Tooltip } from "@nextui-org/react";
import { useSelector } from "react-redux";
import Footer from "@/components/Footer";
import { FaSquarePhone, FaEnvelope } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import EditModal from "@/components/ModalEditProfile";

const ProfilePage = () => {
	const [loading, setLoading] = useState(false);
	const user = useSelector((state) => state.userLogged.user);
	const [showEditModal, setShowEditModal] = useState(false);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, [showEditModal]);

	const handleShowEditModal = () => {
		setShowEditModal(!showEditModal);
	};

	return (
		<div className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}>
			<SidebarAdmin />
			<main className="relative h-full min-h-screen transition-all duration-500 ease-in-out xl:ml-72 rounded-xl">
				<NavbarAdmin />
				<div className="w-full p-6 mx-auto">
					<div className="flex flex-wrap -mx-3">
						<div className="w-full max-w-full px-3 my-auto shrink-0 md:flex-0 md:w-2/4 lg:w-2/3">
							<h5 className="mb-0 text-2xl font-semibold dark:text-white">Profile Information</h5>
						</div>
					</div>
					<div className="flex flex-wrap mt-6">
						<Card isBlurred className="w-full max-w-full border-none md:w-4/5 bg-background/60 dark:bg-default-100/50" shadow="sm">
							<CardBody className="relative">
								<Tooltip color="primary" placement="bottom" showArrow={true} content="Edit Profile">
									<Button onClick={() => handleShowEditModal(user)} className="absolute z-20 p-0 min-w-16 bottom-3 md:top-3 right-3" startContent={<GrEdit size={12} />} color="primary" size="sm" variant="bordered">
										Edit
									</Button>
								</Tooltip>
								<div className="grid items-center justify-center grid-cols-6 gap-6 md:grid-cols-12 md:gap-4">
									<div className="relative col-span-6 lg:col-span-4">
										<Image alt="Profile Image" className="object-cover" height={200} width="100%" shadow="md" src={user?.profilePictureUrl} onError={(e) => (e.target.src = noImage)} />
									</div>

									<div className="flex flex-col col-span-6 mb-8 md:mb-0 lg:col-span-8">
										<div className="flex items-start justify-between">
											<div className="flex flex-col gap-0">
												<h1 className="text-xl font-semibold md:text-2xl text-gray-700/90">{user?.name}</h1>
												<div className="flex flex-row items-center gap-2 mt-2 text-gray-500/80">
													<FaEnvelope /> <p className="text-base font-medium">{user?.email}</p>
												</div>
												<div className="flex flex-row items-center gap-2 text-gray-500/80">
													<FaSquarePhone size={17} /> <h3 className="text-base font-medium">{user?.phoneNumber}</h3>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<Footer />
					<EditModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} dataUser={user} />
				</div>
			</main>
		</div>
	);
};

export default ProfilePage;
