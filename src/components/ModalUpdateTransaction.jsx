import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from "@nextui-org/react";
import apiPostData from "@/pages/api/apiPostData";
import toast from "react-hot-toast";
import apiGetData from "@/pages/api/apiGetData";
import { useDispatch } from "react-redux";
import { setTransaction } from "@/redux/slices/transactionSlice";
import { useState } from "react";

const UpdateModal = ({ showUpdateModal, setShowUpdateModal, selectedUpdateTrx }) => {
	const dispatch = useDispatch();
	const { postData } = apiPostData();
	const { getDataAuth } = apiGetData();
	const [statusTransaction, setStatusTransaction] = useState("");

	const handleUpdateTransaction = async () => {
		const res = await postData(`update-transaction-status/${selectedUpdateTrx?.id}`, { status: statusTransaction });
		if (res.status === 200) {
			getTransaction(selectedUpdateTrx?.id);
			setShowUpdateModal(false);
			toast.success(`Status transaction with invoice number ${selectedUpdateTrx?.invoiceId} successfully updated`);
		} else {
			toast.error("Failed to update status transaction");
		}
	};

	const getTransaction = (id) => {
		getDataAuth(`transaction/${id}`, (res) => {
			dispatch(setTransaction(res?.data.data));
		});
	};

	return (
		<Modal
			isOpen={showUpdateModal}
			onClose={() => {
				setShowUpdateModal(false);
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
						<ModalHeader className="flex flex-col gap-1">
							<div className="mx-2 my-4 align-center">Update Status Transaction</div>
						</ModalHeader>
						<ModalBody className="mb-10">
							<div className="flex flex-col flex-wrap text-base">
								<p>Please select status for transaction</p>
								<p className="mb-2">
									<b>{selectedUpdateTrx?.invoiceId}</b>
								</p>
								<Select id="statusTransaction" name="statusTransaction" aria-labelledby="statusTransaction" className="inline w-full" onChange={(e) => setStatusTransaction(e.target.value)} size="md" color="primary" placeholder="Select Status" radius="sm" variant="bordered">
									<SelectItem key="success">Success</SelectItem>
									<SelectItem key="failed">Failed</SelectItem>
								</Select>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button variant="solid" color="danger" onPress={onClose}>
								Cancel
							</Button>
							<Button onClick={handleUpdateTransaction} className="text-white bg-bluenavy" type="submit">
								Update
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default UpdateModal;
