import axios from 'axios'

export const getAllAvatarsAPI = () => {
    return axios.get(`http://localhost:3001/champions/allChampionsAvatars?`).then(response => response)
}
export const getHeroAPI = (id) => {
    return axios.get(`http://localhost:3001/champions/${id}`).then(response => response)
}
export const signUp = (data) => {
    return axios.post(`http://localhost:3001/loginisation/signup`, data,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            }
        },
    ).then(response => response)
}
export const isExistAccount = (email) => {
    return axios.get(`http://localhost:3001/loginisation/isexistaccount/${email}`,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).then(response => response.data.isExistAccount)
}
export const logIn = (email, password) => {
    return axios.get(`http://localhost:3001/loginisation/login/${email}&${password}`).then(response => response)
}

export const getSetsIcons = () => {
    return axios.get(`http://localhost:3001/artifacts/`).then(response => response)
}
export const getSet = (id) => {
    return axios.get(`http://localhost:3001/artifacts/${id}`).then(response => response)
}
// export const getMessages = () => {
//     return axios.get('http://localhost:3001/forum/messages').then(response => response)
// }