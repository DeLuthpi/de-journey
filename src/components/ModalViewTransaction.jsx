import { Avatar, Button, Card, CardBody, Divider, Input, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import currency from "currency.js";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import apiUpload from "@/pages/api/apiUpload";
import apiPostData from "@/pages/api/apiPostData";
import apiGetData from "@/pages/api/apiGetData";
import moment from "moment";
import { TbInvoice } from "react-icons/tb";
import { PiClockCountdown, PiCheckCircle, PiPaperclipBold } from "react-icons/pi";
import { TbXboxX } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { setAmount, setTotalAmount } from "@/redux/slices/cartListSlice";
import { setTransaction } from "@/redux/slices/transactionSlice";
import CancelModal from "./ModalCancelTransaction";
import ProofModal from "./ModalShowProof";
import UpdateModal from "./ModalUpdateTransaction";

const ViewModal = ({ showViewModal, setShowViewModal }) => {
	const dispatch = useDispatch();
	const { upload } = apiUpload();
	const { postData } = apiPostData();
	const { getDataAuth } = apiGetData();
	const [isLoading, setIsLoading] = useState(false);
	const hiddenFileInput = useRef(null);
	const totalAmount = useSelector((state) => state?.cartList.totalAmount);
	const selectedTransaction = useSelector((state) => state?.transaction.data);
	const [showProofModal, setShowProofModal] = useState(false);
	const [showCancelModal, setShowCancelModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [selectedCancelTrx, setSelectedCancelTrx] = useState([]);
	const [proofImageUrl, setProofImageUrl] = useState(null);
	const [selectedUpdateTrx, setSelectedUpdateTrx] = useState([]);
	const user = useSelector((state) => state.userLogged.user);

	useEffect(() => {
		dispatch(setAmount(0));
		if (selectedTransaction?.transaction_items) {
			selectedTransaction?.transaction_items.map((list) => {
				dispatch(setTotalAmount(parseInt(list?.price * list?.quantity)));
			});
		}
	}, [selectedTransaction, showCancelModal, showProofModal, showUpdateModal]);

	const formatCurrency = (value) => {
		const convert = (amount) => currency(amount, { symbol: "Rp. ", separator: ",", decimal: "." });
		return convert(value).format();
	};

	const handleClickUpload = () => {
		hiddenFileInput.current.click();
	};

	const handleUpload = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		const file = e.target.files[0];

		if (!file) {
			return;
		} else if (!file.type.startsWith("image/")) {
			toast.error("The file must be an image in \n jpg, jpeg or png format.");
			return false;
		}

		const dataImage = new FormData();
		dataImage.append("image", file);

		try {
			const res = await upload("upload-image", dataImage);
			updateTransactionProof(res?.data.url);
			setTimeout(() => {
				toast.success("Proof transaction successfully uploaded");
			}, 1500);
			return res.data.url;
		} catch (err) {
			toast.error("Failed to upload image. \n Maybe the image is too big. \n Try another image.");
		}
	};

	const updateTransactionProof = async (url) => {
		const postProof = async () => {
			await postData(`update-transaction-proof-payment/${selectedTransaction?.id}`, {
				proofPaymentUrl: url,
			});
		};
		try {
			await postProof();
			getDataAuth(`transaction/${selectedTransaction?.id}`, (res) => {
				dispatch(setTransaction(res?.data.data));
			});
		} catch (err) {
			console.log(err);
			toast.error("Failed to upload proof transaction");
		} finally {
			setTimeout(() => {
				setIsLoading(false);
			}, 1500);
		}
	};

	const handleShowCancelModal = async (id) => {
		const getTransaction = async () => {
			await getDataAuth(`transaction/${id}`, (res) => {
				setSelectedCancelTrx(res?.data.data);
			});
		};
		try {
			await getTransaction();
			setShowCancelModal(!showCancelModal);
		} catch (err) {
			console.log(err);
		}
	};

	const handleShowUpdateModal = async (id) => {
		const getTransaction = async () => {
			await getDataAuth(`transaction/${id}`, (res) => {
				setSelectedUpdateTrx(res?.data.data);
				console.log(res?.data.data);
			});
		};
		try {
			await getTransaction();
			setShowUpdateModal(!showUpdateModal);
		} catch (err) {
			console.log(err);
		}
	};

	const handleShowProofModal = (url) => {
		setProofImageUrl(url);
		setShowProofModal(!showProofModal);
	};

	const handleClose = () => {
		dispatch(setAmount(0));
		dispatch(setTransaction(null));
	};

	return (
		<Modal
			isOpen={showViewModal}
			size="5xl"
			onClose={() => {
				setShowViewModal(false);
				handleClose();
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
							<div className="mx-2 my-4 align-center">Transaction Detail</div>
						</ModalHeader>
						<ModalBody>
							<div className="relative flex flex-col min-w-0">
								<div className="items-center w-full">
									<div className="flex flex-row flex-wrap items-center justify-between w-full">
										<h1 className="font-semibold dark:text-white">{selectedTransaction?.invoiceId}</h1>
										<p className={`inline text-sm md:text-base items-center capitalize ${selectedTransaction?.status === "success" ? "text-success" : selectedTransaction?.status === "cancelled" || selectedTransaction?.status === "failed" ? "text-danger" : "text-orangejuice"}`}>
											<span className="inline pr-1 md:text-lg">{selectedTransaction?.status === "success" ? <PiCheckCircle className="inline" /> : selectedTransaction?.status === "cancelled" || selectedTransaction?.status === "failed" ? <TbXboxX className="inline" /> : <PiClockCountdown className="inline" />}</span>
											{selectedTransaction?.status}
										</p>
									</div>
									<p className="inline text-sm">Order Date : {moment(selectedTransaction?.orderDate).format("DD MMM YYYY • HH:mm")}</p>
								</div>
								<Divider className="my-4" />
								<div className="flex flex-col gap-2 md:gap-4">
									{selectedTransaction?.transaction_items.map((item, index) => (
										<div key={index} className="flex flex-row items-start justify-between gap-2 flex-nowrap">
											<Avatar isBordered radius="sm" src={item?.imageUrls[0]} size="lg" alt={item?.title} className="w-16 h-14 min-w-14 md:w-20 md:h-16" />
											<div className="flex flex-col justify-between w-full gap-2 lg:flex-row">
												<div className="flex flex-col">
													<h1 className="text-sm font-medium capitalize text-wrap text-inherit">{item?.title}</h1>
													<p className="inline text-sm text-foreground-400">
														{formatCurrency(item?.price)}&emsp;X&emsp;{item?.quantity}
													</p>
												</div>
												<div className="flex flex-row items-center justify-end gap-1">
													<p className="text-sm text-center text-foreground-400">{formatCurrency(item?.price * item?.quantity)}</p>
												</div>
											</div>
										</div>
									))}
								</div>
								<Divider className="mt-4" />
								<div className="flex justify-end w-full mb-2">
									<h6 className="w-full mb-2 font-semibold text-right dark:text-white">Total : {formatCurrency(totalAmount)}</h6>
								</div>
								<div className="flex flex-wrap -mx-3">
									<div className="w-full max-w-full px-3 flex-0 md:w-6/12 lg:w-5/12">
										<h6 className="mb-2 dark:text-white">Payment Method</h6>
										<div className="flex w-full px-4 py-2 mb-2 shadow-md rounded-xl bg-gray-50 dark:bg-slate-800">
											<div className="flex flex-col w-full">
												<div className="flex flex-row items-center justify-between flex-nowrap">
													<h6 className="text-sm font-semibold leading-normal dark:text-white">{selectedTransaction?.payment_method.name}</h6>
													<Image src={selectedTransaction?.payment_method.imageUrl} width={50} height={50} alt={selectedTransaction?.payment_method.name} className="w-10 h-10" />
												</div>
												<span className="mb-2 text-xs leading-tight">
													VA Name :<span className="ml-2 font-semibold capitalize text-slate-700 dark:text-white/70">{selectedTransaction?.payment_method.virtual_account_name}</span>
												</span>
												<span className="mb-2 text-xs leading-tight">
													VA Number :<span className="ml-2 font-semibold text-slate-700 dark:text-white/70">{selectedTransaction?.payment_method.virtual_account_number}</span>
												</span>
											</div>
										</div>
									</div>
									<div className="w-full max-w-full px-3 flex-0 md:w-6/12 lg:w-5/12">
										<h6 className="mb-2 dark:text-white">Proof Payment</h6>
										<Card className="!bg-gray-100/90 w-full" radius="sm" onPress={() => handleShowProofModal(selectedTransaction?.proofPaymentUrl)} isPressable={selectedTransaction?.proofPaymentUrl === null ? false : true}>
											<CardBody>
												{selectedTransaction?.proofPaymentUrl === null ? (
													<p className="text-sm text-danger">Proof of payment has not been uploaded.</p>
												) : (
													<p className="text-sm text-success">
														<PiPaperclipBold size={16} className="inline -mt-1" />
														&nbsp;Click to see proof of payment
													</p>
												)}
											</CardBody>
										</Card>
									</div>
								</div>
							</div>
						</ModalBody>
						<ModalFooter>
							<Input type="file" onChange={handleUpload} ref={hiddenFileInput} size="sm" radius="sm" accept="image/*" id="proofPayment" name="proofPayment" color="primary" className="hidden" />
							{user?.role === "user" && (
								<Button
									color="success"
									isLoading={isLoading}
									spinner={
										<svg className="w-5 h-5 text-current animate-spin" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
											<path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" />
										</svg>
									}
									className={`${selectedTransaction?.status === "cancelled" ? "hidden" : ""} text-white`}
									startContent={<TbInvoice color="white" className={`${isLoading ? "hidden" : ""}`} />}
									onClick={handleClickUpload}>
									<span className="hidden sm:inline">Upload</span>Proof
								</Button>
							)}
							{user?.role === "user" && (
								<Button color="danger" onClick={() => handleShowCancelModal(selectedTransaction?.id)} className={selectedTransaction?.status === "cancelled" ? "hidden" : ""}>
									Cancel
								</Button>
							)}
							{user?.role === "admin" && (
								<Button color="success" onClick={() => handleShowUpdateModal(selectedTransaction?.id)} className={`${selectedTransaction?.status === "cancelled" || selectedTransaction?.status === "failed" ? "hidden" : selectedTransaction?.status === "success" ? "hidden" : ""} text-white`}>
									Update Status
								</Button>
							)}
							<Button className="text-white bg-bluenavy" onPress={onClose} onClick={handleClose}>
								Back
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
			<ProofModal showProofModal={showProofModal} setShowProofModal={setShowProofModal} proofImageUrl={proofImageUrl} />
			<CancelModal showCancelModal={showCancelModal} setShowCancelModal={setShowCancelModal} selectedCancelTrx={selectedCancelTrx} />
			<UpdateModal showUpdateModal={showUpdateModal} setShowUpdateModal={setShowUpdateModal} selectedUpdateTrx={selectedUpdateTrx} />
		</Modal>
	);
};

export default ViewModal;
