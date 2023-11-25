import Image from "next/image";
import Link from "next/link";
import "./page.scss";
import imagemAzul from "/public/imagem-azul.png";

export default function Home() {
  return <main>
    <div class="text">
      <p>
         O objetivo central do nosso projeto é implementar um sistema de monitoramento baseado em inteligência artificial para detectar padrões anormais de incidência de doenças. Essa abordagem possibilitaria uma resposta mais rápida a possíveis surtos, contribuindo significativamente para o controle de epidemias.
      </p> 
      <p>
         Idealmente, buscamos integrar uma API de coleta de dados aos sistemas de hospitais, tanto públicos quanto privados. Essa API receberia em tempo real a entrada de incidência de casos de doenças, registrando as informações em bancos de dados. Os dados coletados, a princípio, incluiriam a doença, o local (estado) e a idade do paciente.
      </p>
    </div>

      <Image class="imagem"
        width={500}
        height={500}
        src={imagemAzul}
        alt="Imagem-azul"
      />

  </main>;
}
