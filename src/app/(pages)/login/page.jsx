'use client'

// import { IoArrowBack } from 'react-icons/io5'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [unauthorized, setUnauthorized] = useState(false)
    const [error, setError] = useState(false)
    const [refused, setRefused] = useState(false)
	const [categoria, setCategoria] = useState("");

    const handleCategoriaChange = (evt) => {
		setCategoria(evt.target.value);
	};

    const onSubmit = async e => {
        e.preventDefault()
        setError(false)
        setRefused(false)
        const user = {
            email,
            senha: password,
        }
        const loginEndPoint = `http://localhost:8080/vigiasaude/webapi/login/${categoria}`
        let response = await fetch(loginEndPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        try {
        response = await response
        const data = await response.text()
        if (response.status === 200) {
            localStorage.setItem('user', JSON.stringify(user))
            router.push('/')
        } else if (response.status === 401) {
            setUnauthorized(true)
        } else {
            setRefused(true)
        }
        } catch (e) {
            setError(true)
        }
        console.log(user)

    }
    return (
        <>
            <main>
                <section>
                    <h1>Bem-vindo(a) de volta</h1>
                    <form action="#" onSubmit={onSubmit}>
                    <select
							name="Categoria"
							id="cadastroSelectCategoria"
							onChange={handleCategoriaChange}
							value={categoria}
						>
							<option value="" disabled>
								Escolha uma categoria
							</option>
							<option value="unidade">
								Estabelecimento de Saúde
							</option>
							<option value="medico">Médico(a)</option>
						</select>
                        {categoria != "" && (
                        <>
                            <input
                                type="text"
                                placeholder="Email"
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <a href="#">Esqueceu a senha?</a>
                            <button type="submit">Entrar</button>
                        </>
                        )}
                    </form>
                    <span>
                        Não tem uma conta ainda?{' '}
                        <Link href={'/cadastro'}>Cadastrar-se</Link>
                    </span>
                </section>
                <dialog>
                    <div>
                        <h1>Erro</h1>
                        <p>
                            Houve um erro ao tentar fazer login, tente novamente
                            mais tarde ou acesse o console para mais detalhes
                        </p>
                        <button onClick={() => setError(false)}>Ok</button>
                    </div>
                </dialog>
                <dialog
                    open={refused}
                >
                    <div>
                        <h1>Falha no Login</h1>
                        <p>
                            Email ou senha incorretos, verifique os dados e
                            tente novamente
                        </p>
                        <button onClick={() => setRefused(false)}>Ok</button>
                    </div>
                </dialog>
            </main>
        </>
    )
}
