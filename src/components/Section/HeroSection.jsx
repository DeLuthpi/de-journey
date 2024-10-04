import { Button, Chip, Link } from "@nextui-org/react";
import { BsArrowRightShort } from "react-icons/bs";
import { PiAirplaneTiltLight, PiMapPin } from "react-icons/pi";
import { TbUserPlus } from "react-icons/tb";
import apiGetData from "@/pages/api/apiGetData";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { bannerImg1, bannerImg2, bannerImg3 } from "@/helpers/const";

const HeroSection = () => {
	const { getData } = apiGetData();
	const [banner1, setBanner1] = useState([]);
	const [banner2, setBanner2] = useState([]);
	const [banner3, setBanner3] = useState([]);

	useEffect(() => {
		getData("banners", (res) => setBanner1(res?.data.data));
		getData("banners", (res) => setBanner2(res?.data.data));
		getData("banners", (res) => setBanner3(res?.data.data));
	}, []);

	return (
		<section className="w-[94%] md:w-4/5 mx-auto py-16 justify-center">
			<div className="container items-center max-w-6xl mx-auto xl:px-5">
				<div className="flex flex-wrap items-center sm:-mx-3">
					<div className="z-20 w-full px-6 md:px-3 xl:px-0 md:w-1/2">
						<div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-xl md:space-y-4 lg:space-y-8 xl:space-y-9 lg:pr-0 md:pb-0">
							<h1 className="text-3xl font-extrabold !leading-tight tracking-tight text-center text-gray-900 md:text-left sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
								<span className="inline">Discover&nbsp;</span>
								<span className="inline text-primary">Best Place&nbsp;</span>
								<span className="inline">to enjoy your next&nbsp;</span>
								<span className="inline text-orangejuice">vacation</span>
							</h1>
							<p className="mx-auto text-sm text-center text-gray-500 md:text-left sm:max-w-md lg:text-xl md:max-w-3xl">Immerse yourself in a world of wanderlust with our curated travel experiences. From breathtaking landscapes to cultural gems, embark on unforgettable adventures.</p>
							<div className="relative flex flex-col items-center sm:flex-row sm:space-x-4">
								<Button as={Link} href="/destination" className="w-[64%] md:w-fit bg-blueocean text-white font-medium hover:bg-bluesky hover:scale-105 pl-7 duration-500 py-4 lg:py-6" radius="full" endContent={<BsArrowRightShort className="size-6" />}>
									Explore Destination
								</Button>
							</div>
						</div>
					</div>
					<div className="relative w-full md:w-1/2">
						<div className="flex flex-row items-center justify-center gap-5 xl:gap-8 lg:justify-end flex-nowrap">
							<div className="w-5/12 space-y-5 xl:space-y-8">
								<AliceCarousel activeIndex={0} infinite autoPlay animationDuration={4200} disableButtonsControls disableDotsControls animationType="fadeout">
									{banner1.map((banner, index) => (
										<div key={index} className="relative flex items-center w-full h-40 overflow-hidden shadow-none lg:h-52 xl:h-[17rem] rounded-3xl ">
											<img src={banner?.imageUrl} alt={banner?.name} className="object-cover w-full h-40 lg:h-52 xl:h-[17rem]" onError={(e) => (e.target.src = bannerImg1)} />
										</div>
									))}
								</AliceCarousel>
								<div className="absolute left-0 z-20 p-3 text-white rounded-full xl:p-4 top-28 lg:top-40 xl:top-52 lg:left-10 bg-bluenavy">
									<PiAirplaneTiltLight size={18} />
								</div>
								<AliceCarousel activeIndex={1} infinite autoPlay animationDuration={4400} disableButtonsControls disableDotsControls animationType="fadeout">
									{banner2.map((banner, index) => (
										<div key={index} className="relative flex items-center w-full h-40 overflow-hidden shadow-none lg:h-52 xl:h-[17rem] rounded-3xl ">
											<img src={banner?.imageUrl} alt={banner?.name} className="object-cover w-full h-40 lg:h-52 xl:h-[17rem]" onError={(e) => (e.target.src = bannerImg2)} />
										</div>
									))}
								</AliceCarousel>
								<div className="absolute bottom-0 z-20 p-3 text-red-500 bg-red-200 rounded-full xl:p-4 right-28 md:right-16 xl:right-28 lg:bottom-6 lg:right-20">
									<TbUserPlus size={18} />
								</div>
							</div>
							<div className="w-5/12">
								<AliceCarousel activeIndex={2} infinite autoPlay animationDuration={4800} disableButtonsControls disableDotsControls animationType="fadeout">
									{banner3.map((banner, index) => (
										<div key={index} className="relative flex items-center w-full overflow-hidden shadow-none h-52 lg:h-64 xl:h-96 rounded-3xl ">
											<img src={banner?.imageUrl} alt={banner?.name} className="object-cover w-full h-52 lg:h-64 xl:h-96" onError={(e) => (e.target.src = bannerImg3)} />
										</div>
									))}
								</AliceCarousel>
								<Chip className="absolute right-0 z-20 px-2 py-4 xl:py-5 xl:bottom-40 xl:-right-20 md:-right-14 bottom-24 lg:bottom-32 bg-gray-50" startContent={<PiMapPin size={18} className="text-orangejuice" />} variant="faded" color="foreground">
									Top Places
								</Chip>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
