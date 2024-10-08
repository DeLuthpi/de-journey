import { useState, useEffect } from "react";
import apiGetData from "@/pages/api/apiGetData";
import { Card, CardFooter, Image } from "@nextui-org/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const CategorySection = () => {
	const { getData } = apiGetData();
	const [categories, setCategories] = useState([]);

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
		getData("categories", (res) => setCategories(res?.data.data));
	}, []);

	return (
		<section className="w-[94%] md:w-4/5 mx-auto py-5 pb-10 xl:py-20">
			<div className="container items-center max-w-6xl mx-auto xl:px-5">
				<div className="flex flex-col flex-wrap items-center gap-0 sm:-mx-3">
					<div className="w-full px-6 pb-6 md:pb-0 md:px-0 md:space-y-2 xl:px-0">
						<p className="text-base font-medium text-center uppercase text-bluesky md:text-tiny md:text-left sm:max-w-md lg:text-sm xl:text-lg md:max-w-3xl">Top Categories</p>
						<h1 className="text-2xl min-[425px]:text-3xl font-extrabold !leading-snug tracking-tight text-center text-bluenavy md:text-left md:text-2xl lg:text-3xl xl:text-4xl">Top Picks Unveiled</h1>
					</div>
					<div className="flex justify-between w-full gap-6 px-4 bg-transparent md:px-0">
						<AliceCarousel
							mouseTracking
							disableDotsControls
							items={categories?.map((category, index) => (
								<Card key={index} isFooterBlurred className="w-full md:w-[95%] h-[200px] z-50 min-[425px]:h-[220px] my-0 md:my-6 col-span-12 sm:col-span-7">
									<Image removeWrapper alt="category image" className="z-0 object-cover w-full h-full transition-all duration-500 ease-in-out hover:scale-125" src={category?.imageUrl} />
									<CardFooter className="absolute bottom-0 z-10 bg-black/40 border-t-1 border-default-600 dark:border-default-100">
										<div className="flex items-center flex-grow gap-2">
											<div className="flex flex-col">
												<h4 className="font-medium text-white text-large md:text-base">{category?.name}</h4>
											</div>
										</div>
									</CardFooter>
								</Card>
							))}
							controlsStrategy="responsive"
							responsive={responsive}
							infinite={false}
							swipeDelta
							keyboardNavigation={true}
							renderPrevButton={() => {
								return <FaAngleLeft className="absolute hover:bg-orangejuice hover:scale-110 transition-all duration-500 ease-in-out p-2 cursor-pointer rounded-full max-[425px]:left-2 md:right-16 size-8 outline outline-2 outline-offset-2 outline-primary bg-blueocean top-20 md:-top-10" />;
							}}
							renderNextButton={() => {
								return <FaAngleRight className="absolute p-2 transition-all duration-500 ease-in-out rounded-full cursor-pointer hover:bg-orangejuice hover:scale-110 right-2 md:right-4 size-8 outline outline-2 outline-offset-2 outline-primary bg-blueocean top-20 md:-top-10" />;
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CategorySection;
