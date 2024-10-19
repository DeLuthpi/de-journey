import { Avatar, Button, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import apiGetData from "@/pages/api/apiGetData";
import apiPostData from "@/pages/api/apiPostData";
import { useSelector, useDispatch } from "react-redux";
import { setAmount, setTotalAmount, setList, setCount } from "@/redux/slices/cartListSlice";
import currency from "currency.js";
import { useEffect, useState } from "react";

const CreateModal = ({ showCreateModal, setShowCreateModal, listSelected }) => {
	const dispatch = useDispatch();
	const { getData, getDataAuth } = apiGetData();
	const { postData } = apiPostData();
	const [paymentMethod, setPaymentMethod] = useState([]);
	const [paymentMethodId, setPaymentMethodId] = useState(null);
	const totalAmount = useSelector((state) => state?.cartList.totalAmount);
	const listCheckout = useSelector((state) => state?.cartList.listChecked);

	useEffect(() => {
		getData("payment-methods", (res) => setPaymentMethod(res?.data.data));

		dispatch(setAmount(0));
		listCheckout?.map((list) => {
			dispatch(setTotalAmount(parseInt(list?.activity.price * list?.quantity)));
		});
	}, [listCheckout]);

	const formatCurrency = (value) => {
		const convert = (amount) => currency(amount, { symbol: "Rp. ", separator: ",", decimal: "." });
		return convert(value).format();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = {
			cartIds: listSelected,
			paymentMethodId: paymentMethodId,
		};

		for (const key in payload) {
			if (!payload[key]) {
				toast.error("Please select payment method!");
				return;
			}
		}

		const res = await postData("create-transaction", payload);
		if (res.status === 200) {
			toast.success("Transaction successfully created");
			getDataAuth("carts", (res) => dispatch(setList(res?.data.data)));
			getDataAuth("carts", (res) => dispatch(setCount(res?.data.data.length)));
			dispatch(setAmount(0));
			setShowCreateModal(false);
		} else {
			toast.error("Failed to create transaction");
		}
	};

	return (
		<Modal
			isOpen={showCreateModal}
			size="lg"
			onClose={() => {
				setShowCreateModal(false);
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
							<div className="mx-2 my-4 align-center">Create Transaction</div>
						</ModalHeader>
						<form className="mb-5 space-y-2 md:space-y-3" onSubmit={handleSubmit}>
							<ModalBody>
								{listCheckout?.map((list, index) => (
									<div key={index} className="flex flex-row items-start justify-between gap-2 flex-nowrap">
										<Avatar isBordered radius="sm" src={list?.activity.imageUrls[0]} size="lg" alt={list?.activity.title} className="h-20 w-18 min-w-14 md:w-24 md:h-20" />
										<div className="flex flex-col justify-between w-full gap-2 lg:flex-row">
											<div className="flex flex-col">
												<h1 className="text-sm font-medium capitalize text-wrap text-inherit">{list?.activity.title}</h1>
												<p className="inline text-sm text-foreground-400">
													{formatCurrency(list?.activity.price)}&emsp;X&emsp;{list?.quantity}
												</p>
											</div>
											<div className="flex flex-row items-center justify-end gap-1">
												<p className="text-sm text-center text-foreground-400">{formatCurrency(list?.activity.price * list?.quantity)}</p>
											</div>
										</div>
									</div>
								))}
								<Divider className="mt-2" />
								<div className="flex flex-row items-center justify-between gap-2">
									<span className="w-2/4 text-base font-bold">Total</span>
									<span className="w-2/4 text-base font-bold text-right">{formatCurrency(totalAmount)}</span>
								</div>
								<div className="flex flex-row items-center justify-between gap-2">
									<span className="w-2/4 text-sm">Payment Method</span>
									<Select id="paymentMethodId" name="paymentMethodId" aria-labelledby="paymentMethodId" className="inline w-2/4" onChange={(e) => setPaymentMethodId(e.target.value)} size="md" color="primary" placeholder="Select Payment" radius="lg" variant="bordered">
										{paymentMethod?.map((list) => (
											<SelectItem key={list?.id} value={list?.id}>
												{list?.name}
											</SelectItem>
										))}
									</Select>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" onPress={onClose}>
									Cancel
								</Button>
								<Button type="submit" className="bg-bluenavy text-gray-50">
									Order Now
								</Button>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default CreateModal;
