import { Button, Input, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import apiUpload from "@/pages/api/apiUpload";
import apiPostData from "@/pages/api/apiPostData";
import { addImage } from "@/helpers/const";

const CreateModal = ({ showCreateModal, setShowCreateModal }) => {
	const { upload } = apiUpload();
	const { postData } = apiPostData();
	const formRef = useRef(null);
	const [imageUrlUploaded, setImageUrlUploaded] = useState(null);
	const [errImage, setErrImage] = useState(false);
	const [errMsgImage, setMsgErrImage] = useState("");
	const [discountPrice, setDiscountPrice] = useState("");
	const [claimPrice, setClaimPrice] = useState("");

	const handleUpload = async (e) => {
		e.preventDefault();

		const file = e.target.files[0];

		if (!file) {
			return;
		} else if (!file.type.startsWith("image/")) {
			setImageUrlUploaded(null);
			setErrImage(true);
			setMsgErrImage("Format file must be jpg, jpeg or png");
			toast.error("The file must be an image in \n jpg, jpeg or png format.");

			return false;
		}

		const dataImage = new FormData();
		dataImage.append("image", file);

		try {
			const res = await upload("upload-image", dataImage);
			setErrImage(false);
			setMsgErrImage("");
			setImageUrlUploaded(res?.data.url);
			setTimeout(() => {
				toast.success("Image uploaded");
			}, 1500);
			return res?.data.url;
		} catch (err) {
			setImageUrlUploaded(null);
			setErrImage(true);
			setMsgErrImage("Format file must be jpg, jpeg or png");
			toast.error("Failed to upload image. \n Maybe the image is too big. \n Try another image.");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			title: e.target.title.value,
			imageUrl: imageUrlUploaded,
			promo_code: e.target.promo_code.value,
			description: e.target.description.value,
			terms_condition: e.target.terms.value,
			promo_discount_price: parseFloat(e.target.discount_price.value),
			minimum_claim_price: parseFloat(e.target.claim_price.value),
		};

		for (const key in payload) {
			if (!payload[key]) {
				toast.error("Please input all fields!");
				return;
			}
		}

		const res = await postData("create-promo", payload);
		if (res?.status === 200) {
			toast.success("Promo successfully created");
			setShowCreateModal(false);
			setClaimPrice("");
			setDiscountPrice("");
			setImageUrlUploaded(null);
		} else {
			toast.error("Failed to create promo");
		}
	};

	const handleClose = () => {
		formRef.current.reset();
		setClaimPrice("");
		setDiscountPrice("");
		setImageUrlUploaded(null);
	};

	return (
		<Modal
			isOpen={showCreateModal}
			size="5xl"
			onClose={() => {
				setShowCreateModal(false);
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
							<div className="mx-2 my-4 align-center">Create Promo</div>
						</ModalHeader>
						<form ref={formRef} className="mb-5 space-y-2" onSubmit={handleSubmit}>
							<ModalBody>
								<div className="flex flex-wrap gap-2 md:flex-nowrap">
									<div className="flex flex-wrap w-full mx-auto md:w-2/5">
										<div className="overflow-hidden rounded-md w-full h-[240px]">
											<img src={imageUrlUploaded ? imageUrlUploaded : addImage} className="object-cover object-center w-full h-full scale-100 rounded-md" alt="img-show" />
										</div>
										<input type="file" accept="image/*" onChange={handleUpload} id="dataimage" name="dataimage" className="block w-full px-1 py-2 mt-2 text-sm border-2 border-gray-200 rounded-lg cursor-pointer text-primary hover:border-gray-400 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
										{errImage && <p className="text-tiny text-danger">{errMsgImage}</p>}
									</div>
									<div className="flex flex-wrap w-full space-y-1.5 md:space-y-3 md:w-3/5">
										<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
											<Input type="text" id="title" size="sm" label="Title" name="title" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" autoComplete="off" variant="bordered" color="primary" autoFocus />
											<Input type="text" id="promo_code" size="sm" label="Promo Code" name="promo_code" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" autoComplete="off" variant="bordered" color="primary" />
										</div>
										<div className="flex flex-wrap w-full">
											<Textarea
												label="Description"
												id="description"
												name="description"
												variant="bordered"
												color="primary"
												placeholder="Enter description"
												disableAnimation
												disableAutosize
												classNames={{
													base: "max-w-full",
													input: "resize-y min-h-[40px]",
												}}
											/>
										</div>
										<div className="flex flex-wrap w-full">
											<Textarea
												label="Terms and Conditions"
												id="terms"
												name="terms"
												variant="bordered"
												color="primary"
												placeholder="Enter terms and conditions"
												disableAnimation
												disableAutosize
												classNames={{
													base: "max-w-full",
													input: "resize-y min-h-[40px]",
												}}
											/>
										</div>
										<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
											<Input type="number" id="price" name="discount_price" value={discountPrice} label="Discount Price" onChange={(e) => setDiscountPrice(e.target.value.replace(/[^0-9]/g, ""))} size="sm" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" />
											<Input type="number" id="discount" name="claim_price" value={claimPrice} label="Claim Price" onChange={(e) => setClaimPrice(e.target.value.replace(/[^0-9]/g, ""))} size="sm" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" />
										</div>
									</div>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" onPress={onClose} onClick={handleClose}>
									Cancel
								</Button>
								<Button type="submit" className="bg-bluenavy text-gray-50">
									Create
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
