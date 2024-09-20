import { Html, Head, Main, NextScript } from "next/document";
import { NextUIProvider } from "@nextui-org/react";

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="antialiased bg-gray-50">
				<NextUIProvider>
					<Main />
					<NextScript />
				</NextUIProvider>
			</body>
		</Html>
	);
}
