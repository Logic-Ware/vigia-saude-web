"use client";
import Link from "next/link";
import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";
import BotaoPadrao from "@/components/BotaoPadrao/botaoPadrao";
import "./Cadastro.scss";

export default function Cadastro() {
	const router = useRouter();
	const [error, setError] = useState(false);
	const [refused, setRefused] = useState(false);
	const [invalid, setInvalid] = useState(false);
	const [categoria, setCategoria] = useState("");

	const [tipos, setTipos] = useState([]);
	const [unidades, setUnidades] = useState([]);

	const [formValues, setFormValues] = useState({
		// Campos comuns a ambas categorias
		nome: "",
		email: "",
		telefone: "",
		senha: "",
		confirmarSenha: "",
		// Campos específicos de médicos
		especialidade: "",
		crm: "",
		unidade: "",
		// Campos específicos de estabelecimentos de saúde
		tipo: "",
		cnes: "",
		cep: "",
		estado: "",
		cidade: "",
		endereco: "",
	});

	const handleCategoriaChange = (evt) => {
		setCategoria(evt.target.value);
	};

	useEffect(() => {
		// Função para buscar os tipos da API
		const fetchTipos = async () => {
		  try {
			const response = await fetch('api/tipo');
			const data = await response.json();
			setTipos(data.tipos);
		  } catch (error) {
			console.error('Erro ao buscar tipos:', error);
		  }
		};

		const fetchUnidades = async () => {
			try {
			  const response = await fetch('api/unidades');
			  const data = await response.json();
			  setUnidades(data.unidades);
			} catch (error) {
			  console.error('Erro ao buscar unidades:', error);
			}
		};
		
		// Chamando a função de busca quando o componente monta
		fetchTipos();
		fetchUnidades();
	  }, []);

	const handleInputChange = async (event) => {
		const { name, value } = event.target;

		if ((name === "cep" || name === "telefone") && !/^\d*$/.test(value)) {
			return;
		}

		setFormValues({
			...formValues,
			[name]: value,
		});

		if (name === "cep" && value.length === 8) {
			try {
				const response = await fetch(
					`https://brasilapi.com.br/api/cep/v2/${value}`
				);
				if (response.ok) {
					const endereco = await response.json();

					setFormValues({
						...formValues,
						estado: endereco.state,
						cidade: endereco.city,
						endereco: endereco.street,
						cep: endereco.cep,
					});
				} else {
					alert("CEP não encontrado. Por favor, insira um CEP válido.");
				}
			} catch (error) {
				console.error("Erro ao consultar o CEP:", error.message);
				alert("Erro ao consultar o CEP. Tente novamente mais tarde.");
			}
		}
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();

		if (formValues.cep.length !== 8 && categoria === "estabelecimentoSaude") {
			alert(
				"O CEP digitado está incorreto, por favor verifique e tente novamente."
			);
		} else {
			if (categoria === "medico") {
				const unidadeObj = {
					id: parseInt(formValues.unidade, 10),
				};
				const formValuesEnviar = {
					nome: formValues.nome,
					email: formValues.email,
					senha: formValues.senha,
					telefone: formValues.telefone,
					especialidade: formValues.especialidade,
					crm: formValues.crm,
					unidade: unidadeObj,
				};
				console.log(formValuesEnviar);
				try {
					const response = await fetch("api/cadastro-medico", {
						method: "POST",
						body: JSON.stringify(formValuesEnviar),
					});
					/**
					 * @type {{msg: "ok" | "invalid" | "used" | "refused" | "error"}}
					 */
					const data = await response.json();

					if (data.msg === "ok") {
						localStorage.setItem(
							"formValues",
							JSON.stringify(formValues)
						);
						router.push("/");
					} else if (data.msg === "invalid") {
						setInvalid(true);
					} else if (data.msg === "used") {
						setUsed(true);
					} else if (data.msg === "refused") {
						setRefused(true);
					} else {
						// Erro
						setError(true);
						console.error(
							"Erro ao cadastrar. Status:",
							response ? response.status : "unknown"
						);
					}
				} catch (error) {
					console.error("Erro ao cadastrar:", error);
				}
			} else if (categoria === "estabelecimentoSaude") {
				const tipoObj = {
					id: parseInt(formValues.tipo, 10),
				};
				const formValuesEnviar = {
					nome: formValues.nome,
					email: formValues.email,
					senha: formValues.senha,
					telefone: formValues.telefone,
					endereco: formValues.endereco,
					cep: formValues.cep,
					estado: formValues.estado,
					cidade: formValues.cidade,
					cnes: formValues.cnes,
					tipo: tipoObj,

				};
				console.log(formValuesEnviar);
				try {
					const response = await fetch("api/cadastro-unidade", {
						method: "POST",
						body: JSON.stringify(formValuesEnviar),
					});
					/**
					 * @type {{msg: "ok" | "invalid" | "used" | "refused" | "error"}}
					 */
					const data = await response.json();

					if (data.msg === "ok") {
						localStorage.setItem(
							"formValues",
							JSON.stringify(formValues)
						);
						router.push("/");
					} else if (data.msg === "invalid") {
						setInvalid(true);
					} else if (data.msg === "used") {
						setUsed(true);
					} else if (data.msg === "refused") {
						setRefused(true);
					} else {
						// Erro
						setError(true);
						console.error(
							"Erro ao cadastrar. Status:",
							response ? response.status : "unknown"
						);
					}
				} catch (error) {
					console.error("Erro ao cadastrar:", error);
				}
			}
		}
	};

	return (
		<>
			<main>
				<section>
					<h1>Faça o seu cadastro</h1>
					<form action="#" onSubmit={handleSubmit}>
						<label htmlFor="cadastroSelectCategoria">Categoria</label>
						<select
							name="Categoria"
							id="cadastroSelectCategoria"
							onChange={handleCategoriaChange}
							value={categoria}
						>
							<option value="" disabled>
								Escolha uma categoria
							</option>
							<option value="estabelecimentoSaude">
								Estabelecimento de Saúde
							</option>
							<option value="medico">Médico(a)</option>
						</select>

						{categoria != "" && (
							<>
								<label htmlFor="nome">Nome:</label>
								<input
									type="text"
									id="nome"
									name="nome"
									placeholder="Insira o nome completo"
									value={formValues.nome}
									onChange={handleInputChange}
									required
								/>

								<label htmlFor="email">Email:</label>
								<input
									type="email"
									id="email"
									name="email"
									placeholder="Este é o email que você usará para fazer o login"
									value={formValues.email}
									onChange={handleInputChange}
									required
								/>

								<label htmlFor="telefone">Telefone:</label>
								<input
									type="text"
									id="telefone"
									name="telefone"
									placeholder="Insira o telefone para contato"
									value={formValues.telefone}
									onChange={handleInputChange}
									maxLength="11"
									required
								/>
							</>
						)}

						{categoria === "medico" && (
							// Renderizar campos específicos para médicos
							<>
								<label htmlFor="crm">CRM:</label>
								<input
									type="text"
									id="crm"
									name="crm"
									placeholder="Registro no Conselho Regional de Medicina"
									value={formValues.crm}
									onChange={handleInputChange}
									required
								/>
								<label htmlFor="especialidade">Especialidade:</label>
								<input
									type="text"
									id="especialidade"
									name="especialidade"
									placeholder="Qual é sua especialidade?"
									value={formValues.especialidade}
									onChange={handleInputChange}
									required
								/>
								<label htmlFor="unidade">Unidade onde trabalha:</label>
								<select
								name="unidade"
								id="unidade"
								value={formValues.unidade}
								onChange={handleInputChange}
								required
								>
								{/* Opções para tipo de unidade */}
								<option value="" disabled>
									Escolha uma unidade
								</option>

								{/* Mapeando a lista de tipos para gerar as opções dinamicamente */}
								{unidades.map((unidade) => (
									<option key={unidade.id} value={unidade.id}>
									{unidade.nome}
									</option>
								))}
								</select>
							</>
						)}

						{categoria === "estabelecimentoSaude" && (
							// Renderizar campos específicos para hospitais
							<>
								<label htmlFor="tipo">Tipo:</label>
								<select
								name="tipo"
								id="tipo"
								value={formValues.tipo}
								onChange={handleInputChange}
								required
								>
								{/* Opções para tipo de unidade */}
								<option value="" disabled>
									Escolha um tipo
								</option>

								{/* Mapeando a lista de tipos para gerar as opções dinamicamente */}
								{tipos.map((tipo) => (
									<option key={tipo.id} value={tipo.id}>
									{tipo.descricao}
									</option>
								))}
								</select>
								<label htmlFor="cnes">CNES:</label>
								<input
									type="text"
									id="cnes"
									name="cnes"
									placeholder="Registro no Cadastro Nacional de Estabelecimentos de Saúde"
									value={formValues.cnes}
									onChange={handleInputChange}
									maxLength="7"
									required
								/>
								<label htmlFor="cep">CEP</label>
								<input
									type="text"
									id="cep"
									name="cep"
									placeholder="Insira o CEP da unidade"
									value={formValues.cep}
									onChange={handleInputChange}
									maxLength="8"
									required
								/>
								<label htmlFor="estado">Estado</label>
								<input
									type="text"
									id="estado"
									name="estado"
									value={formValues.estado}
									onChange={handleInputChange}
									readOnly
									required
									// Adicionar estilo, se estiver preenchido fica com fundo fracamente colorido
								/>
								<label htmlFor="cidade">Cidade</label>
								<input
									type="text"
									id="cidade"
									name="cidade"
									value={formValues.cidade}
									onChange={handleInputChange}
									readOnly
									required
									// Adicionar estilo, se estiver preenchido fica com fundo fracamente colorido
								/>
								<label htmlFor="endereco">Endereço</label>
								<input
									type="text"
									id="endereco"
									name="endereco"
									placeholder="Insira o endereço completo (incluindo número)"
									value={formValues.endereco}
									onChange={handleInputChange}
									required
								/>
							</>
						)}

						{categoria != "" && (
							<>
								<label>Senha:</label>
								<input
									type="password"
									name="senha"
									placeholder="Escolha uma senha forte"
									value={formValues.senha}
									onChange={handleInputChange}
									required
								/>

								<label>Confirmar Senha:</label>
								<input
									type="password"
									name="confirmarSenha"
									placeholder="Confirme sua senha"
									value={formValues.confirmarSenha}
									onChange={handleInputChange}
									required
								/>

								<BotaoPadrao tipo="text" texto="Enviar" />
							</>
						)}
					</form>
					<span>
						Já possui uma conta? <Link href={"/login"}>Entrar</Link>
					</span>
				</section>

				<dialog open={error}>
					<div>
						<h1>Erro</h1>
						<p>
							Houve um erro ao tentar fazer o cadastro, tente novamente
							mais tarde ou acesse o console para mais detalhes
						</p>
						<button onClick={() => setError(false)}>Ok</button>
					</div>
				</dialog>
				<dialog open={refused}>
					<div>
						<h1>Recusado</h1>
						<p>
							Seu cadastro foi recusado, tenha certeza que você já não
							possui uma conta
						</p>
						<button onClick={() => setRefused(false)}>Ok</button>
					</div>
				</dialog>
			</main>
		</>
	);
}
