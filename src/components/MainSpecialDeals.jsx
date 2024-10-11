import { useState, useEffect } from "react";
import apiGetData from "@/pages/api/apiGetData";
import { Card, CardBody, CardFooter, Chip, Image, Input } from "@nextui-org/react";
import { FaStar, FaLocationDot } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import currency from "currency.js";
import { patternBg } from "@/helpers/const";
import ViewModal from "@/components/ModalViewPromo";

const MainSpecialDeals = () => {
	const { getData } = apiGetData();
	const [promos, setPromos] = useState([]);
	const [selectedPromo, setSelectedPromo] = useState([]);
	const [showViewModal, setShowViewModal] = useState(false);
	const [search, setSearch] = useState("");

	const formatCurrency = (value) => {
		const convert = (amount) => currency(amount, { symbol: "Rp. ", separator: ",", decimal: "." });
		return convert(value).format();
	};

	useEffect(() => {
		getData("promos", (res) => setPromos(res?.data.data));
	}, [showViewModal]);

	useEffect(() => {
		getData("promos", (res) => {
			const dataFiltered = res?.data.data.filter((promo) => promo?.title.toLowerCase().includes(search.toLowerCase()));
			setPromos(dataFiltered);
		});
	}, [search]);

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const handleShowViewModal = async (id) => {
		const getPromo = async () => {
			await getData(`promo/${id}`, (res) => {
				setSelectedPromo(res?.data.data);
			});
		};

		try {
			await getPromo();
			setShowViewModal(!showViewModal);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className="w-[94%] md:w-4/5 mx-auto py-5 pb-10 xl:py-4">
			<div className="container items-center max-w-6xl px-2 pt-5 pb-10 mx-auto xl:px-5">
				<div className="flex flex-col relative flex-wrap items-center justify-center h-[150px] md:h-[200px] lg:h-[250px] outline outline-2 shadow-lg outline-offset-2 outline-primary rounded-3xl gap-0 sm:-mx-3">
					<Image removeWrapper alt="category image" className="absolute object-cover w-full h-full" src={patternBg} />
					<div className="relative w-full px-0 pb-6 md:pb-0 md:px-0 xl:px-0">
						<h1 className="absolute w-full text-3xl min-[375px]:text-4xl font-extrabold text-center xl:text-5xl -top-1 min-[375px]:-top-0 md:-top-4 text-gray-500/20">Wanderlust on a Budget: Explore Our Special Offers</h1>
						<h1 className="text-2xl min-[375px]:text-3xl font-extrabold !leading-snug tracking-tight text-center text-bluenavy lg:text-3xl xl:text-4xl">
							Wanderlust on a Budget: Explore Our <span className="text-orangejuice">Special Offers</span>
						</h1>
					</div>
				</div>
			</div>
			<div className="container items-center max-w-6xl min-h-[700px] mx-auto xl:px-5">
				<div className="flex flex-col flex-wrap items-center gap-4 sm:-mx-3">
					<div className="flex flex-wrap justify-end w-full max-w-full gap-3">
						<div className="w-full px-2 md:w-2/6 lg:w-1/4">
							<Input
								isClearable
								radius="lg"
								onChange={handleSearch}
								classNames={{
									label: "text-black/50 dark:text-white/90",
									input: ["bg-transparent", "text-black/90 dark:text-white/90", "placeholder:text-default-700/50 dark:placeholder:text-white/60"],
									innerWrapper: "bg-transparent",
									inputWrapper: ["shadow-md", "bg-default-200/50", "dark:bg-default/60", "backdrop-blur-xl", "backdrop-saturate-200", "hover:bg-default-200/70", "dark:hover:bg-default/70", "group-data-[focus=true]:bg-default-200/50", "dark:group-data-[focus=true]:bg-default/60", "!cursor-text"],
								}}
								placeholder="Type to search..."
								startContent={<FiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}
							/>
						</div>
					</div>
					<div className="flex flex-wrap w-full gap-3 px-2 md:gap-0 md:px-0">
						{promos?.map((promo, index) => (
							<div className="flex flex-col w-full md:w-2/6 lg:w-1/4 md:px-0">
								<Card key={index} isPressable onPress={() => handleShowViewModal(promo?.id)} className="w-full md:w-[95%] h-full z-50 my-0 md:my-6 col-span-12 sm:col-span-7 bg-gray-50 hover:scale-105 transition-all duration-500 ease-in-out">
									<CardBody className="py-2 overflow-visible">
										<Image removeWrapper alt="Card background" className="object-cover w-full h-[150px] md:h-[150px] rounded-xl" src={promo?.imageUrl} width={367} />
									</CardBody>
									<CardFooter className="flex-col items-start px-4 py-2">
										<h4 className="pb-1 font-bold text-left text-large md:text-base text-bluenavy">{promo?.title}</h4>
										<p className="font-medium capitalize text-orangejuice text-tiny">Get Discount</p>
										<p className="font-bold capitalize text-bluesky text-tiny">{`${formatCurrency(promo?.promo_discount_price)}`}</p>
									</CardFooter>
								</Card>
							</div>
						))}
					</div>
				</div>
			</div>
			<ViewModal showViewModal={showViewModal} setShowViewModal={setShowViewModal} selectedPromo={selectedPromo} />
		</section>
	);
};

export default MainSpecialDeals;