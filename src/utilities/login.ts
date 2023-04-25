import { goto } from "$app/navigation";
import { api } from "./api";

export const login = (name:string, email:string) => {
    return api()
    .post("/auth/login", {
        name:name, 
        email:email
    })
    .then((res) => {
        if(res.status == 200){
            goto("/home");
        }
    })
    .catch((error) => {
        console.log(error);
    });
}