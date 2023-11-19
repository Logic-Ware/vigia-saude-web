import "./botaoPadrao.scss";

export default function BotaoPadrao({ tipo, texto }) {
	return <button type={tipo}>{texto}</button>;
}
