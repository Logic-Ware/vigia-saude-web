import { NextRequest, NextResponse } from 'next/server'

/**
 * @param {NextRequest} req
 */
export async function POST(req) {
    const { email, senha } = await req.json()
    const user = {
        email,
        senha,
    }
    const loginEndPoint = `http://localhost:8080/vigiasaude/webapi/login/medico`
    let returnMsg = ''
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
            returnMsg = 'ok'
        } else if (response.status === 401) {
            returnMsg = 'unauthorized';
        } else {
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