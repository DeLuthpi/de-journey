import "@/styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="description" content="De Journey Vacations" />
				<link rel="icon" type="image/svg+xml" href="/favicon.ico" />
				<title>De Journey Vacations</title>
				<meta http-equiv="x-ua-compatible" content="ie=edge" />
				<meta name="author" content="De Journey Vacations" />
				<meta name="keywords" content="De Journey Vacations" />
				<meta name="robots" content="INDEX,FOLLOW" />
				<meta name="theme-color" content="#ffffff" /> <link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
			</Head>
			<Toaster
				containerClassName="mt-20"
				position="top-right"
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
		</>
	);
}
