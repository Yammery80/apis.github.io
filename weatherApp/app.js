const URL_BASE = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '882793d6986734aa444f0c624491e134';
const ButtonSend = document.querySelector('.send');



async function getLocalWeather(lat, lon) {
    const response =await fetch(URL_BASE + `?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    console.log(data);
    //TODO DOM
}

navigator
    .geolocation
    .getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        getLocalWeather(lat, lon);
})

