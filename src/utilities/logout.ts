import { goto } from "$app/navigation";
import { auth } from "./auth";

export const logout = () => {
    return auth()
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