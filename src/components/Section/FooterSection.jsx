import { Link, Image } from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { logoImage, logoName, year } from "@/helpers/const";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { HiOutlinePhone } from "react-icons/hi";
import { PiInstagramLogoFill, PiTiktokLogoFill } from "react-icons/pi";
import { FaSquareFacebook, FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import { useSelector } from "react-redux";

const HeroSection = () => {
	const token = getCookie("token");
	const user = useSelector((state) => state.userLogged.user);

	return (
		<footer className="w-[94%] md:w-[85%] xl:w-4/5 mx-auto pt-12 pb-5 justify-center rounded-t-[4rem] bg-blue-100">
			<div className="container max-w-6xl mx-auto lg:px-5">
				<div className="flex flex-wrap px-4 xl:px-0">
					<div className="w-full px-6 pb-10 md:px-0 md:w-1/4">
						<div className="flex flex-col items-center justify-center md:justify-start">
							<Image className="w-4/5 pb-5 mx-auto md:w-10/12 md:mx-0" src={logoImage} />
							<p className="text-sm text-center md:text-tiny md:text-left lg:text-sm xl:text-base">We always make our customer happy by providing as many choices as possible</p>
						</div>
					</div>
					<div className="w-full px-6 pb-10 md:px-0 md:pl-10 md:w-1/4 lg:pl-20 xl:pl-32">
						<div className="flex flex-col justify-center text-center md:text-left md:justify-end">
							<h3 className="w-full pb-5 text-sm font-bold uppercase xl:text-base text-bluenavy">Quick Links</h3>
							<ul className="space-y-2">
								<li>
									<Link href="/" className="text-sm hover:text-orangejuice md:text-tiny lg:text-sm xl:text-base">
										Home
									</Link>
								</li>
								<li>
									<Link href="/destination" className="text-sm hover:text-orangejuice md:text-tiny lg:text-sm xl:text-base">
										Destination
									</Link>
								</li>
								<li>
									<Link href="/special-deals" className="text-sm hover:text-orangejuice md:text-tiny lg:text-sm xl:text-base">
										Special Deals
									</Link>
								</li>
								{token && user?.role !== "admin" && (
									<li>
										<Link href="/transaction" className="text-sm hover:text-orangejuice md:text-tiny lg:text-sm xl:text-base">
											My Transaction
										</Link>
									</li>
								)}
							</ul>
						</div>
					</div>
					<div className="w-full px-6 pb-10 md:px-2 md:w-1/4 lg:pl-6 xl:pl-20">
						<div className="flex flex-col justify-center text-center md:text-left md:justify-end">
							<h3 className="w-full pb-5 text-sm font-bold uppercase xl:text-base text-bluenavy">Contact Us</h3>
							<ul className="space-y-2 text-sm md:text-tiny lg:text-sm xl:text-base">
								<li>
									<HiOutlineEnvelope className="inline size-4" /> dejourney@info.co.id
								</li>
								<li>
									<HiOutlinePhone className="inline size-4" /> 0821 - 1234 - 0000
								</li>
							</ul>
						</div>
					</div>
					<div className="w-full px-6 pb-10 md:px-2 md:w-1/4 lg:pl-8 xl:pl-24">
						<div className="flex flex-col justify-center text-center md:text-left md:justify-end">
							<h3 className="w-full pb-5 text-sm font-bold uppercase xl:text-base text-bluenavy">Connect with Us</h3>
							<div className="flex flex-row justify-center gap-4 md:justify-start flex-nowrap">
								<Link href="https://www.instagram.com/dejourneyvacations" target="_blank" className="hover:text-orangejuice">
									<PiInstagramLogoFill className="size-6 lg:size-8" />
								</Link>
								<Link href="https://www.facebook.com/dejourneyvacations" target="_blank" className="hover:text-orangejuice">
									<FaSquareFacebook className="size-5 lg:size-7" />
								</Link>
								<Link href="https://www.tiktok.com/dejourneyvacations" target="_blank" className="hover:text-orangejuice">
									<PiTiktokLogoFill className="size-5 lg:size-7" />
								</Link>
								<Link href="https://www.x.com/dejourneyvacations" target="_blank" className="hover:text-orangejuice">
									<FaXTwitter className="size-5 lg:size-7" />
								</Link>
							</div>
						</div>
					</div>
				</div>
				<hr className="w-4/5 md:w-[96%] xl:w-full h-4 mx-auto border-bluenavy" />
				<div className="flex flex-col items-center justify-between text-center md:flex-row md:px-3 xl:px-0">
					<p className="text-sm text-center lg:text-left">{`© ${year} ${logoName}. All Right Reserved `}</p>
					<p className="text-sm text-center lg:text-left">
						Developed By
						<Link href="https://github.com/DeLuthpi" size="sm" className="text-sm font-medium hover:text-orangejuice dark:text-white" target="_blank">
							&nbsp;
							<IoLogoGithub />
							&nbsp;DeLuthpi
						</Link>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default HeroSection;
