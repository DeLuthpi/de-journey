import "@/styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>De Journey Vacations</title>
				<meta name="description" content="De Journey Vacations" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
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
