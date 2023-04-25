import axios from "axios";

export const api = () => {
    return axios.create({
        baseURL: "https://frontend-take-home-service.fetch.com",
        withCredentials: true
    })
}