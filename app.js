let currecity = 'goa';
let unit = 'metric'

let city = document.querySelector('.weather_city');
let datetime  = document.querySelector('.weather_date-time');
let forecast =document.querySelector('.weather_forecast');
let temp = document.querySelector('.weather_temp');
let icon = document.querySelector('.weather_icon');
let minmax = document.querySelector('.weather_minmax');
let realfeel = document.querySelector('.weather_realfeel');
let humidity = document.querySelector('.weather_humidity');
let wind = document.querySelector('.weather_wind');
let pressure = document.querySelector('.weather_pressure');

document.querySelector('.weather_search').addEventListener('submit', e => { let search = document.querySelector('.weather_searchform');
e.preventDefault();
currecity = search.value;
getweather(); 
search.value=''
})

document.querySelector('.weather_unit_c').addEventListener('click', () => {
    if(unit !== 'mertic'){
        unit = 'metric'
        getweather()
    }
} )
document.querySelector('.weather_unit_f').addEventListener('click', () => {
    if(unit !== 'imperial'){
        unit = 'imperial'
        getweather()
    }
} )

function convert_timestamp(timestamp, timezone){
    const convertTimezone  = timezone / 3600;
    const date  = new Date(timestamp*1000);
    const options = {
        weekday:'long',
        day:'numeric',
        month:'long',
        year:'numeric',
        hour:'numeric',
        minute:'numeric',
        timezone:`Etc/GMT${convertTimezone >=0?'-':'+'}${Math.abs(convertTimezone)}`,
        hour12:true,
    }
    return date.toLocaleString("en-US",options)
}

function convert_code(country){
    let region_names = new Intl.DisplayNames(['en'], {type:"region"});
    return region_names.of(country)
}

function getweather(){
    const api_key = '4949b61d98875a86fe9f6e16d16b09b3' 

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currecity}&appid=${api_key}&units=${unit}`)
    .then(res => res.json())
    .then(data => {
        city.innerHTML=`${data.name}, ${convert_code(data.sys.country)}`
        datetime.innerHTML= convert_timestamp(data.dt, data.timezone);
        forecast.innerHTML = `<p>${data.weather[0].main}`
        temp.innerHTML=`${data.main.temp.toFixed()}&#176` 
        icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">`
        minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p>
        <p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
        realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
        humidity.innerHTML = `${data.main.humidity}%`
        wind.innerHTML = `${data.wind.speed}${unit ==='imperial'? 'mph':'mps'}`
        pressure.innerHTML = `${data.main.pressure}hPa` 
})
}
document.body.addEventListener('load', getweather())