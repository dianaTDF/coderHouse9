const socket = io()
//const listDiv= document.getElementById('chat_list')

//algunas globales
const chatBox = document.getElementById('chat_box')

function checkLog(){
    chatBox.style.display= 'none'
    const userEmail = document.getElementById('user_email').value

    if(userEmail==''){
        chatBox.style.display= 'none'
    }else{
        chatBox.style.display= 'block'
    }

    return userEmail
}


const userLogForm = document.getElementById('log_form')
userLogForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    checkLog()
    window.location.reload()

})

/* window.onload=()=>{
    checkLog()
} */


/* ---------------------------- listar mensajes ---------------------------- */
socket.on('messagesList',messages=>{
    const userEmail = checkLog()

    console.log(messages)
    for (const {user,message} of messages) {
        const messageItem = document.createElement('div')
        console.log(user)
        console.log(userEmail)
        if(userEmail ==user){ //si se ingresa con el mismo correo que alguno de los presente, se modifica aspecto
            messageItem.setAttribute("class",'myMessage')
        }else{
            messageItem.setAttribute("class",'message')
        }
        //se agrega al div los elementos del mensaje
        const userText= document.createElement('strong')
        userText.innerHTML= user
        const messageText= document.createElement('p')
        messageText.innerHTML= message

        messageItem.appendChild(userText)
        messageItem.appendChild(messageText)

        //buscamos el div chat_list y le insertamos el div creado en el loop
        document.getElementById('chat_list').appendChild(messageItem)
    }

})

/* ------------------------------ crear mensaje ----------------------------- */
const messageForm = document.getElementById('new_message')

messageForm?.addEventListener('submit',async event =>{
    event.preventDefault()

    const data  = new FormData(messageForm)
    const messBody = Object.fromEntries(data).message

    if (messBody != ''  && checkLog() != null){

        const newMessage= {
            message: messBody,
            user: checkLog()
        }
        
        console.log(newMessage)
        socket.emit('messageAdd',newMessage)
    }
    else{
        socket.emit('errorMessage',{message:`no esta logeado y/o el mensaje esta vaccio`})
    }

    document.getElementById('body-text').focus()
})

/* --------------------------------- mensajes -------------------------------- */
socket.on(`errorMessage`, error =>{
    alert(`ERROR: ${error.message}`)
  })
  socket.on(`successMessage`, success =>{
    alert(`${success.message}`)
  })