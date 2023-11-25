import "./botaoPadrao.scss";

export default function BotaoPadrao({ tipo, texto, acao }) {
	return <button type={tipo} onClick={acao}>{texto}</button>;
}
