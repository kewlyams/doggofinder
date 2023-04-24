import { goto } from "$app/navigation";
import { auth } from "./auth";

export const breedSearch = () => {

    return auth()
        .get("/dogs/breeds")
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


