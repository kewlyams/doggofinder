import axios from "axios";

export const auth = () => {
    return axios.create({
        baseURL: "https://frontend-take-home-service.fetch.com",
        withCredentials: true
    })
}