const url = 'http://localhost:8080/api/admin';


function getAllUsers() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            loadTable(data)
        })
}

function loadTable(listAllUsers) {
    const tableBody = document.getElementById("user_table");
    let res = "";
    for (let user of listAllUsers) {
        res +=
            `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.surname}</td>
                <td>${user.age}</td>
                <td>${user.username}</td>
                <td>${user.roles.map(r => r.role.replace(/ROLE_/gi, ""))}</td>
                <td>
                    <button class="btn btn-info" type="button"
                    data-bs-toggle="modal" data-bs-target="#editModal"
                    onclick="editModal(${user.id})">Редактировать</button></td>
                <td>
                    <button class="btn btn-danger" type="button"
                    data-bs-toggle="modal" data-bs-target="#deleteModal"
                    onclick="deleteModal(${user.id})">Удалить</button></td>
            </tr>`
    }
    tableBody.innerHTML = res;
}
getAllUsers();


// Добавление пользователя
document.getElementById("addUser").addEventListener("submit", (e) => {
    e.preventDefault()
    const form_cr = document.getElementById("create_role");
    let nameValue = document.getElementById("create_username").value;
    let surnameValue = document.getElementById("create_surname").value;
    let ageValue = document.getElementById("create_age").value;
    let emailValue = document.getElementById("create_email").value;
    let passwordValue = document.getElementById("create_password").value;
    let adminRole = {id:2, role:"ROLE_ADMIN"};
    let userRole = {id:1, role:"ROLE_USER"};
    let setRoles = [];
    if (form_cr.options[0].selected){
        setRoles.push(userRole)
    }
    if(form_cr.options[1].selected){
        setRoles.push(adminRole)
    }
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            name: nameValue,
            surname: surnameValue,
            age: ageValue,
            username: emailValue,
            password: passwordValue,
            roles: setRoles
        })
    })
        .then((response) =>  {
            if (response.ok) {
                getAllUsers()
                document.getElementById("nav-users-table-tab").click()
            }
        })
})



// Закрытие модального окна
function closeModal() {
    document.querySelectorAll(".btn-close").forEach((btn) => btn.click())
}


//Редактирование пользователя
function editModal(id) {
    fetch(url + "/" + id, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=UTF-8"
        }
    }).then(res => {
        res.json().then(u => {
            document.getElementById("idEdit").value = u.id;
            document.getElementById("nameEdit").value = u.name;
            document.getElementById("lastNameEdit").value = u.surname;
            document.getElementById("ageEdit").value = u.age;
            document.getElementById("usernameEdit").value = u.username;
            document.getElementById("passEdit").value = u.password;
            if (u.roles.map(r => r.role).toString().includes("ROLE_USER")) {
                document.querySelector("#rolesEdit").value = 1;
            }
            if (u.roles.map(r => r.role).toString().includes("ROLE_ADMIN")) {
                document.querySelector('#rolesEdit').value = 2;
            }
        })
    });
}

async function editUser() {
    const form_ed = document.getElementById("rolesEdit");
    let idValue = document.getElementById("idEdit").value;
    let nameValue = document.getElementById("nameEdit").value;
    let lastNameValue = document.getElementById("lastNameEdit").value;
    let ageValue = document.getElementById("ageEdit").value;
    let emailValue = document.getElementById("usernameEdit").value;
    let passwordValue = document.getElementById("passEdit").value;
    let adminRole = {id:2, role:"ROLE_ADMIN"};
    let userRole = {id:1, role:"ROLE_USER"};
    let setRoles = [];
        if (form_ed.options[0].selected){
            setRoles.push(userRole)
        }
        if(form_ed.options[1].selected){
            setRoles.push(adminRole)
        }
    let user = {
        id: idValue,
        name: nameValue,
        surname: lastNameValue,
        age: ageValue,
        username: emailValue,
        password: passwordValue,
        roles: setRoles
    }
    await fetch(url, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(user)
    }).then(() => {
        closeModal()
        getAllUsers()
    });
}


// Удаление пользователя
function deleteModal(id) {
    fetch(url + "/" + id, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=UTF-8"
        }
    }).then(res => {
        res.json().then(u => {
            document.getElementById("idDelete").value = u.id;
            document.getElementById("nameDelete").value = u.name;
            document.getElementById("lastNameDelete").value = u.surname;
            document.getElementById("ageDelete").value = u.age;
            document.getElementById("usernameDelete").value = u.username;
        })
    });
}

async function deleteUser() {
    const id = document.getElementById("idDelete").value
    fetch(url + "/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
        closeModal()
        getAllUsers()
    })
}