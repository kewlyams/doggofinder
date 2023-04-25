import { goto } from "$app/navigation";
import { api } from "./api";

export const logout = () => {
    return api()
    .post("/auth/logout")
    .then((res) => {
        if(res.status == 200){
            goto("/");
        }
    })
    .catch((error) => {
        console.log(error);
    });
}