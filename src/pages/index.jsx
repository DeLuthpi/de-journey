import NavbarComponent from "@/components/NavbarComponent";
import { geistSans, geistMono, rectangle1, rectangle2, heroBgMap, rectangle3 } from "@/helpers/const";
import HeroSection from "@/components/Section/HeroSection";
import dynamic from "next/dynamic";
import ServiceSection from "@/components/Section/ServiceSection";
import CategorySection from "@/components/Section/CategorySection";
import DestinationSection from "@/components/Section/DestinationSection";
import OurExperienceSection from "@/components/Section/OurExperienceSection";
import KeyFeatureSection from "@/components/Section/KeyFeatureSection";

const HomePage = () => {
	const BrandSection = dynamic(() => import("@/components/Section/BrandSection"), { ssr: false });

	return (
		<div className={`${geistSans.variable} ${geistMono.variable} relative overflow-hidden min-h-screen font-[family-name:var(--font-geist-sans)]`}>
			<img className="absolute top-0 h-[200px] w-[100px] lg:h-[12%] lg:w-[12%] left-0" src={rectangle1} alt="rectangle 1" />
			<div className="absolute hidden md:block left-40 right-20 top-28">
				<img className="w-full" src={heroBgMap} alt="hero background" srcSet="" />
			</div>
			<img className="absolute right-0 h-[550px] w-[100px] lg:h-[40%] xl:h-[33%] lg:w-[14%] top-[30rem] lg:top-[26rem]" src={rectangle2} alt="rectangle 2" />
			<img className="absolute left-0 w-[95%] md:w-[48%] xl:w-[43%] h-[370px] top-[180rem] min-[375px]:top-[171rem] min-[425px]:top-[183rem] md:top-[125rem] lg:top-[137rem] lg:h-[420px] xl:top-[155rem] xl:h-[480px]" src={rectangle3} alt="rectangle 3" />
			<main className="flex flex-col items-center row-start-2 sm:items-start">
				<NavbarComponent />
				<HeroSection />
				<BrandSection />
				<ServiceSection />
				<CategorySection />
				<DestinationSection />
				<OurExperienceSection />
				<KeyFeatureSection />
			</main>
		</div>
	);
};

export default HomePage;
