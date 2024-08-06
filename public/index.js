function userDetails(event){
    event.preventDefault()
    const name= event.target.name.value;
    const emailid=event.target.email.value;
    const phone1=event.target.number.value;
    
    const obj={
        name,
        emailid,
        phone1
    }
    console.log(obj)
   
    axios.post("http://localhost:4000/user/add-user",obj)
    .then((response) =>{ 
       
        shownewuseronscreen(response)
        
       
    })
    .catch((err) =>{
        document.body.innerHTML = document.body.innerHTML + "<h4>something went wrong </h4>"
        console.log(err)
    })
    
}

    window.addEventListener("DOMContentLoaded", () => {
        
         axios.get("http://localhost:4000/user/get-users")
         .then((response) => {
            console.log(response)
            for(var i=0;i<response.length;i++){
                shownewuseronscreen(response[i]);
            }
         })
         .catch((error) => {
            console.log(error)
         })
    
    })



function shownewuseronscreen(user){
    console.log(user)
    document.getElementById('emailid').value= '';
    document.getElementById('username').value= '';
    document.getElementById('phoneo').value= '';
    
  
    const parentnode=document.getElementById('listofusers')
    const childnode=   `<li id=${user.id}> ${user.name}, ${user.email}
                        <button onclick=deleteUser('${user.id}')> Delete user </button>
                        <button onclick=edituser('${user.email}','${user.name}','${user.phonenumber}',${user.id})> Edit User </button></li>`
    parentnode.innerHTML= parentnode.innerHTML + childnode
}
function edituser(emailid,name,phone1,userid){
    document.getElementById('emailid').value=emailid
    document.getElementById('username').value=name
    document.getElementById('phoneo').value=phone1
    deleteUser(userid)

}
function deleteUser(userid){
    axios.delete(`http://localhost:4000/user/delete-user/${userid}`)
    .then((response) => {
        removeuserfromscreen(userid)

    })
    .catch((err) =>{
        console.log(err);
        res.sendStatus(500).json(err)
    })

 }
function removeuserfromscreen(userid){
    const parentnode=document.getElementById('listofusers')
    const childnodeisdeleted=document.getElementById(userid)
    parentnode.removeChild(childnodeisdeleted)
}