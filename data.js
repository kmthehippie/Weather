import { makeInputPretty, changeData, humidType, rainType, timeOfDay, windType } from "./general.js";

export const data = {
    loc: ["Kuala Lumpur"],
    country: [],
    curTime: ["00:00"],
    curTemp: [],
    feelsLike: [],
    condition: [],
    wind: [],
    rain: [],
    humidity: [],
    renderCD: async() =>{
        const template = document.getElementById("current-data-template")
        let dupeTemplate = template.content.cloneNode(true);
        dupeTemplate.querySelector(".last-updated-time-div").textContent = data.curTime;
        data.renderBG(timeOfDay(data.curTime));
        dupeTemplate.querySelector(".country-div").textContent = data.country;
        dupeTemplate.querySelector(".location-div").textContent = data.loc;
        dupeTemplate.getElementById("current-temp").textContent = data.curTemp[0]
        dupeTemplate.getElementById("feels-like").textContent = data.feelsLike[0];
        data.celsiusOrFahrenheit(dupeTemplate);
        dupeTemplate.querySelector(".cur-cond-text").textContent = data.condition[0];
        dupeTemplate.querySelector("img").src = data.condition[1];
        dupeTemplate.querySelector("img").alt = data.condition[0];
        const currentDataDiv = document.querySelector(".current-data");
        currentDataDiv.appendChild(dupeTemplate);
        data.renderAD();
    },
    renderAD: async()=>{
        const template = document.getElementById("additional-data-template");
        let dupeTemp = template.content.cloneNode(true);
        
        dupeTemp.querySelector(".windspeed-num").textContent = data.wind[0];makeInputPretty();
        dupeTemp.querySelector(".windspeed-text").textContent = windType(data.wind);
        dupeTemp.querySelector(".precipitation-num").textContent = data.rain[0];
        dupeTemp.querySelector(".precipitation-text").textContent = rainType(data.rain);
        dupeTemp.querySelector(".humidity-num").textContent = data.humidity;

        const additionalDataDiv = document.querySelector(".additional-data");
        additionalDataDiv.appendChild(dupeTemp)
        changeData()
    },
    assignData: async(d) =>{
        data.loc = d.location.name;
        data.country = d.location.country;
        data.curTime = d.location.localtime.split(" ")[1];
        data.curTemp = [d.current.temp_c, d.current.temp_f]
        data.feelsLike = [d.current.feelslike_c, d.current.feelslike_f];
        data.condition = [d.current.condition.text, d.current.condition.icon];
        data.wind = [d.current.wind_kph+" kph", d.current.wind_mph + " mph"];
        data.humidity = d.current.humidity + "%";
        data.rain = [d.current.precip_mm + " mm", d.current.precip_in + " in"]
        data.renderCD();
    },
    getWeather: async function(loc){
        try{
            let url = `http://api.weatherapi.com/v1/forecast.json?key=72030c4c5ae741b4ace85824232408&q=${loc}&days=7&aqi=no&alerts=no`;
            const response = await fetch(url, {
                mode: 'cors'
            });
            const weatherData = await response.json();
            data.assignData(weatherData);
            console.log(weatherData)
        } catch (err){
            console.log("EROORROROROROROR")
            throw Error ("errorrrrrrr");
            
        }
    },
    celsiusOrFahrenheit : function(dupeTemplate){
        const btns = dupeTemplate.querySelectorAll(".CF-btn");
        btns.forEach(btn => {
            btn.addEventListener("click", ()=>{
                let text = btn.previousElementSibling;
                if (btn.textContent.includes("C")){
                    if (text.id === "current-temp"){
                        document.getElementById("current-temp").textContent = data.curTemp[1]
                    } else if (text.id === "feels-like"){
                        document.getElementById("feels-like").textContent = data.feelsLike[1]
                    }
                    btn.innerHTML = `&#176;F`
                } else {
                    if (text.id === "current-temp"){
                        document.getElementById("current-temp").textContent = data.curTemp[0]
                    } else if (text.id === "feels-like"){
                        document.getElementById("feels-like").textContent = data.feelsLike[0]
                    }
                    btn.innerHTML = `&#176;C`
                }
            })
        })
    },
    renderBG: async (t)=>{
        let bgImg = document.querySelector(".body");
        let createImg = document.createElement("img");
        createImg.src = `./images/${t}.jpg`
        bgImg.appendChild(createImg);
    },
}