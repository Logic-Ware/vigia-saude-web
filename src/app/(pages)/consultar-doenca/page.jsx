"use client";

import { useState } from "react";
import "./ConsultarDoenca.scss";
import BotaoPadrao from "@/components/BotaoPadrao/botaoPadrao";

export default function ConsultarDoenca() {
	const [result, setResult] = useState(null);
	const [taxaIncidencia, setTaxaIncidencia] = useState("");
	const [estado, setEstado] = useState("selecione");
	const [mediaDinamica, setMediaDinamica] = useState(null);
	const [mostrarMensagem, setMostrarMensagem] = useState(false);

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`http://127.0.0.1:5000/media-dinamica-dados`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.ok) {
				const dadosMedia = await res.json();
				setMediaDinamica(dadosMedia.media);
			} else {
				console.error(
					`Erro na solicitação da média dinâmica: ${res.status}`
				);
			}
		} catch (err) {
			console.error("Erro ao obter a média dinâmica:", err);
		}

		try {
			const res = await fetch(
				`http://127.0.0.1:5000/prever?tx_incd=${taxaIncidencia}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (res.ok) {
				const data = await res.json();
				setResult(data.previsao);
				setMostrarMensagem(true);
			} else {
				console.error(`Erro na solicitação: ${res.status}`);
			}
		} catch (err) {
			console.error(
				"Erro na verificação da situação da doença, provavelmente o servidor não está rodando"
			);
			console.error(
				"Acesse: https://github.com/Logic-Ware/flask-ai-vigia-saude e siga as instruções"
			);
		}
	};

	const handleTaxaIncidenciaChange = (e) => {
		setMostrarMensagem(false);
		setTaxaIncidencia(e.target.value);
	};

    const handleEstadoChange = (e) => {
        setEstado(e.target.value)
    }

	return (
		<>
			<main>
				<form action="">
					<label htmlFor="uf">Selecione a UF</label>
					<select name="uf" id="uf" value={estado} onChange={handleEstadoChange}>
                        <option value="selecione" disabled>Escolha uma opção</option>
						<option value="Acre">AC - Acre</option>
						<option value="Alagoas">AL - Alagoas</option>
						<option value="Amazonas">AM - Amazonas</option>
						<option value="Amapá">AP - Amapá</option>
						<option value="Bahia">BA - Bahia</option>
						<option value="Ceará">CE - Ceará</option>
						<option value="Distrito Federal">DF - Distrito Federal</option>
						<option value="Espírito Santo">ES - Espírito Santo</option>
						<option value="Goiás">GO - Goiás</option>
						<option value="Maranhão">MA - Maranhão</option>
						<option value="Minas Gerais">MG - Minas Gerais</option>
						<option value="Mato Grosso do Sul">MS - Mato Grosso do Sul</option>
						<option value="Mato Grosso">MT - Mato Grosso</option>
						<option value="Pará">PA - Pará</option>
						<option value="Paraíba">PB - Paraíba</option>
						<option value="Pernambuco">PE - Pernambuco</option>
						<option value="Piauí">PI - Piauí</option>
						<option value="Paraná">PR - Paraná</option>
						<option value="Rio de Janeiro">RJ - Rio de Janeiro</option>
						<option value="Rio Grande do Norte">RN - Rio Grande do Norte</option>
						<option value="Rondônia">RO - Rondônia</option>
						<option value="Roraima">RR - Roraima</option>
						<option value="Rio Grande do Sul">RS - Rio Grande do Sul</option>
						<option value="Santa Catarina">SC - Santa Catarina</option>
						<option value="Sergipe">SE - Sergipe</option>
						<option value="São Paulo">SP - São Paulo</option>
						<option value="Tocantins">TO - Tocantins</option>
					</select>
					<label htmlFor="taxa_incidencia">
						Insira a Taxa de Incidência
					</label>
					<input
						type="number"
						name="taxa_incidencia"
						id="taxa_incidencia"
						value={taxaIncidencia}
						onChange={handleTaxaIncidenciaChange}
					/>
				</form>

				<BotaoPadrao
					tipo="submit"
					acao={onSubmit}
					texto="Enviar"
				></BotaoPadrao>

				{/* Mostra o resultado se existir */}
				{result !== null && mostrarMensagem && (
					<>
						{/* Lógica de exibição condicional com base no resultado e na taxa de incidência */}
						{result == -1 && Number(taxaIncidencia) > mediaDinamica ? (
							<>
                            <p>Alerta: A taxa de incidência de Tuberculose para {estado} está acima dos níveis considerados normais para essa doença!</p>
                            <p>É altamente recomendável que as autoridades responsáveis tenham ação ativa na prevenção e tratamento.</p>
                            </>
						) : (
							<p>Situação Controlada: A taxa de incidência para {estado} está em níveis controlados. As autoridades devem ser manter vigilantes, mas sem tanta urgência de ações.</p>
						)}
					</>
				)}
			</main>
		</>
	);
}