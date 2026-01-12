// 🔐 Admin protection
if (localStorage.getItem("role") !== "admin") {
    window.location.href = "guest1.html";
}

let users = JSON.parse(localStorage.getItem("users")) || [];
let alertedUsers = new Set();

// Show admin name
document.getElementById("adminName").innerText =
    localStorage.getItem("currentAdminUser");

/* ========= ADD USER ========= */
function addUser() {
    const username = uname.value.trim();
    const password = upass.value.trim();

    if (!username || !password) {
        alert("Enter username and password");
        return;
    }

    if (users.some(u => u.username === username)) {
        alert("User already exists");
        return;
    }

    users.push({
        username,
        password,
        role: "USER",
        status: "ONLINE",
        breakType: null,
        breakStart: null,
        lunchExceeded: false
    });

    uname.value = "";
    upass.value = "";

    save();
}

/* ========= RENDER USERS ========= */
function renderUsers(list = users) {
    let html = "";

    list.forEach((u, index) => {
        let breakTime = "-";

        if (u.status === "AWAY" && u.breakStart) {
            const mins = Math.floor((Date.now() - u.breakStart) / 60000);
            breakTime = `${mins} min`;

            if (mins >= 60 && !alertedUsers.has(u.username)) {
                alert(`⚠️ ALERT: ${u.username} exceeded 1 hour break`);
                alertedUsers.add(u.username);
                u.lunchExceeded = true;
            }
        }

        html += `
        <tr>
            <td>${u.username}</td>
            <td class="${u.status === "ONLINE" ? "green" : "red"}">${u.status}</td>
            <td>${u.breakType || "-"}</td>
            <td>${breakTime}</td>
            <td>${u.lunchExceeded ? "⏰ Exceeded" : "-"}</td>
            <td>
                ${u.status === "AWAY"
                    ? `<button onclick="forceActive(${index})">Toggle</button>`
                    : ""
                }
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </td>
        </tr>`;
    });

    userTable.innerHTML = html;
}

/* ========= FORCE ACTIVE ========= */
function forceActive(index) {
    users[index].status = "ONLINE";
    users[index].breakType = null;
    users[index].breakStart = null;
    users[index].lunchExceeded = false;
    alertedUsers.delete(users[index].username);
    save();
}

/* ========= EDIT USER ========= */
function editUser(index) {
    const newName = prompt("Enter new username:", users[index].username);
    if (!newName) return;

    if (users.some((u, i) => u.username === newName && i !== index)) {
        alert("Username already exists");
        return;
    }

    users[index].username = newName;
    save();
}

/* ========= DELETE USER ========= */
function deleteUser(index) {
    if (!confirm("Delete this user?")) return;
    users.splice(index, 1);
    save();
}

/* ========= SEARCH USERS ========= */
function searchUsers() {
    const q = searchUser.value.toLowerCase();
    renderUsers(users.filter(u => u.username.toLowerCase().includes(q)));
}

/* ========= CSV DOWNLOAD ========= */
function downloadCSV() {
    let csv = "Username,Status,BreakType\n";
    users.forEach(u => {
        csv += `${u.username},${u.status},${u.breakType || ""}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "break-report.csv";
    link.click();
}

/* ========= SAVE ========= */
function save() {
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers();
}

/* ========= LOGOUT ========= */
function logout() {
    localStorage.removeItem("role");
    localStorage.removeItem("currentAdminUser");
    window.location.href = "guest1.html";
}

/* ========= AUTO REFRESH ========= */
setInterval(() => {
    users = JSON.parse(localStorage.getItem("users")) || [];
    renderUsers();
}, 2000);

renderUsers();
