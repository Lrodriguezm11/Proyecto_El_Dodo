document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const username = payload.nombre_usuario;
        document.getElementById('welcomeMessage').textContent = `¡Bienvenido, ${username}!`;
    } else {
        window.location.href = 'index.html';
    }

    const urlParams = new URLSearchParams(window.location.search);
    const selectedRoom = urlParams.get('room');
    const selectedPackage = urlParams.get('package');

    const formSteps = document.querySelectorAll('.form-step');
    const progressBar = document.querySelectorAll('.progress');
    const steps = document.querySelectorAll('.step');
    let currentStep = 0;

    let reservationSummary = {
        room: null,
        package: null,
        checkinDate: null,
        checkoutDate: null,
        extras: []
    };

    // Mostrar la habitación o paquete seleccionado en el primer paso
    if (selectedRoom) {
        reservationSummary.room = selectedRoom;
        const roomDisplay = document.getElementById('selectedRoomDisplay');
        roomDisplay.textContent = `Has seleccionado la habitación: ${selectedRoom.charAt(0).toUpperCase() + selectedRoom.slice(1)}`;
    } else if (selectedPackage) {
        reservationSummary.package = selectedPackage;
        const packageDisplay = document.getElementById('selectedRoomDisplay');
        packageDisplay.textContent = `Has seleccionado el paquete: ${selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)}`;
    }

    function goToStep(stepIndex) {
        formSteps[currentStep].classList.remove('active');
        currentStep = stepIndex;
        formSteps[currentStep].classList.add('active');
        if (stepIndex > 0) {
            progressBar[stepIndex - 1].style.backgroundColor = '#333';
            steps[stepIndex].classList.add('completed');
        }
        if (stepIndex === 3) { // Cuando llegues al paso 4 (Confirmar y Pagar)
            showSummary();
        }
    }

    const nextBtns = document.querySelectorAll('.next-btn');
    nextBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (currentStep === 1) { // Validar las fechas en el paso de selección de fechas
                const checkinDate = document.getElementById('checkinDate').value;
                const checkoutDate = document.getElementById('checkoutDate').value;
                if (!checkinDate || !checkoutDate) {
                    alert('Por favor, selecciona las fechas de entrada y salida.');
                    return; // No avanzar si no se han seleccionado las fechas
                }
                reservationSummary.checkinDate = checkinDate;
                reservationSummary.checkoutDate = checkoutDate;
            }
            if (currentStep === 2) { // Capturar los servicios extras seleccionados
                reservationSummary.extras = Array.from(document.querySelectorAll('input[name="extras"]:checked')).map(input => input.value);
            }
            goToStep(currentStep + 1);
        });
    });

    // Habilitar la navegación entre pasos haciendo clic en los círculos
    steps.forEach((step, index) => {
        step.addEventListener('click', () => {
            if (index <= currentStep) { // Permitir solo ir a pasos ya completados o al actual
                goToStep(index);
            }
        });
    });

    function showSummary() {
        const summaryContainer = document.getElementById('summaryContainer');
        summaryContainer.innerHTML = `
            <p>Habitación: ${reservationSummary.room ? reservationSummary.room.charAt(0).toUpperCase() + reservationSummary.room.slice(1) : 'Ninguna seleccionada'}</p>
            <p>Paquete: ${reservationSummary.package ? reservationSummary.package.charAt(0).toUpperCase() + reservationSummary.package.slice(1) : 'Ninguno seleccionado'}</p>
            <p>Fecha de Entrada: ${reservationSummary.checkinDate}</p>
            <p>Fecha de Salida: ${reservationSummary.checkoutDate}</p>
            <p>Servicios Extras: ${reservationSummary.extras.length > 0 ? reservationSummary.extras.join(', ') : 'Ninguno seleccionado'}</p>
        `;
    }

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
