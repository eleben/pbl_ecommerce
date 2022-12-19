import { authDetails } from "./auth";

export const fetchOffers = async (k) => {
    let apiHost = "";
    // let auth = "token ef21846a44f6bc2:8674836caeba2ab"; //prod

    // let auth ="token 63f75eb8c710780:6f4b953ad681315";//dev
    // let auth = `token ${keys.api_key}:${keys.api_secret}`;
    // let k =  authDetails()
    // let kdata = await k.json()
    // let { api_key, api_secret } = k;
    let auth = `token ${k["api_key"]}:${k["api_secret"]}`;
    let url = `${apiHost}/api/method/pbl_ecommerce.shopping_cart_offers`;

    let data = await fetch(`${url}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: auth,
        },

    })
    let payload = await data.json()
    return payload.message
};