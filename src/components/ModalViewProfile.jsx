import { Button, Divider, Image, Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { useSelector } from "react-redux";
import EditModal from "@/components/ModalEditProfile";
import { useState } from "react";
import { GrEdit } from "react-icons/gr";
import { FaSquarePhone, FaEnvelope } from "react-icons/fa6";
import { noImage } from "@/helpers/const";

const ViewModal = ({ showViewModal, setShowViewModal }) => {
	const user = useSelector((state) => state.userLogged.user);
	const [showEditModal, setShowEditModal] = useState(false);

	const handleShowEditModal = () => {
		setShowEditModal(!showEditModal);
	};

	return (
		<Modal
			isOpen={showViewModal}
			size="3xl"
			onClose={() => {
				setShowViewModal(false);
			}}
			placement="center"
			isDismissable={false}
			isKeyboardDismissDisabled={true}
			classNames={{
				backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
			}}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalBody>
							<div className="relative flex flex-wrap gap-2 py-4 md:flex-nowrap">
								<div className="flex flex-wrap w-full mx-auto md:w-2/5">
									<div className="space-y-1 w-[250px] h-[250px]">
										<div className="overflow-hidden rounded-md w-[250px] h-[250px]">
											<Image removeWrapper src={user?.profilePictureUrl} className="object-cover object-center w-full h-full scale-100 rounded-md" alt="img profile" fallbackSrc={noImage} />
										</div>
									</div>
								</div>
								<div className="flex flex-wrap w-full space-y-2 md:w-3/5 md:space-y-3 md:h-fit">
									<h2 className="text-3xl font-bold text-bluenavy">{user?.name}</h2>
									<Divider className="my-4" />
									<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
										<p className="w-full text-lg text-justify">
											<FaEnvelope className="inline" size={24} />
											&nbsp;
											{user?.email}
										</p>
									</div>
									<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
										<p className="w-full text-lg text-justify">
											<FaSquarePhone className="inline" size={24} />
											&nbsp;
											{user?.phoneNumber}
										</p>
									</div>
								</div>
								<Button className="absolute right-0 font-semibold text-white bottom-4 bg-bluenavy" onClick={() => handleShowEditModal(user)}>
									<GrEdit size={14} />
									&nbsp;edit profile
								</Button>
							</div>
						</ModalBody>
					</>
				)}
			</ModalContent>
			<EditModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} dataUser={user} />
		</Modal>
	);
};

export default ViewModal;
