import { Inter } from "next/font/google";
import "../styles/App.scss";
import BarraNav from "@/components/BarraNav/barraNav";
import Rodape from "@/components/Rodape/rodape";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<BarraNav />
				{children}
				<Rodape />
			</body>
		</html>
	);
}
