import axios from "axios";

export const getAllAvatarsAPI = () => {
    return axios.get('http://localhost:3001/api/champions/allChampionsAvatars').then(response => response)
}
export const getHeroAPI = (id) => {
    return axios.get(`http://localhost:3001/api/champions/champion/${id}`).then(response => response)
}
export const signUp = (data) => {
    axios.post(`http://localhost:3001/api/loginisation/signup`, data,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            }
        },
    ).then(response => console.log(response))
}
export const isExistAccount = (email) => {
    return axios.get(`http://localhost:3001/api/loginisation/isexistaccount/${email}`,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).then(response => response.data.isExistAccount)
}