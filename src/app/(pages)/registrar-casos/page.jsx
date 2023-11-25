import './RegistrarCasos.scss'

export default function RegistrarCasos() {
	return (
		<>
			<main>
				<section>
					<h1>Proposta desta página</h1>
					<p>
						Segundo nossa ideia de projeto, que infelizmente não
						conseguimos implementar completamente em tempo hábil, esta
						seria a página onde médicos e administradores/sistemas
						automatizados de hospitais iriam dar entrada em novos de
						doenças (ex.: Tuberculose).
					</p>
					<p>
						Dessa forma, aqui seria uma área acessível apenas para
						usuários logados, sendo que cada tipo de usuário (médico(a) ou
						estabelecimento de saúde) seria capaz de registrar os casos de
						maneira diferente.
					</p>
					<p>
						Médicos poderiam registrar casos individuais, informando
						Doença, Data do Diagnóstico e UF.
					</p>
					<p>
						Já estabelecimentos, poderiam enviar múltiplos casos de uma
						vez, informando os mesmos parâmetros, mas através de
						planilhas, ou outros tipos de arquivos adequados, que seriam
						capturadas no front-end, interpretadas no backend e os dados
						enviados ao nosso banco de dados que guarda e contabiliza os casos.
					</p>

                    <p>
                        Essa abordagem exigiria, ainda, que houvesse conexão entre nosso banco de dados e nosso modelo de treinamento para que, a cada nova entrada de um caso de uma doença, o modelo pudesse ser adaptado àquela nova amostra, recalculando as taxas de incidência consideradas acima ou abaixo do normal.
                    </p>
				</section>
			</main>
		</>
	);
}
