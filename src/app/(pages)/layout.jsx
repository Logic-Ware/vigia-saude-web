import { Inter } from "next/font/google";
import "../styles/App.scss";
import BarraNav from "@/components/BarraNav/barraNav";
import Rodape from "@/components/Rodape/rodape";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Vigia Saúde",
};

export default function RootLayout({ children }) {
	return (
		<html lang="pt-br">
			<body className={inter.className}>
				<BarraNav />
				{children}
				<Rodape />
			</body>
		</html>
	);
}
