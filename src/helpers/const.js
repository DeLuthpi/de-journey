import localFont from "next/font/local";

const logoName = "De Journey Vacations";
const logoImage = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/logo.png?alt=media&token=a8a91d0c-29da-450d-b7cd-1d17d5da8964";
const loginImg1 = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/auth-illustration.png?alt=media&token=5e9d257c-13d1-4022-b3d9-2aca5ad7eb1d";
const loginImg2 = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/login-image.png?alt=media&token=b6e720e8-79f0-454e-ab6b-006e52e8060d";
const loginShape = "https://firebasestorage.googleapis.com/v0/b/de-journey-vacations.appspot.com/o/login-shape.png?alt=media&token=d26083c8-24f1-4a16-81ca-44bc806f71c5";
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

export { geistSans, geistMono, listMenu, logoName, logoImage, loginImg1, loginImg2, loginShape, year };
