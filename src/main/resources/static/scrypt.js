const url = 'http://localhost:8080/api/admin';


function getAllUsers() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            loadTable(data)
        })
}

function getAdminPage() {
    fetch(url).then(response => response.json())
        .then(user =>
        loadTable(user))
}

function loadTable(listAllUsers) {
    const tableBody = document.getElementById('user_table');
    let res = '';
    for (let user of listAllUsers) {
        res +=
            `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.surname}</td>
                <td>${user.age}</td>
                <td>${user.username}</td>
                <td>${user.roles.map(r => r.role)}</td>
                <td>
                    <button class="btn btn-info" type="button"
                    data-bs-toggle="modal" data-bs-target="#editModal"
                    onclick="editModal(${user.id})">Edit</button></td>
                <td>
                    <button class="btn btn-danger" type="button"
                    data-bs-toggle="modal" data-bs-target="#deleteModal"
                    onclick="deleteModal(${user.id})">Delete</button></td>
            </tr>`
    }
    tableBody.innerHTML = res;
}
getAdminPage();


// Добавление пользователя
document.getElementById('newUserForm').addEventListener('submit', (e) => {
    e.preventDefault()
    let role = document.getElementById('role_select')
    let rolesAddUser = []
    let rolesAddUserValue = ''
    for (let i = 0; i < role.options.length; i++) {
        if (role.options[i].selected) {
            rolesAddUser.push({id: role.options[i].value, name: 'ROLE_' + role.options[i].innerHTML})
            rolesAddUserValue += role.options[i].innerHTML
        }
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            name: document.getElementById('newName').value,
            lastName: document.getElementById('newLastName').value,
            age: document.getElementById('newAge').value,
            userName: document.getElementById('newUserName').value,
            password: document.getElementById('newPassword').value,
            role: rolesAddUser
        })
    })
        .then((response) =>  {
            if (response.ok) {
                getAllUsers()
                document.getElementById("all-users-tab").click()
            }
        })
})



// Закрытие модального окна
function closeModal() {
    document.querySelectorAll(".btn-close").forEach((btn) => btn.click())
}


//Редактирование пользователя
function editModal(id) {
    fetch(url + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(u => {

            document.getElementById('idEdit').value = u.id;
            document.getElementById('nameEdit').value = u.name;
            document.getElementById('lastNameEdit').value = u.surname;
            document.getElementById('ageEdit').value = u.age;
            document.getElementById('usernameEdit').value = u.username;
            document.getElementById('passEdit').value = u.password;
            // if (u.roles.map(r => r.role) === "ROLE_ADMIN") {
            //     document.getElementById('rolesEdit').options[1].setAttribute('selected', 'selected');
            // } else {
                document.querySelector("#rolesEdit").value = "ROLE_USER";
            // }
        })
    });
}


async function editUser() {
    const form_ed = document.getElementById('rolesEdit');
    let idValue = document.getElementById("idEdit").value;
    let nameValue = document.getElementById("nameEdit").value;
    let lastNameValue = document.getElementById("lastNameEdit").value;
    let ageValue = document.getElementById("ageEdit").value;
    let emailValue = document.getElementById("usernameEdit").value;
    let passwordValue = document.getElementById("passEdit").value;
    // let role = document.getElementById('rolesEdit');
    // let roleValue;
    // for (let i = 0; i < role.options.length; i++) {
    //     if (role.options[i].selected) {
    //         roleValue = role.options[i].value;
    //     }
    // }
    let roleValue = [];
    for (let i = 0; i < form_ed.options.length; i++) {
        if (form_ed.options[i].selected) {
            let tmp = {};
            tmp["id"] = form_ed.options[i].value;
            console.log(form_ed.options[0].value);
            console.log(form_ed.options[1].value);
            roleValue.push(tmp);
        }
    }
    // let roleValue = document.getElementById("").value;
    let user = {
        id: idValue,
        name: nameValue,
        surname: lastNameValue,
        age: ageValue,
        username: emailValue,
        password: passwordValue
        // roles: roleValue
    }
    let role = {
        roles: roleValue
    }
    await fetch(url + '/' + user.id, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(user)
    });
    closeModal()
    getAllUsers()
}


// Удаление пользователя
function deleteModal(id) {
    fetch(url + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(u => {
            document.getElementById('deleteId').value = u.id;
            document.getElementById('deleteName').value = u.name;
            document.getElementById('deleteLastName').value = u.lastName;
            document.getElementById('deleteAge').value = u.age;
            document.getElementById('deleteUserName').value = u.userName;
            document.getElementById("deleteRole").value = u.role.map(r => r.role).join(", ");
        })
    });
}

async function deleteUser() {
    const id = document.getElementById("deleteId").value
    console.log(id)
    let urlDel = url + "/" + id;
    let method = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(urlDel, method).then(() => {
        closeModal()
        getAllUsers()
    })
}