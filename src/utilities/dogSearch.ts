import { goto } from "$app/navigation";
import type { QueryParams } from "$lib/QueryParams";
import { api } from "./api";


export const dogSearch = (query_params:QueryParams) => {
    return api()
    .get("/dogs/search", 
        {params: query_params,})
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