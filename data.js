import { timeOfDay } from "./general.js";

export const data = {
    loc: ["Tokyo"],
    curTime: ["00:00"],
    curTemp: [],
    feelsLike: [],
    condition: [],
    render: async() =>{
        const template = document.getElementById("current-data-template")
        let dupeTemplate = template.content.cloneNode(true);
        dupeTemplate.querySelector(".location-div").textContent = data.loc;
        dupeTemplate.getElementById("current-temp").textContent = data.curTemp[0]
        dupeTemplate.getElementById("feels-like").textContent = data.feelsLike[0];
        data.celsiusOrFahrenheit(dupeTemplate);
        dupeTemplate.querySelector(".cur-cond-text").textContent = data.condition[0];
        dupeTemplate.querySelector("img").src = data.condition[1];
        dupeTemplate.querySelector("img").alt = data.condition[0];
        const currentDataDiv = document.querySelector(".current-data")
        currentDataDiv.appendChild(dupeTemplate)
    },
    assignData: async(d) =>{
        data.loc = d.location.name;
        data.curTime = d.location.localtime.split(" ")[1]
        data.curTemp = [d.current.temp_c, d.current.temp_f]
        data.feelsLike = [d.current.feelslike_c, d.current.feelslike_f]
        data.condition = [d.current.condition.text, d.current.condition.icon]
        data.render();
    },
    getWeather: async function(loc){
        try{
            let url = `http://api.weatherapi.com/v1/forecast.json?key=72030c4c5ae741b4ace85824232408&q=${loc}&days=7&aqi=no&alerts=no`;
            
            const response = await fetch(url, {
                mode: 'cors'
            });
            const weatherData = await response.json();
            data.assignData(weatherData);
        } catch (err){
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
    }
}