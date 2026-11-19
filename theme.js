(() => {
    const toggle = document.querySelector(".theme-toggle");
    if (!toggle) {
        console.error("Theme toggle is missing.");
        return;
    }

    function setTheme(dark) {
        document.body.classList.toggle("dark-mode", dark);
        toggle.textContent = dark ? "Light mode" : "Dark mode";
    }

    try {
        setTheme(localStorage.getItem("theme") === "dark");
    } catch (error) {
        console.warn("Could not read the saved theme preference.", error);
    }

    toggle.addEventListener("click", () => {
        const dark = !document.body.classList.contains("dark-mode");
        setTheme(dark);
        try {
            localStorage.setItem("theme", dark ? "dark" : "light");
        } catch (error) {
            console.warn("Could not save the theme preference.", error);
        }
    });

    window.addEventListener("storage", (event) => {
        if (event.key === "theme" || event.key === null) {
            setTheme(event.newValue === "dark");
        }
    });
})();
