import { useState, useEffect } from "react";
import apiGetData from "@/pages/api/apiGetData";
import { planeBlue, planeOrange } from "@/helpers/const";

const ServiceSection = () => {
	const { getData } = apiGetData();
	const [destinations, setDestinations] = useState([]);

	useEffect(() => {
		getData("activities", (res) => setDestinations(res?.data.data.length));
	}, []);

	return (
		<section className="w-[94%] md:w-4/5 mx-auto py-5 pb-10 xl:py-18 justify-center">
			<div className="container relative items-center max-w-6xl mx-auto xl:px-5">
				<img src={planeBlue} className="absolute md:hidden z-50 hover:scale-105 duration-500 max-[320px]:top-[21rem] max-[375px]:top-[19.5rem] top-[22rem] left-32 max-[375px]:w-[80px] max-[375px]:h-[120px] w-[130px] h-[170px]" alt="plane vector" srcSet="" />
				<img src={planeOrange} className="absolute md:hidden z-50 hover:scale-105 duration-500 max-[320px]:top-[37rem] max-[375px]:top-[35rem] top-[40rem] max-[320px]:left-24 max-[375px]:left-32 left-32 max-[375px]:w-[80px] max-[375px]:h-[120px] w-[130px] h-[180px] -rotate-6" alt="plane vector" srcSet="" />
				<div className="flex flex-wrap items-center gap-6 md:gap-0 sm:-mx-3">
					<div className="w-full px-6 md:px-0 md:space-y-4 xl:px-0 md:w-1/4">
						<p className="mx-auto text-base font-medium text-center uppercase text-bluesky md:text-tiny md:text-left sm:max-w-md lg:text-sm xl:text-lg md:max-w-3xl">Services</p>
						<h1 className="text-2xl min-[425px]:text-3xl font-extrabold !leading-snug tracking-tight text-center text-bluenavy md:text-left md:text-2xl lg:text-3xl xl:text-4xl">
							<span className="inline md:text-wrap">Tailored Journeys for Comprehensive&nbsp;</span>
							<span className="inline md:block text-primary">Travel Experience&nbsp;&#128747;</span>
						</h1>
					</div>
					<div className="flex justify-end w-full duration-500 md:w-1/4 hover:scale-105 hover:mt-10">
						<div className="flex flex-col items-center justify-center w-3/5 md:w-4/5 gap-8 md:gap-4 xl:gap-8 md:py-4 xl:py-14 px-6 py-6 shadow-2xl min-[425px]:py-12 rounded-3xl bg-gray-50">
							<div className="px-0 py-2 rounded-full w-fit outline outline-2 outline-offset-2 outline-primary bg-blueocean">
								<span className="text-5xl">&#127759;</span>
							</div>
							<div className="flex flex-col items-center justify-center">
								<h3 className="font-bold text-orangejuice md:text-center lg:text-xl">Lot Of Choises</h3>
								<p className="text-sm text-center text-bluenavy md:text-tiny sm:max-w-md lg:text-sm xl:text-base md:max-w-3xl">Total {destinations}+ destinations that we work with.</p>
							</div>
						</div>
					</div>
					<div className="flex justify-start w-full duration-500 md:justify-end md:w-1/4 hover:scale-105 md:mt-10 hover:mt-0 hover:mb-10">
						<div className="flex flex-col items-center justify-center w-3/5 md:w-4/5 gap-8 md:gap-4 xl:gap-8 md:py-4 xl:py-14 px-6 py-6 shadow-2xl min-[425px]:py-12 rounded-3xl bg-gray-50">
							<div className="px-2.5 py-3 rounded-full w-fit outline outline-2 outline-offset-2 outline-primary bg-blueocean">
								<span className="text-5xl">&#129523;</span>
							</div>
							<div className="flex flex-col items-center justify-center">
								<h3 className="font-bold text-orangejuice md:text-center lg:text-xl">Best Tour Guide</h3>
								<p className="text-sm text-center text-bluenavy md:text-tiny sm:max-w-md lg:text-sm xl:text-base md:max-w-3xl">Your tour guide with 15+ years of experience.</p>
							</div>
						</div>
					</div>
					<div className="flex justify-end w-full duration-500 md:w-1/4 hover:scale-105 hover:mt-10">
						<div className="flex flex-col items-center justify-center w-3/5 md:w-4/5 gap-8 md:gap-4 xl:gap-8 md:py-4 xl:py-12 px-6 py-6 shadow-2xl min-[425px]:py-12 rounded-3xl bg-gray-50">
							<div className="px-0 py-2 rounded-full w-fit outline outline-2 outline-offset-2 outline-primary bg-blueocean">
								<span className="text-5xl">&#127915;</span>
							</div>
							<div className="flex flex-col items-center justify-center">
								<h3 className="font-bold text-orangejuice md:text-center lg:text-xl">Easy Booking</h3>
								<p className="text-sm text-center text-bluenavy md:text-tiny sm:max-w-md lg:text-sm xl:text-base md:max-w-3xl">With an easy and fast ticket purchase process.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ServiceSection;
