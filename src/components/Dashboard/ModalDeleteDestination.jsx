import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import apiDeleteData from "@/pages/api/apiDeleteData";
import toast from "react-hot-toast";

const DeleteModal = ({ showDeleteModal, setShowDeleteModal, selectedDestination }) => {
	const { deleteData } = apiDeleteData();

	const handleDeleteDestination = async (id) => {
		const res = await deleteData(`delete-activity/${id}`);
		if (res.status === 200) {
			setShowDeleteModal(false);
			toast.success("Destination deleted");
		} else {
			toast.error("Failed to delete destination");
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
							<div className="mx-2 my-4 align-center">Delete Destination</div>
						</ModalHeader>
						<ModalBody className="mb-10">
							<div className="text-base">
								{`Are you sure want to delete destination`}
								<b>&nbsp;{selectedDestination?.title}&nbsp;</b> {`?`}
							</div>
						</ModalBody>
						<ModalFooter>
							<Button variant="ghost" onClick={onClose}>
								Keep it
							</Button>
							<Button onClick={() => handleDeleteDestination(selectedDestination?.id)} color="danger" type="submit">
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
