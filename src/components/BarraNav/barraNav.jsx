import Link from "next/link";
import Image from "next/image";
import logoVigiaSaude from "/public/logo_vigia_saude.png";
import "./barraNav.scss"

export default function BarraNav() {
    return (
        <>
        <nav>
            <Link href="">
                <Image
                width={50}
                height={50}
                src={logoVigiaSaude}
                alt="Logo do Vigia Saúde"
                />
            </Link>

            <ul class="lista-nav">
                <li>
                    <Link href={'/consultar-doenca'}>Consultar Doença</Link>
                </li>
                <li>
                    <Link href={'/contato'}>Contato</Link>
                </li>
                <li>
                    <Link href={'/registrar-casos'}>Registrar Casos</Link>
                </li>
                <li>
                    <Link href={'/cadastro'}>Cadastrar</Link>
                </li>
                <li>
                    <Link href={'/login'}>Entrar</Link>
                </li>
                
            </ul>
        </nav>
        </>
    )
}
