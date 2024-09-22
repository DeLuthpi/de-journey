import localFont from "next/font/local";

const logoName = "De Journey Vacations";
const logoImage = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/logo.png?alt=media&token=a8a91d0c-29da-450d-b7cd-1d17d5da8964";
const registerImg = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/register-image.png?alt=media&token=894d6c12-a1a8-4ad2-9a86-d89c2c209627";
const loginImg = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/login-image.png?alt=media&token=b6e720e8-79f0-454e-ab6b-006e52e8060d";
const patternLines = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/contour-line.png?alt=media&token=ff596a6f-717a-4897-b032-7263cf95e6e9";
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

export { geistSans, geistMono, listMenu, logoName, logoImage, registerImg, loginImg, patternLines, year, apiUrl, apiKey };
