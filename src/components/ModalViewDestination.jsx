import { Button, Card, CardBody, Divider, Modal, ModalContent, ModalBody, ModalFooter } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { noImage } from "@/helpers/const";
import { FaStar, FaLocationDot } from "react-icons/fa6";
import currency from "currency.js";
import apiPostData from "@/pages/api/apiPostData";
import { FaCartPlus } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import apiGetData from "@/pages/api/apiGetData";
import { setList, setCount } from "@/redux/slices/cartListSlice";

const ViewModal = ({ showViewModal, setShowViewModal, selectedDestination }) => {
	const { postData } = apiPostData();
	const [dataImageUrls, setDataImageUrls] = useState([]);
	const [selectedImage, setSelectedImage] = useState("");
	const [sourceMap, setSourceMap] = useState();
	const user = useSelector((state) => state.userLogged.user);
	const router = useRouter();
	const [showButtonAddToCart, setShowButtonAddToCart] = useState(true);
	const dispatch = useDispatch();
	const { getDataAuth } = apiGetData();

	useEffect(() => {
		if (selectedDestination?.location_maps !== undefined) {
			const match = selectedDestination?.location_maps?.match(/<iframe[^>]+src="([^"]+)"/);
			if (match && match[1]) {
				setSourceMap(match[1]);
			} else {
				setSourceMap(null);
			}
		}

		if (selectedDestination !== undefined) {
			setDataImageUrls(selectedDestination?.imageUrls);
		}

		if (dataImageUrls?.length !== undefined) {
			setSelectedImage(dataImageUrls[0]);
		}

		if (user !== null) {
			if (user?.role === "admin") {
				setShowButtonAddToCart(false);
			}
		}
	}, [selectedDestination?.imageUrls, dataImageUrls, user]);

	const handleSelectedImage = (imageUrl) => {
		setSelectedImage(imageUrl);
	};

	const formatCurrency = (value) => {
		const convert = (amount) => currency(amount, { symbol: "Rp. ", separator: ",", decimal: "." });
		return convert(value).format();
	};

	const handleAddToCart = async () => {
		const payload = {
			activityId: selectedDestination?.id,
		};

		const token = getCookie("token");
		if (!token) {
			router.push("/login");
		} else {
			const res = await postData(`add-cart`, payload);
			if (res.status === 200) {
				getDataAuth("carts", (res) => dispatch(setList(res?.data.data)));
				getDataAuth("carts", (res) => dispatch(setCount(res?.data.data.length)));
				toast.success("Destination added to cart");
				setShowViewModal(false);
			} else {
				toast.error("Failed to add to cart destination");
			}
		}
	};

	return (
		<Modal
			isOpen={showViewModal}
			size="5xl"
			onClose={() => {
				setShowViewModal(false);
				setDataImageUrls([]);
				setSelectedImage("");
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
						<ModalBody>
							<div className="flex flex-wrap gap-6 py-2 md:flex-nowrap">
								<div className="flex flex-wrap w-full mx-auto md:w-2/5">
									<div className={`space-y-1 w-[365px] ${selectedDestination?.imageUrls?.length > 1 ? "h-[300px]" : "h-[200px]"} mb-8`}>
										<div className="overflow-hidden rounded-md w-full h-[200px]">
											<img src={selectedImage || noImage} className="object-cover object-center w-full h-full scale-100 rounded-md" alt="img-show" draggable="none" />
										</div>
										{selectedDestination?.imageUrls?.length > 1 && (
											<div className="flex flex-row w-full overflow-x-scroll overflow-y-hidden">
												<div className="flex flex-row space-x-1 transition-all translate-x-px rounded-md snap-x">
													{selectedDestination?.imageUrls !== undefined &&
														selectedDestination?.imageUrls?.map((imageUrl, index) => (
															<div className="relative border-2 snap-start border-solid border-transparent hover:border-primary bg-no-repeat bg-cover bg-center transition-all ease-in rounded-md cursor-pointer w-[100px] h-[100px]" style={{ backgroundImage: `url(${imageUrl || noImage})` }} key={index}>
																<Button onClick={() => handleSelectedImage(imageUrl)} className="absolute w-full h-full bg-transparent"></Button>
															</div>
														))}
												</div>
											</div>
										)}
									</div>
									{sourceMap && (
										<div className="w-[365px] h-[200px]">
											<iframe className="rounded-lg hide-custom-cursor" src={sourceMap} width="100%" height="100%"></iframe>
										</div>
									)}
								</div>
								<div className="flex flex-wrap w-full space-y-2 md:w-3/5 md:space-y-3 md:h-fit">
									<h2 className="text-3xl font-bold text-bluenavy">{selectedDestination?.title}</h2>
									<div className="flex flex-wrap items-center w-full gap-1.5 lg:gap-2 font-medium md:flex-nowrap">
										<FaStar size={16} className="inline text-yellowturmic" />
										{selectedDestination?.rating}
										<Divider orientation="vertical" />
										{selectedDestination?.total_reviews}&nbsp;Reviews
										<Divider orientation="vertical" />
										<FaLocationDot className="inline" />
										{selectedDestination?.city},&nbsp;{selectedDestination?.province}
									</div>
									<Divider className="my-4" />
									<Card className="w-full">
										<CardBody>
											<div className="flex flex-row flex-wrap items-center gap-2 md:flex-nowrap">
												<p className="text-base font-bold line-through capitalize lg:text-lg text-orangejuice">{`${formatCurrency(selectedDestination?.price)}`}</p>
												<p className="text-base font-bold capitalize lg:text-lg text-bluesky">{`${formatCurrency(selectedDestination?.price_discount)}`}</p>
											</div>
										</CardBody>
									</Card>
									<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
										<h3 className="w-1/5 md:w-[25%] lg:w-1/5 font-semibold capitalize">Description</h3>
										<p className="w-4/5 md:w-[75%] lg:w-4/5 text-base text-justify">{selectedDestination?.description}</p>
									</div>
									<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
										<h3 className="w-1/5 md:w-[25%] lg:w-1/5 font-semibold capitalize">Facilities</h3>
										<p className="w-4/5 md:w-[75%] lg:w-4/5 text-base text-justify">{selectedDestination?.facilities}</p>
									</div>
									<div className="flex flex-wrap w-full gap-1.5 lg:gap-2 md:flex-nowrap">
										<h3 className="w-1/5 md:w-[25%] lg:w-1/5 font-semibold capitalize">Address</h3>
										<p className="w-4/5 md:w-[75%] lg:w-4/5 text-base text-justify">{selectedDestination?.address}</p>
									</div>
								</div>
							</div>
						</ModalBody>
						{showButtonAddToCart && (
							<ModalFooter>
								<Button color="success" onPress={onClose} className="font-semibold" onClick={handleAddToCart}>
									<FaCartPlus size={14} />
									&nbsp;add to cart
								</Button>
							</ModalFooter>
						)}
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default ViewModal;
