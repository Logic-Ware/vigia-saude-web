'use client'
import Link from "next/link";
import Image from "next/image";
import logoVigiaSaude from "/public/logo_vigia_saude.png";
import "./barraNav.scss"
import { GiHamburgerMenu as HamburgerIcon } from 'react-icons/gi'
import { useEffect, useRef, useState } from 'react'

export default function BarraNav() {


        /**
     * Variável que guarda a referencia do div que contém os links
     * @type {React.MutableRefObject<HTMLDivElement>}
     */
    const linksDiv = useRef(null)

    /**
     * Variável que guarda a referencia do div que contém o hamburger
     * @type {React.MutableRefObject<HTMLDivElement>}
     */
    
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUser(localStorage.getItem('user'))
        }
    }, [])
    

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
            <div className="links">
              <Link href="/consultar-doenca">Consultar Doenças</Link>
              <Link href="/contato">Contato</Link>
              {!user ? (
                <Link href="/login">Entrar</Link>
              ) : (
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem('user');
                    setUser(null);
                  }}
                  href={'#'}
                >
                  Sair
                </Link>
              )}
            </div>
          </nav>
        </>
      );
}
