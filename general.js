import { data } from "./data.js"

export const makeInputPretty = function() {
    const input = document.querySelector(".input-field");
    input.addEventListener("focus", ()=>{
        input.classList.add("active")
    })
    input.addEventListener("blur", ()=>{
        if (input.value != "") return;
        input.classList.remove("active")
    })
}

export const timeOfDay = (ct)=>{
    let data = ct.split(" ")
    let currentTime = data[0];
    if (currentTime.length <5){
        currentTime = "0" + currentTime
    }

    const startDawn = "05:00:01"
    const endDawn = "08:00:00"

    const startDay = "08:00:01"
    const endDay = "17:00:00"

    const startDusk = "17:00:01"
    const endDusk = "20:00:00"

    const startNight = "20:00:01"
    const endNight = "23:59:59"

    const startMidnight = "00:00:00"
    const endMidnight = "05:00:00"

    if (currentTime >= startDawn && currentTime < endDawn){
        return "dawn"
    } else if (currentTime >= startDay && currentTime < endDay){
        return "day"
    } else if (currentTime >= startDusk && currentTime < endDusk){
        return "dusk"
    } else if (currentTime >= startNight && currentTime < endNight){
        return "night"
    } else if (currentTime >= startMidnight && currentTime < endMidnight){
        return "midnight"
    }
    
}

export const windType = (wind) => {
    let windspeed = wind[0].split(" ")[0]
    if (windspeed < 1){
        return "Calm"
    }else if (windspeed >= 1 && windspeed <= 5){
        return "Light Air"
    }else if (windspeed >= 6 && windspeed <= 11){
        return "Light Breeze"
    }else if (windspeed >= 12 && windspeed <= 19){
        return "Gentle Breeze"
    }else if (windspeed >= 20 && windspeed <= 28){
        return "Moderate Breeze"
    }else if (windspeed >= 29 && windspeed <= 38){
        return "Fresh Breeze"
    }else if (windspeed >= 38 && windspeed <= 49){
        return "Strong Breeze"
    }else if (windspeed >= 50 && windspeed <= 61){
        return "Near Gale"
    }else if (windspeed >= 62 && windspeed <= 5){
        return "Gale"
    }else if (windspeed >= 75 && windspeed <= 88){
        return "Strong Gale"
    }else if (windspeed >= 89 && windspeed <= 102){
        return "Storm"
    }else if (windspeed >= 103 && windspeed <= 117){
        return "Violent Storm"
    }else if (windspeed >= 118){
        return "Hurricane"
    }
}

export const rainType = (rain) =>{
    let precip = rain[0].split(" ")[0]
    if(precip <= 0){
        return "Dry"
    } else if (precip >= 1 && precip <=4){
        return "Light Rain"
    } else if (precip >= 5 && precip <= 6){
        return "Moderate Rain"
    }else if (precip >= 7 && precip <= 15){
        return "Rain"
    }else if (precip >= 15 && precip <= 20){
        return "Heavy Rain"
    }else if (precip >= 20 && precip <= 50){
        return "Strong Rain"
    }else if (precip >= 51){
        return "Violent Rain"
    }
}

export const humidType = (humidity) =>{
    let humid = humidity
    console.log(humid);
}

export const changeData = () => {
    const wind = document.querySelector(".wind")
    let windspeed = document.querySelector(".windspeed-num")
    wind.addEventListener("click", ()=>{
        if(windspeed.textContent.includes("kph")){
            windspeed.textContent = data.wind[1];
        } else if(windspeed.textContent.includes("mph")){
            windspeed.textContent = data.wind[0];
        }
    })
    const rain = document.querySelector(".rain")
    let precip = document.querySelector(".precipitation-num")
    rain.addEventListener("click", ()=>{
        if(precip.textContent.includes("mm")){
            precip.textContent = data.rain[1];
        } else if(precip.textContent.includes("in")){
            precip.textContent = data.rain[0];
        }
    })
}