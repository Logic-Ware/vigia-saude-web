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
    const [error, setError] = useState(false)
    const [refused, setRefused] = useState(false)
    const onSubmit = async e => {
        e.preventDefault()
        setError(false)
        setRefused(false)
        const user = {
            email,
            senha: password,
        }
        const req = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(user),
        })
        /**
         * @type {{msg: "ok" | "refused" | "error"}}
         */
        const data = await req.json()
        if (data.msg === 'ok') {
            localStorage.setItem('user', JSON.stringify(user))
            router.push('/')
        }
        if (data.msg === 'refused') {
            setRefused(true)
        }
        if (data.msg === 'error') {
            setError(true)
            console.error(
                'Erro no login, por favor tenha certeza que o servidor java está rodando normalmente, link do repositório do servidor: https://github.com/Nexio-Corp/porto-java'
            )
        }
        console.log(data, email, password)
    }
    return (
        <>
            <main>
                <section>
                    <h1>Bem-vindo(a) de volta</h1>
                    <form action="#" onSubmit={onSubmit}>
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
