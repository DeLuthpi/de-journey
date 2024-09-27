import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import apiDeleteData from "@/pages/api/apiDeleteData";
import toast from "react-hot-toast";

const DeleteModal = ({ showDeleteModal, setShowDeleteModal, selectedCategory }) => {
	const { deleteData } = apiDeleteData();

	const handleDeleteCategory = async (id) => {
		const res = await deleteData(`delete-category/${id}`);
		if (res.status === 200) {
			setShowDeleteModal(false);
			toast.success("Category deleted");
		} else {
			toast.error("Failed to delete category");
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
							<div className="mx-2 my-4 align-center">Delete Category</div>
						</ModalHeader>
						<ModalBody className="mb-10">
							<div className="flex justify-start align-middle flex-nowrap">
								{`Are you sure want to delete category `}
								<b>&nbsp;{selectedCategory?.name}&nbsp;</b> {`?`}
							</div>
						</ModalBody>
						<ModalFooter>
							<Button variant="ghost" onClick={onClose}>
								Keep it
							</Button>
							<Button onClick={() => handleDeleteCategory(selectedCategory?.id)} color="danger" type="submit">
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
