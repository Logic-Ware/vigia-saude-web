import { NextRequest, NextResponse } from 'next/server';

/**
 * @param {NextRequest} req
 */
export async function GET(req) {
    try {
        const endPoint = 'http://localhost:8080/vigiasaude/webapi/tipo';

        let response = await fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        let returnMsg = '';
        let responseData = [];

        if (response.status === 200) {
            responseData = await response.json();
            returnMsg = 'ok';
        } else if (response.status === 404) {
            returnMsg = 'not-found';
        } else {
            returnMsg = 'refused';
        }

        return new NextResponse(
            JSON.stringify({
                tipos: responseData,
            }),
            {
                status: response.status,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (e) {
        return new NextResponse(
            JSON.stringify({
                msg: 'error',
            }),
            {
                status: 500, // Internal Server Error
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}
