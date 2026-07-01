const theme = document.querySelector(".js-change-color")

changeTheme()

if (theme) {
    theme.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light");

        localStorage.setItem("theme", isLight ? "light" : "dark");

        theme.textContent = isLight ? "Dark Mode" : "Light Mode";
    });
}

function changeTheme() {
    const saved = localStorage.getItem("theme");

    document.body.classList.toggle("light", saved === "light");

    if(theme) 
        theme.textContent = saved === "light" ? "Dark Mode" : "Light Mode";
}