document.addEventListener('DOMContentLoaded', () => {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    if (token) {
        // Decodificar el token para extraer el nombre de usuario
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del token
        const username = payload.nombre_usuario;

        // Mostrar el mensaje de bienvenida
        const welcomeMessageDiv = document.getElementById('welcomeMessage');
        welcomeMessageDiv.textContent = `¡Bienvenido, ${username}!`;
    } else {
        // Redirigir a la página de inicio de sesión si no hay token
        window.location.href = 'index.html';
    }

    // Funcionalidad del botón de cerrar sesión
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', () => {
        // Eliminar el token del localStorage
        localStorage.removeItem('token');

        // Redirigir al inicio de sesión
        window.location.href = 'index.html';
    });

    // Toggle del menú desplegable cuando se hace clic en la flechita
    document.getElementById("arrow").addEventListener("click", function() {
        const userMenu = document.querySelector(".user-menu");
        userMenu.classList.toggle("show");
    });
});
