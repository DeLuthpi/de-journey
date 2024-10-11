import NavbarComponent from "@/components/NavbarComponent";
import { geistSans, geistMono } from "@/helpers/const";
import MainTransaction from "@/components/MainTransaction";
import FooterSection from "@/components/Section/FooterSection";

const DestinationPage = () => {
	return (
		<div className={`${geistSans.variable} ${geistMono.variable} overflow-hidden min-h-screen font-[family-name:var(--font-geist-sans)]`}>
			<main className="flex flex-col items-center row-start-2 sm:items-start">
				<NavbarComponent />
				<MainTransaction />
				<FooterSection />
			</main>
		</div>
	);
};

export default DestinationPage;
