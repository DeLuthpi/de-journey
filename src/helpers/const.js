import localFont from "next/font/local";

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

export { geistSans, geistMono, listMenu };
