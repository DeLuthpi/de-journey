import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import apiPostData from "@/pages/api/apiPostData";
import toast from "react-hot-toast";
import apiGetData from "@/pages/api/apiGetData";
import { useDispatch } from "react-redux";
import { setTransaction } from "@/redux/slices/transactionSlice";

const CancelModal = ({ showCancelModal, setShowCancelModal, selectedCancelTrx }) => {
	const dispatch = useDispatch();
	const { postData } = apiPostData();
	const { getDataAuth } = apiGetData();

	const handleCancelTransaction = async () => {
		const res = await postData(`cancel-transaction/${selectedCancelTrx?.id}`);
		if (res.status === 200) {
			getTransaction(selectedCancelTrx?.id);
			setShowCancelModal(false);
			toast.success(`Transaction with invoice number ${selectedCancelTrx?.invoiceId} successfully cancelled`);
		} else {
			toast.error("Failed to cancel transaction");
		}
	};

	const getTransaction = (id) => {
		getDataAuth(`transaction/${id}`, (res) => {
			dispatch(setTransaction(res?.data.data));
		});
	};

	return (
		<Modal
			isOpen={showCancelModal}
			onClose={() => {
				setShowCancelModal(false);
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
							<div className="mx-2 my-4 align-center">Cancel Transaction</div>
						</ModalHeader>
						<ModalBody className="mb-10">
							<div className="text-base">
								{`Are you sure you want to cancel transaction with invoice number`}
								<b>&nbsp;{selectedCancelTrx?.invoiceId}&nbsp;</b> {`?`}
							</div>
						</ModalBody>
						<ModalFooter>
							<Button variant="ghost" onPress={onClose}>
								No, Keep it
							</Button>
							<Button onClick={handleCancelTransaction} color="danger" type="submit">
								Yes, cancel
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default CancelModal;
