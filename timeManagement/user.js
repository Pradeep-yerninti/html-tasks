
// 🔐 Security check
if (localStorage.getItem("role") !== "user") {
    window.location.href = "login.html";
}

let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = localStorage.getItem("currentUser");

function updateUI() {
    users = JSON.parse(localStorage.getItem("users")) || [];

    let online = 0, away = 0;
    users.forEach(u => {
        u.status === "ONLINE" ? online++ : away++;
    });

    document.getElementById("stats").innerHTML =
        `Online: <b>${online}</b> | On Break: <b>${away}</b>`;

    let me = users.find(u => u.username === currentUser);

    document.getElementById("breakStatus").innerHTML = me && me.breakType
        ? `<span class="red">You are on ${me.breakType} Break</span>`
        : `<span class="green">You are Working</span>`;
}

function startBreak() {
    users.forEach(u => {
        if (u.username === currentUser) {
            u.status = "AWAY";
            u.breakType = document.getElementById("breakType").value;
        }
    });
    save();
}

function endBreak() {
    users.forEach(u => {
        if (u.username === currentUser) {
            u.status = "ONLINE";
            u.breakType = null;
        }
    });
    save();
}

function save() {
    localStorage.setItem("users", JSON.stringify(users));
    updateUI();
}

// 🔄 Auto-refresh (sync with admin)
setInterval(updateUI, 2000);
updateUI();
