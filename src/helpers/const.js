import localFont from "next/font/local";
import { TbLayoutDashboard, TbRosetteDiscount, TbCategory2, TbMap2, TbWallet, TbInvoice, TbUser, TbUsers } from "react-icons/tb";
import { CgImage } from "react-icons/cg";

const logoName = "De Journey Vacations";
const logoadm1 = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/logo%201.png?alt=media&token=9ce48b00-2241-47e5-a52c-849557b6fd17";
const logoadm2 = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/logo%202.png?alt=media&token=eea76dcd-a818-4288-9ae2-20da8d8e02b6";
const logoImage = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/logo.png?alt=media&token=a8a91d0c-29da-450d-b7cd-1d17d5da8964";
const registerImg = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/register-image.png?alt=media&token=894d6c12-a1a8-4ad2-9a86-d89c2c209627";
const loginImg = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/login-image.png?alt=media&token=b6e720e8-79f0-454e-ab6b-006e52e8060d";
const patternLines = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/contour-line.png?alt=media&token=ff596a6f-717a-4897-b032-7263cf95e6e9";
const noImage = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/no-image.jpg?alt=media&token=fdac554f-3bbf-467b-a94a-545cfd8c5c9b";
const addImage = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/add-photo.jpg?alt=media&token=8442876c-941e-4cf8-9f28-6f0460a858c0";

const year = new Date().getFullYear();
const apiUrl = "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/";
const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

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
	},
	{
		link: "/destination",
		name: "Destination",
		text: "destination",
	},
	{
		link: "/special-deals",
		name: "Special Deals",
		text: "special_deals",
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
		path: "/dashboard/user-ist",
		name: "User List",
		text: "user-ist",
		icon: <TbUsers className="size-6" />,
	},
];

export { geistSans, geistMono, listMenu, logoName, logoImage, registerImg, loginImg, patternLines, year, apiUrl, apiKey, dashboardMenu, logoadm1, logoadm2, noImage, addImage };
