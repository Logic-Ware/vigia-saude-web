import Link from "next/link";
import Image from "next/image";
import logoVigiaSaude from "/public/logo_vigia_saude.png";
import "./barraNav.scss";
import { IoArrowBack } from 'react-icons/io5';


export default function BarraNav() {
	return (
		<>
			<nav>
				<Link href={"/"}>
					<IoArrowBack />
				</Link>
				<Link href="">
					<Image
						width={50}
						height={50}
						src={logoVigiaSaude}
						alt="Logo do Vigia Saúde"
					/>
				</Link>
			</nav>
		</>
	);
}
