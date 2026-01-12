function login() {
    const uname = document.getElementById("form2Example11").value.trim();
    const pass  = document.getElementById("form2Example22").value.trim();
    const role  = document.getElementById("role").value;
    const err   = document.getElementById("err");
    const info  = document.getElementById("info");

    err.innerText = "";
    info.innerText = "";
    info.className = "success";

    if (!uname || !pass) {
        err.innerText = "Username and password are required";
        return;
    }

    /* ================= ADMIN LOGIN ================= */
    if (role === "admin") {
        const adminData = JSON.parse(localStorage.getItem("admin"));

        // First admin creation
        if (!adminData) {
            localStorage.setItem("admin", JSON.stringify({
                username: uname,
                password: pass   // demo only
            }));

            localStorage.setItem("role", "admin");
            localStorage.setItem("currentAdminUser", uname);

            info.innerText = "✓ Admin account created successfully";

            setTimeout(() => {
                window.location.href = "admin.html";
            }, 800);
        } 
        // Existing admin login
        else if (adminData.username === uname && adminData.password === pass) {
            localStorage.setItem("role", "admin");
            localStorage.setItem("currentAdminUser", uname);
            window.location.href = "admin.html";
        } 
        else {
            err.innerText = "Invalid admin credentials (only one admin allowed)";
        }
        return;
    }

    /* ================= USER LOGIN ================= */
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === uname && u.password === pass);

    if (user) {
        localStorage.setItem("role", "user");
        localStorage.setItem("currentUser", uname);

        info.innerText = "✓ User login successful";

        setTimeout(() => {
            window.location.href = "user.html";
        }, 800);
    } else {
        err.innerText = "Invalid credentials. Please register first.";
    }
}

/* ============== ROLE INFO HANDLING ============== */
document.addEventListener("DOMContentLoaded", () => {
    const roleSelect = document.getElementById("role");
    const info = document.getElementById("info");

    function updateRoleInfo() {
        const adminData = JSON.parse(localStorage.getItem("admin"));

        if (roleSelect.value === "admin") {
            info.innerText = adminData
                ? "ℹ️ Admin already exists (single access only)"
                : "ℹ️ First login will create the admin account";
        } else {
            info.innerText = "ℹ️ Multiple users can log in";
        }
    }

    roleSelect.addEventListener("change", updateRoleInfo);
    updateRoleInfo();
});
