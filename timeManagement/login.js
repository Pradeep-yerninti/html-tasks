function login() {
    const uname = document.getElementById("username").value.trim();
    const pass  = document.getElementById("password").value.trim();
    const role  = document.querySelector('input[name="role"]:checked').value;
    const err   = document.getElementById("err");
    const info  = document.getElementById("info");

    err.innerText = "";
    info.innerText = "";

    // 🔐 ADMIN LOGIN (Only one admin user - stored once during first setup)
    if (role === "admin") {
        let adminData = JSON.parse(localStorage.getItem("admin"));
        
        if (!adminData) {
            // First time setup - store admin credentials (only once)
            if (!uname || !pass) {
                err.innerText = "Admin username and password are required";
                return;
            }
            localStorage.setItem("admin", JSON.stringify({
                username: uname,
                password: pass
            }));
            localStorage.setItem("role", "admin");
            localStorage.setItem("currentAdminUser", uname);
            info.innerText = "✓ Admin account created successfully";
            window.location.href = "admin.html";
        } else {
            // Admin already exists - verify against stored credentials only
            if (adminData.username === uname && adminData.password === pass) {
                localStorage.setItem("role", "admin");
                localStorage.setItem("currentAdminUser", uname);
                window.location.href = "admin.html";
            } else {
                err.innerText = "Invalid Admin credentials (Only one admin allowed)";
            }
        }
        return;
    }

    // 👤 USER LOGIN (From localStorage - Multiple users allowed)
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === uname && u.password === pass);

    if (user) {
        localStorage.setItem("role", "user");
        localStorage.setItem("currentUser", uname);
        info.innerText = "✓ User login successful";
        window.location.href = "user.html";
    } else {
        err.innerText = "Invalid User credentials - Register as a new user first";
    }
}

// Show role info on page load
document.addEventListener("DOMContentLoaded", function() {
    const adminRadio = document.querySelector('input[name="role"][value="admin"]');
    const userRadio = document.querySelector('input[name="role"][value="user"]');
    const info = document.getElementById("info");
    
    if (adminRadio) {
        adminRadio.addEventListener("change", function() {
            if (this.checked) {
                let adminData = JSON.parse(localStorage.getItem("admin"));
                if (adminData) {
                    info.innerText = "ℹ️ Admin account already exists - only one person can access";
                } else {
                    info.innerText = "ℹ️ First login will create the admin account (only one allowed)";
                }
            }
        });
    }
    
    if (userRadio) {
        userRadio.addEventListener("change", function() {
            if (this.checked) {
                info.innerText = "ℹ️ Multiple users can access with their own credentials";
            }
        });
    }
    
    // Show initial info for admin (since it's checked by default)
    let adminData = JSON.parse(localStorage.getItem("admin"));
    if (adminData) {
        info.innerText = "ℹ️ Admin account already exists - only one person can access";
    } else {
        info.innerText = "ℹ️ First login will create the admin account (only one allowed)";
    }
});


