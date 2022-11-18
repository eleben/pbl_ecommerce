import { getCookie } from './cookie';
//0735 096 284
export let apiHost = "http://dev.pbl.com" //(process.env['REACT_APP_NODE_ENV'] === "development") ? '/api' : process.env['REACT_APP_API_HOST'];
// console.log(`The default ${process.env['REACT_APP_NODE_ENV']}`)
export let FetchWrapper = async(params) => {

    let _defaultHeaders = {
        "Content-Type": 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With"
    }
    try {
        let response = await fetch(String(`${apiHost}${params.url}`), {
            headers: _defaultHeaders,
            method: params.method ? String(params.method) : 'GET',
            ...(params.method !== 'GET') && { body: String(params.data) }
        })
        let responseJSON = await response.json()
        let res = {
            status: "success",
            statusText: response.statusText,
            data: responseJSON
        }
        return res
    } catch (error) {
        console.error(error)
        let res = {
            statusText: "FHIRFetch: server error",
            status: "error",
            error: error
        }
        console.error(error)
        return res
    }

}