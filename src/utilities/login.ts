import { goto } from "$app/navigation";
import { auth } from "./auth";

export const login = (name:string, email:string) => {
    return auth()
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