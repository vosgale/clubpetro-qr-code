import axios from 'axios';


const token = localStorage.getItem("accessToken")

const api = axios.create({
    baseURL: 'https://cpdev.clubpetro.com/api/v2/cp-robot',
    headers: {
        Accept: 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`
    },
});

export default api;