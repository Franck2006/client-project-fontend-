export class Enviroment{
    clientApi = ""
    constructor(){
        this.clientApi = "";
    }
    sendApiToModule(){
        return this.clientApi
    }
}


async function createUser(created_user) {
    return await fetch( url ,{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(created_user)
    })
}