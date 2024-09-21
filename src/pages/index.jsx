import NavbarComponent from "@/components/NavbarComponent";
import { geistSans, geistMono } from "@/helpers/const";

const HomePage = () => {
	return (
		<div className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-[family-name:var(--font-geist-sans)]`}>
			<main className="flex flex-col items-center row-start-2 sm:items-start">
				<NavbarComponent />
			</main>
		</div>
	);
};

export default HomePage;
