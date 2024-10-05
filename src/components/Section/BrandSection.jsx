"use client";

import { brandLogo } from "@/helpers/const";
import ScrollCarousel from "scroll-carousel-react";

const BrandSection = () => {
	return (
		<section className="w-[94%] md:w-4/5 mx-auto justify-center mb-10 md:mb-0 md:py-14">
			<div className="container items-center max-w-6xl px-3 mx-auto md:px-0 xl:px-3">
				<ScrollCarousel autoplay smartSpeed="true" margin={40} autoplaySpeed={8} speed={7}>
					<div className="flex items-center justify-between w-[1024px] md:w-[1640px] h-full flex-nowrap">
						{brandLogo?.map((brand, index) => (
							<div key={index} className="items-center w-14 h-14 md:w-20 md:h-20 my-slide">
								<img src={brand} alt="brand logo" width={86.6} height={100} className="object-cover w-full h-full" />
							</div>
						))}
					</div>
				</ScrollCarousel>
			</div>
		</section>
	);
};

export default BrandSection;
