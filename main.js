import { makeInputPretty, celsiusOrFahrenheit } from "./general.js";

import { data } from "/data.js"

const app = {
    render: ()=>{
        makeInputPretty();
        data.getWeather(data.loc);
        
        document.getElementById("input-btn").addEventListener("click", app.getLocation())

        // // Create Current Data 
        // let template = document.getElementById("current-data-template");
        // let div = template.content.cloneNode(true);
        // const currentD = document.querySelector(".current-data");
        // currentD.appendChild(div)

        // // Change the time as per curTime
        // const cTime = div.querySelector("last-updated-time-div");     
        // cTime.textContent = app.curTime[0];

        
    },
    
    
    
    
    renderBG: (t)=>{
        let bgImg = document.querySelector(".timeofday-image");
        let currentImg = document.querySelector("img");
        if (currentImg !== undefined){
            currentImg.remove();
        }
        let createImg = document.createElement("img");
        createImg.src = `./images/${t}.jpg`
        bgImg.appendChild(createImg);
    },
    getLocation: () => {
        let input = document.querySelector(".input-field")
      
        console.log(input.value);
    }
}

app.render();