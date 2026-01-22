import { data } from './data.js';
import { Enviroment } from './env.js';

const user_record_data = data()
const url = "http://localhost:3000/client-crud"

// this is where we define the crud operatiion
async function getUsers(){
    const answer =  await fetch( url , {
        method:"GET"
    })
    const clients_reponse = await answer.json()
    display_record_fn(clients_reponse)
}

// this is for all the users
getUsers()

// this is the function of deleting client
function deleteUser(id) {
    fetch( url + `/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type":"application/json",
        }
    }).then(()=>{
        getUsers()
    })
}

// // these are the main elements
const table_data = document.querySelector("._table_row")
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

// this is the submit btn
const submit_btn = document.querySelector(".submit_btn")

// these are the code that are going to oppen and close the model
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

const closeModel = () => {
    isOpen = false
    if(isOpen === false){
        add_user_container_model.classList.add("close_model")
        add_user_container_model.classList.remove("open_model")
    }
}
add_record.addEventListener("click",()=>{
    typeOfbtn = "create"
    openModel()
})

remove_model_btn.addEventListener("click",()=>{
    closeModel()
})


let curreId = ""
submit_btn.addEventListener("click",async(e)=>{
    // here we are preventing the default values 
    e.preventDefault()

    // this is the user model
    const created_user_data = {
        nom: name_input.value,
        postnom: last_name_input.value,
        email: email_input.value,
        numero: numero_input.value,
        quantite: quantity_input.value,
        statut : false  //isSubscribed_input.value,
    }

    // this is the part tat we are trying  the check box works
    console.log(`the value of the is targed is ${isSubscribed_input.value}`)

    if (typeOfbtn === "create") {
        await fetch( url ,{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(created_user_data)
        }).then(()=>{
            getUsers()
            clearInput()
            closeModel()
        })
    }
    else if(typeOfbtn === "modify"){
        alert(" the modify btn is working")
        await fetch( url + `/${curreId}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(created_user_data)
        }).then(()=> {
            getUsers()
            clearInput()
            closeModel()
        })
    }
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
async function display_record_fn (clients_reponse){
    console.log("the mapped users are :",clients_reponse)

    table_data.innerHTML = clients_reponse.map(({id,nom,postnom,numero,statut,quantite,email})=>{
        return `<tr>
                    <th>${nom}</th>
                    <th>${postnom}</th>
                    <th>${numero}</th>
                    <th class="user_status">
                        <button data-id="${id}" class="${ statut ? "user_subscribed" :"non_user_subscribed"}">
          
                        ${ statut ? "abonné" : "non abonné"}
                        </button> 
                    </th>
                    <th>${quantite}</th>
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
                </tr>`
    }).join("") 
    
    // crud operation btns
    const modify_user_btns = [...table_data.querySelectorAll(".modify_user_btn")]
    const delete_user_btns = [...table_data.querySelectorAll(".delete_user_btn")]
    const see_user_details_btns = [...table_data.querySelectorAll(".see_user_details_btn")]

    // crud opetion event handlers
    delete_user_btns.forEach((btn)=>{
        btn.addEventListener("click",async (e)=>{
            const currentBtn = e.target.dataset.id
            deleteUser(currentBtn)
        })
    })

    see_user_details_btns.forEach((btn)=>{
        btn.addEventListener("click",(e)=>{
            const currentBtn = e.target.dataset.id
        })
    })

    modify_user_btns.forEach((btn)=>{
        
        btn.addEventListener("click",async (e)=>{
            openModel()
            typeOfbtn = "modify"
            
            // this is the place of selecting the selected user 
            const currentBtn = e.target.dataset.id
            const selectedUser = clients_reponse.filter(user => user.id === currentBtn)
            const {nom,postnom,numero,statut,quantite,email} = selectedUser[0]

            // this is the place setting 
            curreId = currentBtn
            name_input.value=  nom
            last_name_input.value= postnom
            email_input.value= email
            numero_input.value = numero
            quantity_input.value = quantite
            isSubscribed_input.value = statut

        })
    })
}


// this is for deleting the board
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


