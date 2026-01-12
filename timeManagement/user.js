function contact(){

let a=document.getElementById("modile");
a.innerHTML="+91-9888888888";
}
// 🔐 Security

if (localStorage.getItem("role") !== "user") {
    window.location.href = "guest1.html";
}

let users = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = localStorage.getItem("currentUser");

const welcome = document.getElementById("welcome");
const stats = document.getElementById("stats");
const breakStatus = document.getElementById("breakStatus");
const timerEl = document.getElementById("timer");

welcome.innerHTML = `Welcome, <b>${currentUser}</b>`;

let countdownInterval = null;
const ONE_HOUR = 60 * 60 * 1000;

/* ========= UPDATE UI ========= */
function updateUI() {
    users = JSON.parse(localStorage.getItem("users")) || [];

    let online = 0, away = 0;
    users.forEach(u => u.status === "ONLINE" ? online++ : away++);

    stats.innerHTML = `Online: <b>${online}</b> | On Break: <b>${away}</b>`;

    const me = users.find(u => u.username === currentUser);
    if (!me) return;

    if (me.status === "AWAY") {
        breakStatus.innerHTML =
            `<span class="red">On ${me.breakType} Break</span>`;
        startCountdown(me);
    } else {
        breakStatus.innerHTML =
            `<span class="green">Working</span>`;
        timerEl.innerHTML = "";
        clearInterval(countdownInterval);
    }
}

/* ========= START BREAK ========= */
function startBreak() {
    const type = document.getElementById("breakType").value;
    alert(`Starting ${type} break`);

    users.forEach(u => {
        if (u.username === currentUser && u.status === "ONLINE") {
            u.status = "AWAY";
            u.breakType = type;
            u.breakStart = Date.now(); // ⏱ start timer
        }
    });
    save();
}

/* ========= END BREAK ========= */
function endBreak() {
    alert("Ending break, welcome back!");
    users.forEach(u => {
        if (u.username === currentUser) {
            u.status = "ONLINE";
            u.breakType = null;
            u.breakStart = null;
        }
    });
    save();
}

/* ========= 1-HOUR COUNTDOWN ========= */
function startCountdown(user) {
    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const elapsed = Date.now() - user.breakStart;
        const remaining = ONE_HOUR - elapsed;

        if (remaining <= 0) {
            timerEl.innerHTML =
                `<span class="error">⏰ Time Over (1 Hour Completed)</span>`;
            clearInterval(countdownInterval);
            return;
        }

        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);

        timerEl.innerHTML =
            `<span class="red">⏳ Time Left: ${minutes}:${seconds
                .toString()
                .padStart(2, "0")}</span>`;
    }, 1000);
}
function logout() {
    localStorage.removeItem("role");
    localStorage.removeItem("currentUser");
    window.location.href = "guest1.html";
}

/* ========= SAVE ========= */
function save() {
    localStorage.setItem("users", JSON.stringify(users));
    updateUI();
}

setInterval(updateUI, 2000);
updateUI();


