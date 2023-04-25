import { goto } from "$app/navigation";
import type { Doggo } from "$lib/Doggo";
import { api } from "./api";


export const getMatchedDog = (list_of_favorites: Doggo[]) => {

    return api()
    .post("/dogs/match", list_of_favorites.map((dog) => dog.id))
    .then((res) => {
        if(res.status = 200){
            return res.data
        }
    })
    .catch((error) => {
        console.log(error)
        if (error.status = 401){
            goto("/");
        }
    });
}
