function userDetails(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const emailid = event.target.email.value;
    const phone1 = event.target.number.value;
    
    const obj = {
        name,
        emailid,
        phone1
    };
    console.log(obj);
   
    axios.post("http://localhost:4000/api/user/add-user", obj)
    .then((response) => { 
        shownewuseronscreen(response.data); // Fixed: response.data to access the user data
    })
    .catch((err) => {
        document.body.innerHTML += "<h4>something went wrong </h4>";
        console.log(err);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:4000/api/user/get-users")
    .then((response) => {
        console.log(response.data); // Fixed: response.data to access the user data
        for (let i = 0; i < response.data.length; i++) {
            shownewuseronscreen(response.data[i]); // Fixed: response.data[i]
        }
    })
    .catch((error) => {
        console.log(error);
    });
});

function shownewuseronscreen(user) {
    console.log(user);
    document.getElementById('emailid').value = '';
    document.getElementById('username').value = '';
    document.getElementById('phoneo').value = '';
    
    const parentnode = document.getElementById('listofusers');
    const childnode = `<li id=${user.id}> ${user.name}, ${user.emailid}, ${user.phone1} 
                        <button onclick="deleteUser('${user.id}')"> Delete user </button>
                        <button onclick="edituser('${user.emailid}', '${user.name}', '${user.phone1}', ${user.id})"> Edit User </button></li>`;
    parentnode.innerHTML += childnode; // Simplified concatenation
}

function edituser(emailid, name, phone1, userid) {
    document.getElementById('emailid').value = emailid;
    document.getElementById('username').value = name;
    document.getElementById('phoneo').value = phone1;
    deleteUser(userid);
}

function deleteUser(userid) {
    axios.delete(`http://localhost:4000/api/user/delete-user/${userid}`)
    .then((response) => {
        removeuserfromscreen(userid);
    })
    .catch((err) => {
        console.log(err);
    });
}

function removeuserfromscreen(userid) {
    const parentnode = document.getElementById('listofusers');
    const childnodeisdeleted = document.getElementById(userid);
    if (childnodeisdeleted) {
        parentnode.removeChild(childnodeisdeleted);
    }
}
