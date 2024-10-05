import localFont from "next/font/local";
import { TbLayoutDashboard, TbRosetteDiscount, TbCategory2, TbMap2, TbWallet, TbInvoice, TbUser, TbUsers } from "react-icons/tb";
import { CgImage } from "react-icons/cg";
import { HiHome } from "react-icons/hi2";

const logoName = "De Journey Vacations";
const logoadm1 = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/logo%201.png?alt=media&token=9ce48b00-2241-47e5-a52c-849557b6fd17";
const logoadm2 = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/logo%202.png?alt=media&token=eea76dcd-a818-4288-9ae2-20da8d8e02b6";
const logoImage = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/logo.png?alt=media&token=a8a91d0c-29da-450d-b7cd-1d17d5da8964";
const registerImg = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/register-image.png?alt=media&token=894d6c12-a1a8-4ad2-9a86-d89c2c209627";
const loginImg = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/login-image.png?alt=media&token=b6e720e8-79f0-454e-ab6b-006e52e8060d";
const patternLines = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/contour-line.png?alt=media&token=ff596a6f-717a-4897-b032-7263cf95e6e9";
const noImage = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/no-image.jpg?alt=media&token=fdac554f-3bbf-467b-a94a-545cfd8c5c9b";
const addImage = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/add-photo.jpg?alt=media&token=8442876c-941e-4cf8-9f28-6f0460a858c0";
const bannerImg1 = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/Rectangle%2013.png?alt=media&token=71b3060b-a956-43ee-8bca-7559174d86aa";
const bannerImg2 = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/Rectangle%2014.png?alt=media&token=40e551e8-807c-4d43-ac1f-44cc37a16814";
const bannerImg3 = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/Frame%2017.png?alt=media&token=6d2aaac6-2ac7-45a5-8ee5-cb182692edaa";
const heroBgMap = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/image%207.png?alt=media&token=4c7e78f9-009d-4c94-a068-9872489e01a8";
const brand1 = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/brand1.png?alt=media&token=c997d9af-1a9f-4b18-9128-76b696540dbb";
const brand2 = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/brand2.png?alt=media&token=c4ee510a-6c7c-435e-b6c8-e9c9eb04d552";
const brand3 = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/brand3.png?alt=media&token=2a9a23e4-7115-4a9e-a689-88e323fbec74";
const brand4 = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/brand4.png?alt=media&token=885fd3f6-637e-4ea4-aa49-781dd25da7b2";
const brand5 = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/brand5.png?alt=media&token=7dda04a1-5a77-4cb3-86ed-e66d5a013616";
const brand6 = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/brand6.png?alt=media&token=379756c0-6669-489f-aa56-25f90a42904e";

const year = new Date().getFullYear();

const geistSans = localFont({
	src: "../pages/fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

const geistMono = localFont({
	src: "../pages/fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

const listMenu = [
	{
		link: "/",
		name: "Home",
		text: "home",
		icon: <HiHome className="flex-shrink-0 text-xl pointer-events-none" />,
	},
	{
		link: "/destination",
		name: "Destination",
		text: "destination",
		icon: <TbMap2 className="flex-shrink-0 text-xl pointer-events-none" />,
	},
	{
		link: "/special-deals",
		name: "Special Deals",
		text: "special_deals",
		icon: <TbRosetteDiscount className="flex-shrink-0 text-xl pointer-events-none" />,
	},
];

const dashboardMenu = [
	{
		path: "/dashboard",
		name: "Dashboard",
		text: "dashboard",
		icon: <TbLayoutDashboard className="size-6" />,
	},
	{
		path: "/dashboard/banner",
		name: "Banner",
		text: "banner",
		icon: <CgImage className="size-6" />,
	},
	{
		path: "/dashboard/category",
		name: "Category",
		text: "category",
		icon: <TbCategory2 className="size-6" />,
	},
	{
		path: "/dashboard/destination",
		name: "Destination",
		text: "destination",
		icon: <TbMap2 className="size-6" />,
	},
	{
		path: "/dashboard/payment-method",
		name: "Payment Method",
		text: "payment-method",
		icon: <TbWallet className="size-6" />,
	},
	{
		path: "/dashboard/profile",
		name: "Profile Information",
		text: "profile",
		icon: <TbUser className="size-6" />,
	},
	{
		path: "/dashboard/special-deals",
		name: "Special Deals",
		text: "special-deals",
		icon: <TbRosetteDiscount className="size-6" />,
	},
	{
		path: "/dashboard/transaction",
		name: "Transaction",
		text: "transaction",
		icon: <TbInvoice className="size-6" />,
	},
	{
		path: "/dashboard/user-list",
		name: "User List",
		text: "user-list",
		icon: <TbUsers className="size-6" />,
	},
];

const brandLogo = [brand1, brand2, brand3, brand4, brand5, brand6, brand1, brand2, brand3, brand4, brand5, brand6];

export { geistSans, geistMono, listMenu, logoName, logoImage, registerImg, loginImg, patternLines, year, dashboardMenu, logoadm1, logoadm2, noImage, addImage, bannerImg1, bannerImg2, bannerImg3, heroBgMap, brandLogo };
