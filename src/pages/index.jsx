import NavbarComponent from "@/components/NavbarComponent";
import { geistSans, geistMono, heroBgMap } from "@/helpers/const";
import HeroSection from "@/components/Section/HeroSection";
import dynamic from "next/dynamic";

const HomePage = () => {
	const BrandSection = dynamic(() => import("@/components/Section/BrandSection"), { ssr: false });

	return (
		<div className={`${geistSans.variable} ${geistMono.variable} relative overflow-hidden min-h-screen font-[family-name:var(--font-geist-sans)]`}>
			<div className="absolute top-0 rotate-45 bg-blue-100 xl:-top-6 -left-52 xl:-left-48 w-60 xl:w-72 xl:h-72 h-60 rounded-3xl"></div>
			<div className="absolute hidden md:block left-40 right-20 top-28">
				<img className="w-full" src={heroBgMap} alt="hero background" srcSet="" />
			</div>
			<div className="absolute -rotate-45 bg-blue-100 top-96 -right-52 w-60 h-60 xl:w-72 xl:h-72 xl:-right-48 xl:top-[42rem] rounded-3xl"></div>
			<main className="flex flex-col items-center row-start-2 sm:items-start">
				<NavbarComponent />
				<HeroSection />
				<BrandSection />
			</main>
		</div>
	);
};

export default HomePage;
