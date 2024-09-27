import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import apiDeleteData from "@/pages/api/apiDeleteData";
import toast from "react-hot-toast";

const DeleteModal = ({ showDeleteModal, setShowDeleteModal, selectedBanner }) => {
	const { deleteData } = apiDeleteData();

	const handleDeleteBanner = async (id) => {
		const res = await deleteData(`delete-banner/${id}`);
		if (res.status === 200) {
			setShowDeleteModal(false);
			toast.success("Banner deleted");
		} else {
			toast.error("Failed to delete banner");
		}
	};

	return (
		<Modal
			isOpen={showDeleteModal}
			onClose={() => setShowDeleteModal(false)}
			placement="center"
			isDismissable={false}
			isKeyboardDismissDisabled={true}
			classNames={{
				backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
			}}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							<div className="mx-2 my-4 align-center">Delete Banner</div>
						</ModalHeader>
						<ModalBody className="mb-10">
							<div className="flex justify-start align-middle flex-nowrap">
								{`Are you sure want to delete `}
								<b>&nbsp;{selectedBanner?.name}&nbsp;</b> {`?`}
							</div>
						</ModalBody>
						<ModalFooter>
							<Button variant="ghost" onClick={onClose}>
								Keep it
							</Button>
							<Button onClick={() => handleDeleteBanner(selectedBanner?.id)} color="danger" type="submit">
								Yes, delete
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default DeleteModal;
