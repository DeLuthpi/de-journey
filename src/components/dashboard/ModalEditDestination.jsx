import { Button, Input, Select, SelectItem, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import apiUpload from "@/pages/api/apiUpload";
import apiPostData from "@/pages/api/apiPostData";
import { addImage, noImage } from "@/helpers/const";
import apiGetData from "@/pages/api/apiGetData";
import { FiTrash2 } from "react-icons/fi";
import Link from "next/link";

const EditModal = ({ showEditModal, setShowEditModal, selectedDestination }) => {
	const { upload } = apiUpload();
	const { getData } = apiGetData();
	const { postData } = apiPostData();
	const formRef = useRef(null);
	const [description, setDescription] = useState("");
	const [facilities, setFacilities] = useState("");
	const [imagePlaceholder, setImagePlaceholder] = useState([addImage]);
	const [dataImageUrls, setDataImageUrls] = useState([]);
	const [errImage, setErrImage] = useState(false);
	const [errMsgImage, setMsgErrImage] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [categories, setCategories] = useState([]);
	const [price, setPrice] = useState("");
	const [discount, setDiscount] = useState("");
	const [reviews, setReviews] = useState("");
	const [selectedImage, setSelectedImage] = useState("");

	useEffect(() => {
		if (selectedDestination !== undefined) {
			setDataImageUrls(selectedDestination?.imageUrls);
		}
	}, [selectedDestination?.imageUrls]);

	useEffect(() => {
		getData("categories", (res) => setCategories(res?.data.data));
		if (dataImageUrls?.length !== undefined) {
			setSelectedImage(dataImageUrls[0]);
		}
	}, [dataImageUrls]);

	const handleSelectedImage = (imageUrl) => {
		setSelectedImage(imageUrl);
	};

	const handleDeleteImage = (imageUrl, index) => {
		const newImageUrls = [...dataImageUrls];
		newImageUrls.splice(index, 1);
		setDataImageUrls(newImageUrls);
		setSelectedImage(newImageUrls[0]);
		dataImageUrls.length === 1 ? setDataImageUrls([""]) : setDataImageUrls(newImageUrls);
	};

	const handleUpload = async (e) => {
		e.preventDefault();

		const file = e.target.files[0];

		if (!file) {
			return;
		} else if (!file.type.startsWith("image/")) {
			setDataImageUrls([...dataImageUrls]);
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
			dataImageUrls?.length === 0 ? setDataImageUrls([res?.data.url]) : setDataImageUrls([...dataImageUrls, res?.data.url]);
			setTimeout(() => {
				toast.success("Images uploaded");
			}, 1500);
			return res?.data.url;
		} catch (err) {
			setDataImageUrls([...dataImageUrls, null]);
			setErrImage(true);
			setMsgErrImage("Format file must be jpg, jpeg or png");
			toast.error("Failed to upload image. \n Maybe the image is too big. \n Try another image.");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			categoryId: categoryId || selectedDestination?.categoryId,
			title: e.target.title.value,
			description: description || selectedDestination?.description,
			imageUrls: dataImageUrls || selectedDestination?.imageUrls,
			price: parseFloat(e.target.price.value),
			price_discount: parseFloat(e.target.discount.value),
			rating: parseFloat(e.target.rating.value),
			total_reviews: e.target.reviews.value,
			facilities: facilities || selectedDestination?.facilities,
			address: e.target.address.value,
			province: e.target.province.value,
			city: e.target.city.value,
			location_maps: e.target.location.value,
		};

		for (const key in payload) {
			if (!payload[key]) {
				toast.error("Please input all fields!");
				return;
			}
		}

		const res = await postData(`update-activity/${selectedDestination?.id}`, payload);
		if (res.status === 200) {
			toast.success("Destination successfully updated");
			setShowEditModal(false);
			formRef.current.reset();
			setDescription("");
			setFacilities("");
			setPrice("");
			setDiscount("");
			setReviews("");
			setDataImageUrls([]);
		} else {
			toast.error("Failed to update destination");
		}
	};

	const handleClose = () => {
		formRef.current.reset();
		setDescription("");
		setFacilities("");
		setPrice("");
		setDiscount("");
		setReviews("");
		setDataImageUrls([]);
		setSelectedImage("");
	};

	return (
		<Modal
			isOpen={showEditModal}
			size="5xl"
			onClose={() => {
				setShowEditModal(false);
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
							<div className="mx-2 my-4 align-center">Update Destination</div>
						</ModalHeader>
						<form ref={formRef} className="mb-5 space-y-2 md:space-y-3" onSubmit={handleSubmit}>
							<ModalBody>
								<div className="flex flex-wrap gap-2 md:flex-nowrap">
									<div className="flex flex-wrap w-full mx-auto md:w-2/5">
										<div className="space-y-1 w-[365px] h-[300px]">
											<div className="overflow-hidden rounded-md w-[365px] h-[200px]">
												<img src={selectedImage || noImage} className="object-cover object-center w-full h-full scale-100 rounded-md" alt="img-show" draggable="none" />
											</div>
											<div className="flex flex-row w-full overflow-x-scroll overflow-y-hidden">
												<div className="flex flex-row space-x-1 transition-all translate-x-px rounded-md snap-x">
													{dataImageUrls !== undefined &&
														dataImageUrls?.map((imageUrl, index) => (
															<div className="relative border-2 snap-start border-solid border-transparent hover:border-primary bg-no-repeat bg-cover bg-center transition-all ease-in rounded-md cursor-pointer w-[100px] h-[100px]" style={{ backgroundImage: `url(${imageUrl || noImage})` }} key={index}>
																<Button onClick={() => handleSelectedImage(imageUrl)} className="absolute w-full h-full bg-transparent"></Button>
																<Button onClick={() => handleDeleteImage(imageUrl, index)} className={`${dataImageUrls[0] === "" ? "hidden" : "absolute z-10 p-1 !h-6 m-0 text-white min-w-1 text-tiny bg-danger"}`} radius="xs" size="xs">
																	<FiTrash2 className="size-4" />
																</Button>
															</div>
														))}
												</div>
											</div>
										</div>
										<input type="file" accept="image/*" onChange={handleUpload} id="dataimage" name="dataimage" className="block w-full px-1 py-2 mt-2.5 md:mt-8 text-sm border-2 border-gray-200 rounded-lg cursor-pointer text-primary hover:border-gray-400 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
										{errImage && <p className="text-tiny text-danger">{errMsgImage}</p>}
									</div>
									<div className="flex flex-wrap w-full space-y-2 md:w-3/5 md:space-y-3">
										<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
											<Input type="text" id="title" size="sm" label="Title" defaultValue={selectedDestination?.title} name="title" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" autoComplete="off" variant="bordered" color="primary" autoFocus />
											<Select label="Category" id="categoryId" defaultSelectedKeys={[`${selectedDestination?.categoryId}`]} name="categoryId" onChange={(e) => setCategoryId(e.target.value)} size="sm" color="primary" placeholder="Select Category" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full rounded-md" variant="bordered">
												{categories?.map((category) => (
													<SelectItem key={category?.id} value={category?.id}>
														{category?.name}
													</SelectItem>
												))}
											</Select>
										</div>
										<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
											<Textarea
												label="Description"
												variant="bordered"
												color="primary"
												placeholder="Enter description"
												defaultValue={selectedDestination?.description}
												onValueChange={(e) => setDescription(e)}
												disableAnimation
												disableAutosize
												classNames={{
													base: "max-w-full",
													input: "resize-y min-h-[40px]",
												}}
											/>
											<Textarea
												label="Facilities"
												variant="bordered"
												color="primary"
												placeholder="Enter facilities"
												defaultValue={selectedDestination?.facilities}
												onValueChange={(e) => setFacilities(e)}
												disableAnimation
												disableAutosize
												classNames={{
													base: "max-w-full",
													input: "resize-y min-h-[40px]",
												}}
											/>
										</div>
										<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
											<Input type="number" id="price" name="price" defaultValue={price === "" ? selectedDestination?.price : price} label="Price" onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ""))} size="sm" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" />
											<Input type="number" id="discount" name="discount" defaultValue={discount === "" ? selectedDestination?.price_discount : discount} label="Discount Price" onChange={(e) => setDiscount(e.target.value.replace(/[^0-9]/g, ""))} size="sm" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" />
										</div>
										<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
											<Input type="number" id="rating" name="rating" label="Rating" defaultValue={selectedDestination?.rating} size="sm" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" />
											<Input type="number" id="reviews" name="reviews" defaultValue={reviews === "" ? selectedDestination?.total_reviews : reviews} label="Total Reviews" onChange={(e) => setReviews(e.target.value.replace(/[^0-9]/g, ""))} size="sm" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" />
										</div>
										<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
											<Input type="text" id="address" name="address" label="Address" defaultValue={selectedDestination?.address} size="sm" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" autoComplete="off" />
											<Input type="text" id="province" name="province" label="Province" defaultValue={selectedDestination?.province} size="sm" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" autoComplete="off" />
										</div>
										<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
											<Input type="text" id="city" name="city" label="City" size="sm" defaultValue={selectedDestination?.city} className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" autoComplete="off" />
											<Input type="text" id="location" name="location" label="Location Maps" defaultValue={selectedDestination?.location_maps} size="sm" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" />
										</div>
									</div>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" onPress={onClose} onClick={handleClose}>
									Cancel
								</Button>
								<Button type="submit" className="bg-bluenavy text-gray-50">
									Save
								</Button>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default EditModal;
