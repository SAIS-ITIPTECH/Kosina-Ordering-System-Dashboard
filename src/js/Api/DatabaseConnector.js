import { getCookie } from "../main.js";

export class DatabaseConnector{
    async get(target) {
        let data = await fetch(`https://kosina-api.up.railway.app/${target}`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getCookie("token")}`
            }
        }) 
        return await data.json();
    }

    async post(target, body){
        let data = await fetch(`https://kosina-api.up.railway.app/${target}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${getCookie("token")}`
            },
            body: JSON.stringify(body)
        }) 
        return await data.json();
    }

    async patch(target, body, id){
        let data = await fetch(`https://kosina-api.up.railway.app/${target}/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${getCookie("token")}`
            },
            body: JSON.stringify(body)
        }) 
        return await data.json();
    }

    async delete(target, id){
        let data = await fetch(`https://kosina-api.up.railway.app/${target}/${id}`,{
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${getCookie("token")}`
            },
        }) 
        return await data.json();
    }
}
