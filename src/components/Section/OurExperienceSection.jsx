import { Chip, Image } from "@nextui-org/react";
import { tourisImg } from "@/helpers/const";
import { RiDiscountPercentFill } from "react-icons/ri";

const OurExperienceSection = () => {
	return (
		<section className="w-[94%] md:w-4/5 mx-auto py-16 justify-center">
			<div className="container items-center max-w-6xl mx-auto xl:px-5">
				<div className="flex flex-wrap items-center sm:-mx-3">
					<div className="relative w-full md:w-1/2">
						<Image src={tourisImg} alt="touris img" className="w-full h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px]" />
						<div className="absolute top-12 -right-4 xl:right-20 h-14 w-14 rounded-full bg-[#CC8100] opacity-40"></div>
						<div className="absolute top-6 left-10 lg:top-8 xl:top-12 lg:left-14 h-6 w-6 rounded-full bg-[#CC3E00] opacity-90"></div>
						<div className="absolute bottom-5 left-0 h-20 w-20 rounded-full bg-[#CC3E00] opacity-40"></div>
						<div className="absolute bottom-16 right-4 xl:right-28 h-10 w-10 rounded-full bg-[#CC3E00] opacity-90"></div>
						<Chip startContent={<RiDiscountPercentFill size={18} className="text-bluesky" />} size="sm" className="absolute right-0 z-10 xl:right-28 md:py-3 xl:py-4 xl:px-2 top-20" variant="faded" color="default">
							Discounted Price!
						</Chip>
					</div>
					<div className="w-full px-6 md:px-0 md:pl-10 md:w-1/2">
						<div className="w-full pb-8 md:pb-6">
							<p className="pb-2 mx-auto text-base font-medium text-center uppercase text-bluesky md:text-tiny md:text-left sm:max-w-md lg:text-sm xl:text-lg md:max-w-3xl">Our Experience</p>
							<h1 className="text-2xl min-[425px]:text-3xl pb-4 font-extrabold !leading-snug tracking-tight text-center text-bluenavy md:text-left md:text-2xl lg:text-3xl xl:text-4xl">
								<span className="inline capitalize md:text-wrap">With our experience we will serve you ✈️</span>
							</h1>
							<p className="mx-auto text-sm text-center text-bluenavy md:text-left sm:max-w-md lg:text-xl md:max-w-3xl">Since we first opened we have always prioritized the convenience of our users by providing low prices and with a easy process.</p>
						</div>
						<div className="items-center w-full space-y-5">
							<div className="flex flex-row items-center gap-5 flex-nowrap">
								<div className="w-[55%] rounded-tr-lg rounded-s-lg outline outline-2 outline-offset-1 outline-gray-400">
									<div className="flex flex-col items-center justify-center py-5 md:py-3 lg:py-5 xl:py-6">
										<h3 className="font-semibold lg:text-xl xl:text-2xl text-orangejuice">500+</h3>
										<p className="mx-auto text-sm text-center capitalize text-bluenavy md:text-left sm:max-w-md lg:text-xl md:max-w-3xl">Holiday Packages</p>
									</div>
								</div>
								<div className="w-[45%] rounded-tl-lg rounded-e-lg outline outline-2 outline-offset-1 outline-gray-400">
									<div className="flex flex-col items-center justify-center py-5 md:py-3 lg:py-5 xl:py-6">
										<h3 className="font-semibold lg:text-xl xl:text-2xl text-orangejuice">100+</h3>
										<p className="mx-auto text-sm text-center capitalize text-bluenavy md:text-left sm:max-w-md lg:text-xl md:max-w-3xl">Luxury Hotels</p>
									</div>
								</div>
							</div>
							<div className="flex flex-row items-center gap-5 flex-nowrap">
								<div className="w-[45%] rounded-br-lg rounded-s-lg outline outline-2 outline-offset-1 outline-gray-400">
									<div className="flex flex-col items-center justify-center py-5 md:py-3 lg:py-5 xl:py-6">
										<h3 className="font-semibold lg:text-xl xl:text-2xl text-orangejuice">5+</h3>
										<p className="mx-auto text-sm text-center capitalize text-bluenavy md:text-left sm:max-w-md lg:text-xl md:max-w-3xl">Premium Airlines</p>
									</div>
								</div>
								<div className="w-[55%] rounded-bl-lg rounded-e-lg outline outline-2 outline-offset-1 outline-gray-400">
									<div className="flex flex-col items-center justify-center py-5 md:py-3 lg:py-5 xl:py-6">
										<h3 className="font-semibold lg:text-xl xl:text-2xl text-orangejuice">20k+</h3>
										<p className="mx-auto text-sm text-center capitalize text-bluenavy md:text-left sm:max-w-md lg:text-xl md:max-w-3xl">Happy Customers</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default OurExperienceSection;
