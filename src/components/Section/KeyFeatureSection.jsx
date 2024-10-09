import { Image } from "@nextui-org/react";
import { keyImage1, keyImage2, keyImage3, keyImage4 } from "@/helpers/const";
import { RiServiceLine } from "react-icons/ri";
import { TbCalendarCheck, TbRosetteDiscount } from "react-icons/tb";

const KeyFeatureSection = () => {
	return (
		<section className="w-[94%] md:w-4/5 mx-auto py-14 justify-center">
			<div className="container items-center max-w-6xl mx-auto xl:px-5">
				<div className="flex flex-wrap items-center sm:-mx-3">
					<div className="w-full px-6 pb-10 md:px-0 md:w-1/2">
						<div className="w-full pb-4">
							<p className="pb-2 mx-auto text-base font-medium text-center uppercase text-bluesky md:text-tiny md:text-left sm:max-w-md lg:text-sm xl:text-lg md:max-w-3xl">Key Features</p>
							<h1 className="text-2xl min-[425px]:text-3xl pb-4 font-extrabold !leading-snug tracking-tight text-center text-bluenavy md:text-left md:text-2xl lg:text-3xl xl:text-4xl">
								<span className="inline capitalize md:text-wrap">We offer best service</span>
							</h1>
							<p className="mx-auto text-sm text-center text-bluenavy md:text-left sm:max-w-md lg:text-xl md:max-w-3xl">Let us guide you to your dream destination with expertise and care. Our commitment is to assist you discovering the perfect.</p>
						</div>
						<div className="items-center w-full space-y-5">
							<div className="flex flex-col items-center gap-0 xl:gap-4 flex-nowrap">
								<div className="w-full">
									<div className="flex flex-row items-center gap-3 py-4 md:py-2 lg:py-4">
										<div className="p-3 rounded-lg bg-[#CC3E00]">
											<RiServiceLine className="text-white" size={28} />
										</div>
										<div className="flex flex-col justify-left">
											<h3 className="text-base font-bold capitalize xl:text-xl text-bluenavy">We offer best service</h3>
											<p className="text-tiny xl:text-base">Explore the World with Our Premier Travel Services</p>
										</div>
									</div>
								</div>
								<div className="w-full">
									<div className="flex flex-row items-center gap-3 py-4 md:py-2 lg:py-4">
										<div className="p-3 rounded-lg bg-bluenavy">
											<TbCalendarCheck className="text-white" size={28} />
										</div>
										<div className="flex flex-col justify-left">
											<h3 className="text-base font-bold capitalize xl:text-xl text-bluenavy">Schedule your trip</h3>
											<p className="text-tiny xl:text-base">Craft Your Next Adventure in Minutes</p>
										</div>
									</div>
								</div>
								<div className="w-full">
									<div className="flex flex-row items-center gap-3 py-4 md:py-2 lg:py-4">
										<div className="p-3 rounded-lg bg-[#CC8100]">
											<TbRosetteDiscount className="text-white" size={28} />
										</div>
										<div className="flex flex-col justify-left">
											<h3 className="text-base font-bold capitalize xl:text-xl text-bluenavy">Get discounted coupon</h3>
											<p className="text-tiny xl:text-base">Score Amazing Deals with Our Travel Coupons</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full px-6 md:px-1 xl:-mt-14 md:w-1/2">
						<div className="flex items-center justify-center gap-1 min-[375px]:gap-2.5 xl:gap-2.5">
							<Image removeWrapper src={keyImage1} alt="key image 1" className="w-[55%] h-full xl:w-[283px] xl:h-[356px] rounded-[1.5rem] min-[375px]:rounded-[2rem] lg:rounded-[2.5rem] xl:rounded-[4rem] outline outline-[6px] min-[375px]:outline-[10px] xl:outline-[12px] outline-gray-50 outline-offset-0 z-20" />
							<Image removeWrapper src={keyImage2} alt="key image 2" className="w-[45%] h-full xl:w-[224px] xl:h-[224px] rounded-t-[1rem] rounded-br-[1rem] xl:rounded-t-[3.5rem] xl:rounded-br-[3.5rem] outline outline-[6px] xl:outline-[12px] outline-gray-50 outline-offset-0" />
						</div>
						<div className="flex items-end justify-center gap-2 min-[425px]:gap-3 xl:gap-3.5 -mt-6 min-[425px]:-mt-7 md:-mt-6 lg:-mt-9 xl:-mt-[3.5rem]">
							<Image removeWrapper src={keyImage3} alt="key image 1" className="w-[35%] h-[78px] min-[375px]:h-[100px] min-[425px]:h-[112px] md:h-[100px] lg:h-[130px] xl:w-[171px] xl:h-[135px] rounded-b-[1rem] rounded-tl-[1rem] lg:rounded-b-[2rem] lg:rounded-tl-[2rem] xl:rounded-b-[3rem] xl:rounded-tl-[3rem] outline outline-[6px] xl:outline-[12px] outline-gray-50 outline-offset-0" />
							<Image removeWrapper src={keyImage4} alt="key image 2" className="w-[65%] h-full xl:w-[336px] xl:h-[204px] rounded-[1rem] xl:rounded-[3.5rem] outline outline-[6px] xl:outline-[12px] outline-gray-50 outline-offset-0" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default KeyFeatureSection;
