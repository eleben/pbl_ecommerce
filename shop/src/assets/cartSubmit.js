export const submitQuote = async(user,cart_items) => {
    let apiHost = "https://portal.premierbiolife.com/";
    // let auth = 'token 63f75eb8c710780:6f4b953ad681315' //dev
    let auth = "token ef21846a44f6bc2:8674836caeba2ab"; //prod

    let url = `${apiHost}/api/method/pbl_ecommerce.`;
    let quote_args = {
        user,cart_items
    };
    let data = await fetch(`${url}?query_args=${JSON.stringify(quote_args)}`, {
        method: "POST",
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