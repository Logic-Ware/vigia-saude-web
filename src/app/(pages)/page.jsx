import Link from "next/link";

export default function Home() {
	return (
		<main>
			<Link href={"/cadastro"}>Cadastrar</Link>
			<Link href={"/login"}>Entrar</Link>
			<Link href={"/consultar-doenca"}>Consultar Doença</Link>
			<Link href={"/registrar-casos"}>Registrar Casos</Link>
		</main>
	);
}
