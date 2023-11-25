import Image from "next/image";
import "./rodape.scss";
import logoFiap from "/public/logo_fiap.png";
import logoNotreDame from "/public/logo_Notre_Dame.png";
import logoHapvida from "/public/logo_Hapvida.png";

export default function Rodape() {
    return(
        <>
        <footer class="rodape">
            <div class="nomes-rodape">
                <p>Adrian Satiro Sivilha - rm97784</p>
                <p>Jaci Teixeira Santos - rm99627</p>
                <p>Pedro Henrique Nobrega de Castro Paterno - rm99726</p>
                <p>Sabrina Faustino do Prado - rm99570</p>
            </div>

                <Image class="logo-rodape"
                    width={90}
                    height={50}
                    src={logoFiap}
                    alt="Logo da Fiap"
                />
                
                <Image class="logo-rodape"
                    width={90}
                    height={50}
                    src={logoNotreDame}
                    alt="Logo da NotreDame"
                />

                <Image class="logo-rodape"
                    width={90}
                    height={50}
                    src={logoHapvida}
                    alt="Logo da Hapvida"
                />


        </footer>
        </>
    )
}