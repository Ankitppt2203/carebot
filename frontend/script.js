// ================= SPLASH SCREEN =================
window.onload = function () {
    const splash = document.getElementById("splash");
    const mainContent = document.getElementById("main-content");

    if (splash && mainContent) {
        setTimeout(function () {
            splash.style.opacity = "0";
            setTimeout(function () {
                splash.style.display = "none";
                mainContent.style.display = "block";
            }, 800);
        }, 2200);
    }
};


// ================= LOGIN FUNCTIONALITY =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                window.location.href = "dashboard.html";
            } else {
                message.innerText = data.message;
            }

        } catch (error) {
            message.innerText = "Server error. Please try again.";
        }
    });
}


// ================= REGISTER FUNCTIONALITY =================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const firstName = document.getElementById("firstName").value;
        const surname = document.getElementById("surname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("message");

        if (password !== confirmPassword) {
            message.innerText = "Passwords do not match ❌";
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: firstName + " " + surname,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                message.style.color = "green";
                message.innerText = "Registration successful ✅ Redirecting...";

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1500);
            } else {
                message.innerText = data.message;
            }

        } catch (error) {
            message.innerText = "Server error. Please try again.";
        }
    });
}