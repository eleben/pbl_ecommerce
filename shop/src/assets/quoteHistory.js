export const fetchQuoteHistory = async (user,k) => {
    let apiHost = "";
   
    let auth = `token ${k["api_key"]}:${k["api_secret"]}`;
    let url = `${apiHost}/api/method/pbl_ecommerce.quote_history?user=${user}`;

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