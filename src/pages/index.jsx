import localFont from "next/font/local";
import NavbarComponent from "@/components/NavbarComponent";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

const Home = () => {
	return (
		<div className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-[family-name:var(--font-geist-sans)]`}>
			<main className="flex flex-col items-center row-start-2 sm:items-start">
				<NavbarComponent />
			</main>
		</div>
	);
};

export default Home;
