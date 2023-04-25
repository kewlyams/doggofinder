import { goto } from "$app/navigation";
import { api } from "./api";


export const dogSearchById = (ids: string[]) => {
    return api()
    .post("/dogs", ids)
    .then((res) => {
        if(res.status = 200){
            return res.data;
        }
    })
    .catch((error) => {
        console.log(error)
        if (error.status = 401){
            goto("/");
        }
    });
}