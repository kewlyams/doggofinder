import { goto } from "$app/navigation";
import { auth } from "./auth";


export const dogSearchById = (ids: string[]) => {
    return auth()
    .post("/dogs", ids)
    .then((res) => {
        if(res.status = 200){
            return res.data;
            // return {
            //     props: {
            //     dogs,
            //     }
            // }
        }
    })
    .catch((error) => {
        console.log(error)
        if (error.status = 401){
            goto("/");
        }
    });
}