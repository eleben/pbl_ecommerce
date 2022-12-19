import { authDetails } from "./auth";

export const submitQuote = async(user,cart_items, k) => {
    let apiHost = "";
    // let auth = 'token 63f75eb8c710780:6f4b953ad681315' //dev
    // let auth = "token ef21846a44f6bc2:8674836caeba2ab"; //prod
    // let auth = `token ${keys.api_key}:${keys.api_secret}`;//dynamic
    // let k =  authDetails()
    // let kdata = await k.json()
    // let {api_key, api_secret} = k;
    let auth = `token ${k["api_key"]}:${k["api_secret"]}`;

    let url = `${apiHost}/api/method/pbl_ecommerce.make_quote`;
    let quote_args = {
        user,cart_items
    };
    let data = await fetch(`${url}?quote_args=${JSON.stringify(quote_args)}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: auth,
            // Authorization: auth
        },

    })
    let payload = await data.json()
    return payload
};