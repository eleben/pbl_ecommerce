export const authDetails = async() => {
    let apiHost = "";
    let url = `${apiHost}/api/method/pbl_ecommerce.get_guest_access_keys`;
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