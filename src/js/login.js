(() => {
    document.onkeydown = (e) => {
        if (e.keyCode == 13) {
            login();
        }
    }
    document.getElementById('login-button').addEventListener("click", () => {
        login()
    });
    const login = () => {
        document.cookie = `h_cookie_auth=${md5(document.getElementById("username").value)}:${md5(document.getElementById("password").value)};path=/hpp/admin;Max-Age=86400`; window.location.href = '/hpp/admin/login';
        window.location.href = '/hpp/admin/dash/home';
    }
})()