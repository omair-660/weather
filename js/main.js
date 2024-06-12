let rowData = document.getElementById("rowData");
let searchInput = document.getElementById("search");
let btnSearch = document.querySelector("button");

let allWeather = [];

async function getCity(city) {
   try {
       let result = await fetch(`https://api.weatherapi.com/v1/current.json?key=2a320066c1af409c8cd213242241006&q=${city}`);
       let finalResult = await result.json();
       allWeather = [finalResult]; // لتحويله إلى مصفوفة لتسهيل الاستخدام في دالة العرض
       console.log(allWeather);
       display();
   } catch (error) {
       rowData.innerHTML = `<div class="alert alert-danger">Failed to fetch ${city}</div>`;
   }
}

getCity("cairo");

function display() {
    let cartona = '';

    for (let i = 0; i < allWeather.length; i++) {
        let weather = allWeather[i];
        cartona += `
            <div class="col-md-3">
            <h3> ${weather.location.name}</h3>
            <div class="item position-relative">
            <p class="temp_c"> ${weather.current.temp_c}°C</p>
            ${weather.current.condition.icon ? `<img src="https:${weather.current.condition.icon}" alt="Weather icon" width="90">` : ''}
            </div>
                <h4>Country: ${weather.location.country}</h4>
                <h4>Region: ${weather.location.region}</h4>
                <p>Latitude: ${weather.location.lat}</p>
                <p>Longitude: ${weather.location.lon}</p>
                <p>Condition: ${weather.current.condition.text}</p>
            </div>
        `;
    }
    rowData.innerHTML = cartona;
}

btnSearch.addEventListener("click", function () {
    let term = searchInput.value;
    getCity(term);
    searchInput.value = null;
});
