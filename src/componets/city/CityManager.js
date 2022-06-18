export const getCities = () => {
    return fetch("http://localhost:8000/cities", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("hm_token")}`
        }
    })
        .then(response => response.json())
}
