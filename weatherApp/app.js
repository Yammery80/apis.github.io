const URL_BASE = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '882793d6986734aa444f0c624491e134';
const ButtonSend = document.querySelector('.send');
const CityInput = document.querySelector('.City');
const WeatherInfo = document.createElement('div'); // Contenedor dinámico para mostrar el clima
WeatherInfo.classList.add('weather-info');
const backgroundLayer = document.querySelector('.background-layer');

// Agregar el contenedor de resultados dinámicamente debajo del formulario
document.querySelector('.container').appendChild(WeatherInfo);

// Función para obtener y mostrar el clima
async function getWeather(query) {
    try {
        const response = await fetch(`${URL_BASE}?${query}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if (data.cod !== 200) {
            alert(`Error: ${data.message}`);
            return;
        }

        updateDOM(data);
    } catch (error) {
        console.error('Error al obtener el clima:', error);
    }
}

// Función para mostrar los datos en el DOM
function updateDOM(data) {
    const { main, coord, weather } = data;
    const temperature = main.temp;
    const condition = weather[0].main;

    // Actualizar contenido del contenedor de clima
    WeatherInfo.innerHTML = `
        <h2>Clima en ${data.name}</h2>
        <p><strong>Temperatura:</strong> ${temperature}°C</p>
        <p><strong>Latitud:</strong> ${coord.lat}</p>
        <p><strong>Longitud:</strong> ${coord.lon}</p>
        <p><strong>Condición:</strong> ${condition}</p>
    `;

    // Cambiar fondo según temperatura y condición
    setBackgroundGifWithBlur(temperature, condition);
}

// Función para cambiar fondo a un GIF con desenfoque
function setBackgroundGifWithBlur(temp, condition) {
    let gifUrl = ''; // URL del GIF

    if (temp > 30) {
        gifUrl = 'https://usagif.com/wp-content/uploads/gifs/fire-59.gif'; // GIF para calor
    } else if (temp >= 20 && temp <= 30) {
        gifUrl = 'https://i.pinimg.com/originals/60/d8/44/60d844679e07db517c19fdc5dd7af089.gif'; // GIF para templado
    } else if (temp >= 10 && temp < 20) {
        gifUrl = 'https://img95.lovepik.com/photo/40111/1953.gif_wh860.gif'; // GIF para frío
    } else {
        gifUrl = 'https://i.gifer.com/RtyO.gif'; // GIF para muy frío
    }

    if (condition.toLowerCase().includes('rain')) {
        gifUrl = 'https://i.pinimg.com/originals/a6/95/06/a69506831a59f98dbfc85de76aa989ba.gif'; // GIF para lluvia
    } else if (condition.toLowerCase().includes('wind')) {
        gifUrl = 'https://i.pinimg.com/originals/e8/db/1c/e8db1c6be958b59b1b78f95c93cd0a95.gif'; // GIF para viento
    }

    const gifImage = new Image();
    gifImage.onload = () => {
        backgroundLayer.style.backgroundImage = `url(${gifUrl})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center';
    };

    gifImage.onerror = () => {
        console.error('Error cargando el GIF:', gifUrl);
        document.body.style.backgroundColor = '#000'; // Fondo de respaldo
    };

    gifImage.src = gifUrl; // Forzar la carga del GIF
}

// Obtener ubicación actual
navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    getWeather(`lat=${lat}&lon=${lon}`);
});

// Evento para buscar clima por ciudad
ButtonSend.addEventListener('click', (e) => {
    e.preventDefault(); // Evita el envío del formulario
    const city = CityInput.value.trim();

    if (city) {
        getWeather(`q=${city}`);
    } else {
        alert('Por favor, ingrese una ciudad válida.');
    }
});
