import { logoName, year } from "@/helpers/const";
import { Link } from "@nextui-org/react";
import { IoLogoGithub } from "react-icons/io5";

const Footer = () => {
	return (
		<footer className="pt-6">
			<div className="w-full mx-auto">
				<div className="flex flex-wrap justify-center text-sm leading-normal text-center align-middle md:flex-nowrap md:justify-start text-slate-500 lg:text-left">
					{`© ${year} ${logoName} - Developed by `}
					<Link href="https://github.com/DeLuthpi" size="sm" className="font-semibold text-slate-700 dark:text-white" target="_blank">
						&nbsp;
						<IoLogoGithub />
						&nbsp;DeLuthpi
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
