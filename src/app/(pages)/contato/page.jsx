'use client';
import { useState } from 'react';
import './Contato.scss';
import BotaoPadrao from '@/components/BotaoPadrao/botaoPadrao';

export default function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulando o envio para o servidor
    // Aqui você pode realizar a lógica real de envio para o servidor
    // Se necessário, você pode usar uma biblioteca como Axios para fazer a requisição
    // axios.post('/url-do-servidor', { nome, email, telefone, mensagem })

    // Ativar a mensagem de enviado
    setEnviado(true);

    // Redirecionar para a home após 3 segundos
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  };

  return (
    <>
      <main>
        <fieldset className="formContainer">
        <h2>Contate-nos</h2>
          <form action="#" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                placeholder="Digite o nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Digite o email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="telefone">Telefone:</label>
              <input
                type="tel"
                id="telefone"
                placeholder="Digite o telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="mensagem">Mensagem:</label>
              <textarea
                id="mensagem"
                placeholder="Digite a mensagem"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                required
              />
            </div>
            {enviado ? (
              <p>Mensagem enviada! Obrigado pelo contato...</p>
            ) : (
              <BotaoPadrao tipo="submit" texto="Enviar" />
            )}
          </form>
        </fieldset>
      </main>
    </>
  );
}
