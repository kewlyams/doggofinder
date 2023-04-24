import { goto } from "$app/navigation";
import type { QueryParams } from "$lib/QueryParams";
import { auth } from "./auth";


export const dogSearch = (query_params:QueryParams) => {
    return auth()
    .get("/dogs/search", 
        {params: query_params,})
    .then((res) => {
        if(res.status = 200){
            // ids = res.data.resultIds
            // query_total = res.data.total

            return res.data;
            // getDogsById();
        }
    })
    .catch((error) => {
        console.log(error)
        if (error.status = 401){
            goto("/");
        }
    });
}