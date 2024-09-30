document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const username = payload.nombre_usuario;
        document.getElementById('welcomeMessage').textContent = `¡Bienvenido, ${username}!`;
    } else {
        window.location.href = 'index.html';
    }

    const reservePackageButtons = document.querySelectorAll('.reserve-package-btn');
    reservePackageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const packageType = button.getAttribute('data-package');
            // Redirigir a la página de reservas con el paquete seleccionado
            window.location.href = `reservas.html?package=${packageType}`;
        });
    });

    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });

    document.getElementById("arrow").addEventListener("click", function() {
        const userMenu = document.querySelector(".user-menu");
        userMenu.classList.toggle("show");
    });
});
