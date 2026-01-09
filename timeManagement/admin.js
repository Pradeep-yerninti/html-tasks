
// 🔐 Admin protection - Only one admin user can access
if (localStorage.getItem("role") !== "admin") {
    window.location.href = "login.html";
}

// Verify that the logged-in admin matches the stored admin user
let adminData = JSON.parse(localStorage.getItem("admin"));
let currentAdminUser = localStorage.getItem("currentAdminUser");

if (!adminData || !currentAdminUser || currentAdminUser !== adminData.username) {
    // Unauthorized admin access attempt
    localStorage.removeItem("role");
    localStorage.removeItem("currentAdminUser");
    window.location.href = "login.html";
}

let users = JSON.parse(localStorage.getItem("users")) || [];


function renderUsers() {
    let html = "";

    users.forEach((u, i) => {
        html += `
        <tr>
            <td>${u.username}</td>
            <td>${u.role || "USER"}</td>
            <td class="${u.status === "ONLINE" ? "green" : "red"}">
                ${u.status}
            </td>
            <td>${u.breakType || "-"}</td>
            <td>
                <button onclick="deleteUser(${i})">Delete</button>
            </td>
        </tr>`;
    });

    document.getElementById("userTable").innerHTML = html;
    localStorage.setItem("users", JSON.stringify(users));
}

// 🔄 Auto refresh
setInterval(() => {
    users = JSON.parse(localStorage.getItem("users")) || [];
    renderUsers();
}, 2000);

function addUser() {
    const username = document.getElementById("uname").value.trim();
    const password = document.getElementById("upass").value.trim();

    if (!username || !password) return;

    if (users.some(u => u.username === username)) {
        alert("User already exists");
        return;
    }

    users.push({
        username,
        password,
        role: "USER",
        status: "ONLINE",
        breakType: null
    });

    document.getElementById("uname").value = "";
    document.getElementById("upass").value = "";

    renderUsers();
}

function deleteUser(index) {
    users.splice(index, 1);
    renderUsers();
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

renderUsers();
