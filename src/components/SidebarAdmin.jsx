import { dashboardMenu, logoadm1, logoadm2 } from "@/helpers/const";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LiaGlobeAmericasSolid } from "react-icons/lia";
import { IoClose } from "react-icons/io5";
import { sidebarExpand } from "@/helpers/handleSidebar";

const SidebarAdmin = () => {
	const pathname = usePathname();

	return (
		<aside mini="false" className="fixed inset-y-0 left-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto transition-all duration-500 ease-in-out -translate-x-full bg-white border-0 shadow-none xl:ml-4 dark:bg-gray-950 z-[1030] rounded-2xl xl:translate-x-0 max-w-64" id="sidebar-main">
			<div className="h-18">
				<button onClick={sidebarExpand} className="absolute top-0 right-0 p-3 opacity-50 cursor-pointer text-slate-400 dark:text-white sm:hidden" aria-hidden="true" sidebar-close="true">
					<IoClose className="size-6" />
				</button>
				<Link className="block px-8 pt-4 pb-2 m-0 text-sm whitespace-nowrap text-slate-700 dark:text-white" href="/dashboard">
					<img src={logoadm1} className="inline h-full max-w-full mr-4 transition-all duration-500 max-h-10 dark:invert" width={32} alt="logo 1" />
					<img src={logoadm2} className="inline h-full max-w-full pt-2 transition-all duration-500 max-h-10 dark:invert" alt="logo 2" logo-collapse="true" />
				</Link>
			</div>
			<hr className="h-px mt-1 mb-4 bg-transparent border-0 border-t-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />
			<div className="items-center block w-full h-auto grow basis-full">
				<ul className="flex flex-col pl-0 mb-0 list-none">
					{dashboardMenu?.map((menu) => (
						<li className="mt-0.5 w-full" key={menu?.text}>
							<Link href={menu?.path} className={`sidenav-menu ${pathname === menu?.path ? "active" : ""} text-sm my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 py-2 transition-all duration-500 shadow-none`}>
								<div className="shadow-sm sidenav-icon">{menu?.icon}</div>
								<span className="ml-1 font-normal duration-500 opacity-100 pointer-events-none sidenav-text text-bluenavy">{menu?.name}</span>
							</Link>
						</li>
					))}
					<hr className="h-px mt-1 bg-transparent border-0 border-t-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />
					<li className="mt-0.5 w-full">
						<Link href="/" className="flex items-center px-4 py-2 mx-4 my-0 text-sm transition-all duration-500 rounded-lg shadow-none sidenav-menu whitespace-nowrap">
							<div className="shadow-sm sidenav-icon">
								<LiaGlobeAmericasSolid className="size-6" />
							</div>
							<span className="ml-1 font-normal duration-500 opacity-100 pointer-events-none sidenav-text text-bluenavy">Page Preview</span>
						</Link>
					</li>
				</ul>
			</div>
		</aside>
	);
};

export default SidebarAdmin;
