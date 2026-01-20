import { data } from './data.js'

const user_record_data = data()
const url = "http://localhost:3000"

// this is where we define the crud operatiion
async function getUsers(){
    const answer =  await fetch( url + "/data", {
        method:"GET"
    })

    return await answer.json()
}

await getUsers()

async function updateUser(user){
    const userId = user.id
    console.log(user)
    return await fetch( url + `/data/${userId}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            "name": "franck",
            "lastname": "djuma",
            "email": "amanifranck2005@gmail.com",
            "numero": "0969590595",
            "article": "one article",
            "isSubscribed": "on"
        })
    })
}

async function deleteUser(id) {
    return await fetch( url + `/data/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type":"application/json",
        }
    })
}

async function createUser(created_user) {
    return await fetch( url + "/data",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(created_user)
    })
}

// // these are the main elements
const table_data = document.querySelector("._table")
const add_record = document.querySelector(".add_record")
const table_header = document.querySelector("._table_header")
const no_data_container = document.querySelector(".no_data_container")
const add_user_container_model = document.querySelector(".add_user_container_model")
const remove_model_btn = document.querySelector(".remove_model_btn")

// // these are the inputs fields
const name_input = document.querySelector(".name")
const last_name_input = document.querySelector(".last_name")
const email_input = document.querySelector(".email")
const numero_input = document.querySelector(".numero")
const quantity_input  = document.querySelector(".quantity")
const isSubscribed_input = document.querySelector(".isSubscribed")

// this is the submit bnt
const submit_btn = document.querySelector(".submit_btn")

let isOpen = false
let typeOfbtn = ""
// // this is for bringing the form model
const openModel = () => {
    isOpen = true
    if(isOpen === true){
        add_user_container_model.classList.add("open_model")
        add_user_container_model.classList.remove("close_model")
    }
}
add_record.addEventListener("click",()=>{
    typeOfbtn = "create"
    openModel()
})

remove_model_btn.addEventListener("click",()=>{
    isOpen = false
    if(isOpen === false){
        add_user_container_model.classList.add("close_model")
        add_user_container_model.classList.remove("open_model")
    }
})

submit_btn.addEventListener("click",()=>{
    const created_user_data = {
        name: name_input.value,
        lastname:    last_name_input.value,
        email:    email_input.value,
        numero:    numero_input.value,
        article:    quantity_input.value,
        isSubscribed :    isSubscribed_input.value,
    }

    if (typeOfbtn === "create") {
        createUser(created_user_data)
    }
    if(typeOfbtn === "modify"){
        console.log(" this is for the other part that we are working")
        updateUser(created_user_data)
    }

    clearInput()
})

function clearInput(){
    name_input.value=  "",
    last_name_input.value= "",
    email_input.value= "",
    numero_input.value = "",
    quantity_input.value = "",
    isSubscribed_input.value = false
}


// // this is the function of the displaying the data
async function display_record_fn (){
    
    const users = await getUsers()

    table_data.innerHTML += users.map(({id, name, lastname, number, article, email, isStored})=>{
        return `<tbody>
                    <th>${name}</th>
                    <th>${lastname}</th>
                    <th>${number}</th>
                    <th class="user_status">
                        <button data-id="${id}" class="${ isStored ? "user_subscribed" :"non_user_subscribed"}">
                            ${ isStored ? "abonné" : "non abonné"}
                        </button> 
                    </th>
                    <th>${article}</th>
                    <th>${email}</th>
                    
                    <th class="user_btns">
                        <button data-id="${id}" class="modify_user_btn">
                            modifier
                        </button>
                        <button  data-id="${id}" class="delete_user_btn">
                            effacer
                        </button>
                        <button  data-id="${id}" class="see_user_details_btn">
                            voir details
                        </button>
                    </th>
                </tbody>`
    }).join("") 
    
    // crud operation btns
    const modify_user_btns = [...table_data.querySelectorAll(".modify_user_btn")]
    const delete_user_btns = [...table_data.querySelectorAll(".delete_user_btn")]
    const see_user_details_btns = [...table_data.querySelectorAll(".see_user_details_btn")]

    // crud opetion event handlers
    delete_user_btns.forEach((btn)=>{
        btn.addEventListener("click",async (e)=>{
            const currentBtn = e.target.dataset.id
            await deleteUser(currentBtn)
        })
    })

    see_user_details_btns.forEach((btn)=>{
        btn.addEventListener("click",(e)=>{
            const currentBtn = e.target.dataset.id
            console.log(`the see user details btn is ${currentBtn}`)
        })
    })

    modify_user_btns.forEach((btn)=>{
        
        btn.addEventListener("click",async (e)=>{
            openModel()
            typeOfbtn = "modify"
            
            const currentBtn = e.target.dataset.id
            const users = await getUsers()
            const selectedUser = users.filter(user => user.id === currentBtn)
            const {name, lastname,  number, article, email, isStored} = selectedUser[0]

            name_input.value=  name,
            last_name_input.value= lastname,
            email_input.value= email,
            numero_input.value = number,
            quantity_input.value = article,
            isSubscribed_input.value = isStored

        })
    })
}

display_record_fn()

setInterval(() => {
    if (user_record_data.length > 0) {
        no_data_container.style.display = "none"
    }else{
        no_data_container.style.display = "flex"
    }
}, 1);


console.log(user_record_data)

const table_header_width = table_header.getBoundingClientRect().width
no_data_container.style.width = `${table_header_width}px`


add_record.addEventListener("click", ()=>{

} )


