import SidebarAdmin from "@/components/SidebarAdmin";
import NavbarAdmin from "@/components/NavbarAdmin";
import { geistSans, geistMono, year } from "@/helpers/const";

const DashboardPage = () => {
	return (
		<div className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-[family-name:var(--font-geist-sans)]`}>
			<SidebarAdmin />
			<main className="relative h-full max-h-screen transition-all duration-200 ease-soft-in-out xl:ml-[17rem] rounded-xl">
				<NavbarAdmin />
			</main>
		</div>
	);
};

export default DashboardPage;