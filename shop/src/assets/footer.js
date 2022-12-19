export const footerDetailsInfo = async() => {
    let apiHost = "";
    let url = `${apiHost}/api/method/pbl_ecommerce.footer_info`;
    let data = await fetch(`${url}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    let payload = await data.json()
    return payload.message
}