import NavbarAdmin from "@/components/NavbarAdmin";
import { geistSans, geistMono, year } from "@/helpers/const";

const DashboardPage = () => {
	return (
		<div className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-[family-name:var(--font-geist-sans)]`}>
			<main className="relative flex flex-col flex-wrap">
				<NavbarAdmin />
			</main>
		</div>
	);
};

export default DashboardPage;
