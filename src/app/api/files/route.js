import { ARKIVE_API } from 'src/config-global'
import Papa from 'papaparse'


export async function POST(req) {
  
  const body = await req.json()
  console.log(body)
  

  return new Response(JSON.stringify(true))
  try {
    const body = await req.json()

    const res = await fetch(ARKIVE_API.BASE_URL + '/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    return new Response(JSON.stringify(res.ok))
  } catch (error) {
    return new Response(JSON.stringify(false))
  }
}
