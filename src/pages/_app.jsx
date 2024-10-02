import "@/styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { logoName } from "@/helpers/const";
import handleScroll from "@/helpers/handleNavbar";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
	const pathname = usePathname();

	useEffect(() => {
		handleScroll();
	}, []);

	return (
		<Provider store={store}>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="description" content={logoName} />
				<link rel="icon" type="image/svg+xml" href="/favicon.ico" />
				<title>{logoName}</title>
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				<meta name="author" content={logoName} />
				<meta name="keywords" content={logoName} />
				<meta name="robots" content="INDEX,FOLLOW" />
				<meta name="theme-color" content="#ffffff" /> <link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
			</Head>
			<Toaster
				containerClassName="mt-20"
				position={`mt-20 ${pathname === "/dashboard/*" ? "top-right" : "top-center"}`}
				toastOptions={{
					duration: 3000,
					success: {
						style: {
							background: "#10b981",
							color: "white",
						},
						iconTheme: {
							primary: "white",
							secondary: "#10b981",
						},
					},
					error: {
						style: {
							background: "#DF6951",
							color: "white",
						},
						iconTheme: {
							primary: "white",
							secondary: "#DF6951",
						},
					},
				}}
			/>
			<Component {...pageProps} />
		</Provider>
	);
}
