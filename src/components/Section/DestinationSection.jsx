import { useState, useEffect } from "react";
import apiGetData from "@/pages/api/apiGetData";
import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react";
import { FaAngleLeft, FaAngleRight, FaStar, FaLocationDot } from "react-icons/fa6";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import currency from "currency.js";
import ViewModal from "@/components/ModalViewDestination";

const DestinationSection = () => {
	const { getData } = apiGetData();
	const [destinations, setDestinations] = useState([]);
	const [showViewModal, setShowViewModal] = useState(false);
	const [selectedDestination, setSelectedDestination] = useState([]);

	const formatCurrency = (value) => {
		const convert = (amount) => currency(amount, { symbol: "Rp. ", separator: ",", decimal: "." });
		return convert(value).format();
	};

	const responsive = {
		0: {
			items: 1,
		},
		568: {
			items: 3,
		},
		1024: {
			items: 4,
			itemsFit: "contain",
		},
	};

	useEffect(() => {
		getData("activities", (res) => setDestinations(res?.data.data));
	}, []);

	const handleShowViewModal = async (id) => {
		const getDestination = async () => {
			await getData(`activity/${id}`, (res) => {
				setSelectedDestination(res?.data.data);
			});
		};

		try {
			await getDestination();
			setShowViewModal(!showViewModal);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className="w-[94%] md:w-4/5 mx-auto py-5 pb-10 xl:py-4">
			<div className="container items-center max-w-6xl mx-auto xl:px-5">
				<div className="flex flex-col flex-wrap items-center gap-0 sm:-mx-3">
					<div className="w-full px-6 pb-6 md:pb-0 md:px-0 md:space-y-2 xl:px-0">
						<p className="text-base font-medium text-center uppercase text-bluesky md:text-tiny md:text-left sm:max-w-md lg:text-sm xl:text-lg md:max-w-3xl">Top Destinations</p>
						<h1 className="text-2xl min-[425px]:text-3xl font-extrabold !leading-snug tracking-tight text-center text-bluenavy md:text-left md:text-2xl lg:text-3xl xl:text-4xl">Wonderful place for you</h1>
					</div>
					<div className="flex justify-between w-full gap-6 px-4 bg-transparent md:px-0">
						<AliceCarousel
							mouseTracking
							disableDotsControls
							items={destinations?.map((destination, index) => (
								<Card key={index} isPressable onPress={() => handleShowViewModal(destination?.id)} className="w-full md:w-[95%] h-full z-50 my-0 md:my-6 col-span-12 sm:col-span-7 bg-gray-50 hover:scale-105 transition-all duration-500 ease-in-out">
									<CardBody className="relative py-2 overflow-visible">
										<Image removeWrapper alt="Card background" className="object-cover w-full h-[150px] md:h-[120px] rounded-xl" src={destination?.imageUrls[0]} width={367} />
										<Chip startContent={<FaStar size={12} />} size="sm" className="absolute z-20 top-4 right-5" variant="faded" color="warning">
											{destination?.rating}
										</Chip>
									</CardBody>
									<CardFooter className="flex-col items-start px-4 py-2">
										<h4 className="pb-1 font-bold text-large md:text-base text-bluenavy">{destination?.title}</h4>
										<p className="font-bold line-through capitalize text-orangejuice text-tiny">{`${formatCurrency(destination?.price)}`}</p>
										<p className="font-bold capitalize text-bluesky text-tiny">{`${formatCurrency(destination?.price_discount)}`}</p>
										<small className="inline h-10 pt-2 text-left text-default-500 text-tiny xl:text-sm">
											<FaLocationDot className="inline" />
											{` ${destination?.city}, ${destination?.province}`}
										</small>
									</CardFooter>
								</Card>
							))}
							controlsStrategy="responsive"
							responsive={responsive}
							infinite={false}
							swipeDelta
							keyboardNavigation={true}
							renderPrevButton={() => {
								return <FaAngleLeft className="absolute hover:bg-orangejuice hover:scale-110 transition-all duration-500 ease-in-out p-2 cursor-pointer rounded-full max-[425px]:left-2 md:right-16 size-8 outline outline-2 outline-offset-2 outline-primary bg-blueocean top-28 md:-top-10" />;
							}}
							renderNextButton={() => {
								return <FaAngleRight className="absolute p-2 transition-all duration-500 ease-in-out rounded-full cursor-pointer hover:bg-orangejuice hover:scale-110 right-2 md:right-4 size-8 outline outline-2 outline-offset-2 outline-primary bg-blueocean top-28 md:-top-10" />;
							}}
						/>
					</div>
				</div>
			</div>
			<ViewModal showViewModal={showViewModal} setShowViewModal={setShowViewModal} selectedDestination={selectedDestination} />
		</section>
	);
};

export default DestinationSection;
