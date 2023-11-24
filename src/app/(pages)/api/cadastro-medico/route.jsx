import { NextRequest, NextResponse } from 'next/server'

/**
 * @param {NextRequest} req
 */
export async function POST(req) {
    const { nome, email, senha, telefone, especialidade, crm, unidade } = await req.json();
    const medico = {
        nome,
        email,
        senha,
        telefone,
        especialidade,
        crm,
        unidade,
    }
    const endPoint = `http://localhost:8080/vigiasaude/webapi/medico/cadastro`
    let returnMsg = ''

    let response = fetch(endPoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(medico),
    })
    try {
        response = await response
        if (response.status === 200) {
            returnMsg = 'ok'
        } 
        else if (response.status === 409) {
            returnMsg = 'used'
        } 
        else if (response.status === 400) {
            returnMsg = 'invalid'
        }else {
            returnMsg = 'refused'
        }
    } catch (e) {
        returnMsg = 'error'
    }
    return new NextResponse(
        JSON.stringify({
            msg: returnMsg,
        }),
        {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
}
