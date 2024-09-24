import { dashboardMenu, logoadm1, logoadm2 } from "@/helpers/const";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LiaGlobeAmericasSolid } from "react-icons/lia";

const SidebarAdmin = () => {
	const pathname = usePathname();

	return (
		<aside className="fixed inset-y-0 left-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto transition-all duration-200 -translate-x-full bg-white border-0 shadow-lg dark:bg-gray-950 ease-soft-in-out z-990 dark: xl:ml-4 rounded-2xl xl:translate-x-0 ps ps--active-y max-w-64 xl:bg-white xl:shadow-soft-xl" id="sidenav-main">
			<div className="h-18">
				<i className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 dark:text-white xl:hidden" aria-hidden="true" sidenav-close-btn=""></i>
				<Link className="block pt-4 pb-2 m-0 text-sm px-7 whitespace-nowrap text-slate-700 dark:text-white" href="/dashboard">
					<img src={logoadm1} className="inline-block h-full max-w-full mr-4 transition-all duration-200 ease-soft-in-out max-h-10 dark:invert" alt="logo 1" />
					<img src={logoadm2} className="inline-block h-full max-w-full pt-2 transition-all duration-200 ease-soft-in-out max-h-10 dark:invert" alt="logo 2" />
				</Link>
			</div>
			<hr className="h-px mt-1 mb-4 bg-transparent border-0 border-t-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />
			<div className="items-center block w-full h-auto grow basis-full" id="sidenav-collapse-main">
				<ul className="flex flex-col pl-0 mb-0 list-none">
					{dashboardMenu?.map((menu) => (
						<li className="mt-0.5 w-full" key={menu?.text}>
							<Link href={menu?.path} className={`${pathname === menu?.path ? "bg-[#023047] font-normal" : "font-normal"} sidenav-menu ease-soft-in-out text-sm py-2.7 xl:shadow-soft-xl my-0 mx-4 flex items-center whitespace-nowrap rounded-lg p-2 transition-all duration-300 dark:text-white dark:opacity-80 shadow-none`}>
								<div className={`${pathname === menu?.path ? "text-[#023047] bg-gradient-to-tl from-primary to-[#8ECAE6]" : "text-[#8ECAE6] bg-[#023047]"} sidenav-icon flex items-center justify-center w-8 h-8 p-0 mr-2 text-center bg-center rounded-lg fill-current stroke-none shadow-soft-sm`}>{menu?.icon}</div>
								<span className={`${pathname === menu?.path ? "text-white" : "text-[#023047]"} sidenav-text ml-1 text-white duration-300 opacity-100 pointer-events-none ease-soft`}>{menu?.name}</span>
							</Link>
						</li>
					))}
					<hr className="h-px mt-1 bg-transparent border-0 border-t-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />
					<li className="mt-0.5 w-full">
						<Link href="/" className="ease-soft-in-out text-sm py-2.7 xl:shadow-soft-xl my-0 mx-4 flex items-center whitespace-nowrap rounded-lg p-2 font-normal transition-all dark:text-white dark:opacity-80 shadow-none">
							<div className="flex items-center justify-center w-8 h-8 p-0 mr-2 text-center text-[#8ECAE6] bg-[#023047] bg-center rounded-lg fill-current stroke-none shadow-soft-sm">
								<LiaGlobeAmericasSolid className="w-5 h-5" />
							</div>
							<span className="ml-1 text-[#023047] duration-300 opacity-100 pointer-events-none ease-soft">Page Preview</span>
						</Link>
					</li>
				</ul>
			</div>
		</aside>
	);
};

export default SidebarAdmin;
