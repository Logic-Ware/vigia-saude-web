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
                width={100}
                height={100}
                src={logoVigiaSaude}
                alt="Logo do Vigia Saúde"
                />
            </Link>

            <ul class="lista-nav">
                <li class="links">
                    <Link href={'/consultar-doenca'}>Consultar Doença</Link>
                </li>
                <li class="links">
                    <Link href={'/contato'}>Contato</Link>
                </li>
                <li class="links">
                    <Link href={'/registrar-casos'}>Registrar Casos</Link>
                </li>
                <li class="links">
                    <Link href={'/cadastro'}>Cadastrar</Link>
                </li>
                <li class="links">
                    <Link href={'/login'}>Entrar</Link>
                </li>
                
            </ul>
        </nav>
        </>
    )
}
