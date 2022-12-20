export const companyDetails = async() => {
    let apiHost = "";
    let url = `${apiHost}/api/method/pbl_ecommerce.company_info`;
    let data = await fetch(`${url}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    let payload = await data.json();
    return payload.message[0];
}