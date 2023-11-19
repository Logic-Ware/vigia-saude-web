import Link from "next/link";

export default function Home() {
  return <main>
    <Link href={'/cadastro'}>Cadastrar</Link>
    <Link href={'/login'}>Entrar</Link>
  </main>;
}
