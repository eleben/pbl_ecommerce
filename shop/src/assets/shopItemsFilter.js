export const fetchShopItemsWithFilter = async (query) => {
    let apiHost = "https://portal.premierbiolife.com/";
    // let auth = 'token 63f75eb8c710780:6f4b953ad681315' //dev
    let auth = "token ef21846a44f6bc2:8674836caeba2ab"; //prod


    // let url = `${apiHost}/api/method/erpnext.e_commerce.api.get_product_filter_data`;
    let url = `${apiHost}/api/method/erpnext.templates.pages.product_search.search`;

    // let query_args = {
    //     search,
    //     field_filters: {},
    //     attribute_filters: {},
    //     item_group: "",
    //     start: 0,
    //     from_filters: 0,
    // };
    // let data = await fetch(`${url}?query_args=${JSON.stringify(query_args)}`, {
    let data = await fetch(`${url}?query=${query}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: auth,
            // Authorization: auth
        },

    })
    let payload = await data.json()
    return payload.message
};