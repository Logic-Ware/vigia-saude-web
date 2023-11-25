## Uso das APIS

Para utilizarmos APIs no nosso projeto devemos iniciar os servidores locais das seguintes apis:

- <https://github.com/Logic-Ware/flask-ai-vigia-saude> - API em python que acessa o modelo treinado para identificar se a taxa de incidência informada representa ou não um risco sanitário para a população._\*Nota - O frontend espera que essa api esteja rodando na porta 5000\*_
- <https://github.com/Logic-Ware/vigia-saude-java> - API de java que conecta com o banco de dados, deve-se clonar o repositório e dentro do eclipse, baixar as dependências do maven para poder iniciar o servidor tomcat (_Versão 10.1.13_), espera-se que o endpoint do servidor tenha <http://localhost:8080/vigiasaude/webapi> como base.