import { Html, Head, Main, NextScript } from "next/document";
import { NextUIProvider } from "@nextui-org/react";

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="m-0 font-sans text-base antialiased font-normal text-left leading-default dark:bg-[#141728] bg-gray-50 text-slate-500 dark:text-white/80">
				<NextUIProvider>
					<Main />
					<NextScript />
				</NextUIProvider>
			</body>
		</Html>
	);
}
