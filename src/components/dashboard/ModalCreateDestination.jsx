import { Button, Input, Select, SelectItem, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import apiUpload from "@/pages/api/apiUpload";
import apiPostData from "@/pages/api/apiPostData";
import { addImage } from "@/helpers/const";
import { ReactMinimalGallery } from "react-minimal-gallery";
import apiGetData from "@/pages/api/apiGetData";

const CreateModal = ({ showCreateModal, setShowCreateModal }) => {
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
	const [sizeGalery, setSizeGalery] = useState(365);
	const [width, setWidth] = useState(0);
	const [categoryId, setCategoryId] = useState(null);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		getData("categories", (res) => setCategories(res?.data.data));
		const handleResize = () => setWidth(window?.innerWidth);
		window?.addEventListener("resize", handleResize);
		return () => window?.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (width < 768) {
			setSizeGalery(365);
		} else if (width < 1024) {
			setSizeGalery(270);
		} else if (width < 1280) {
			setSizeGalery(365);
		} else {
			setSizeGalery(385);
		}
	}, [width]);

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
			categoryId: categoryId,
			title: e.target.title.value,
			description: description,
			imageUrls: dataImageUrls,
			price: parseFloat(e.target.price.value),
			price_discount: parseFloat(e.target.discount.value),
			rating: parseFloat(e.target.rating.value),
			total_reviews: e.target.reviews.value,
			facilities: facilities,
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

		const res = await postData("create-activity", payload);
		if (res.status === 200) {
			toast.success("Destination successfully created");
			setShowCreateModal(false);
			setDataImageUrls([]);
		} else {
			toast.error("Failed to create destination");
		}
	};

	const handleClose = () => {
		formRef.current.reset();
		setDataImageUrls([]);
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
							<div className="mx-2 my-4 align-center">Create Destination</div>
						</ModalHeader>
						<form ref={formRef} className="mb-5 space-y-2 md:space-y-3" onSubmit={handleSubmit}>
							<ModalBody>
								<div className="flex flex-wrap gap-2 md:flex-nowrap">
									<div className="flex flex-wrap w-full mx-auto md:w-2/5">
										<ReactMinimalGallery images={dataImageUrls?.length === 0 ? imagePlaceholder : dataImageUrls} width={sizeGalery} height={200} thumbnailWidth={100} hoverColor="#2DC573" />
										<input type="file" accept="image/*" onChange={handleUpload} id="dataimage" name="dataimage" className="block w-full px-1 py-2 mt-2.5 md:mt-8 text-sm border-2 border-gray-200 rounded-lg cursor-pointer text-primary hover:border-gray-400 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
										{errImage && <p className="text-tiny text-danger">{errMsgImage}</p>}
									</div>
									<div className="flex flex-wrap w-full space-y-2 md:w-3/5 md:space-y-3">
										<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
											<Input type="text" id="title" size="sm" label="Title" name="title" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" autoComplete="off" variant="bordered" color="primary" autoFocus />
											<Select label="Category" id="categoryId" name="categoryId" onChange={(e) => setCategoryId(e.target.value)} size="sm" color="primary" placeholder="Select Category" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full rounded-md" variant="bordered">
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
												disableAnimation
												disableAutosize
												onValueChange={(e) => setDescription(e)}
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
												disableAnimation
												disableAutosize
												onValueChange={(e) => setFacilities(e)}
												classNames={{
													base: "max-w-full",
													input: "resize-y min-h-[40px]",
												}}
											/>
										</div>
										<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
											<Input type="number" id="price" name="price" label="Price" size="sm" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" />
											<Input type="number" id="discount" name="discount" label="Discount Price" size="sm" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" />
										</div>
										<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
											<Input type="number" id="rating" name="rating" label="Rating" size="sm" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" />
											<Input type="number" id="reviews" name="reviews" label="Total Reviews" size="sm" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" />
										</div>
										<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
											<Input type="text" id="address" name="address" label="Address" size="sm" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" autoComplete="off" />
											<Input type="text" id="province" name="province" label="Province" size="sm" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" autoComplete="off" />
										</div>
										<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
											<Input type="text" id="city" name="city" label="City" size="sm" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" autoComplete="off" />
											<Input type="text" id="location" name="location" label="Location Maps" size="sm" className="max-w-[49%] max-[375px]:max-w-full md:max-w-full" variant="bordered" color="primary" />
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
