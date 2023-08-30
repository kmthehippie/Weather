import { makeInputPretty } from "./general.js";

import { data } from "/data.js"

const app = {
    render: ()=>{
        makeInputPretty();
        data.getWeather(data.loc);
        document.getElementById("input-btn").addEventListener("click", app.getLocation);
    },
    getLocation: (e) => {
        e.preventDefault();
        let input = document.querySelector(".input-field");
        data.loc = input.value;       
        app.clearPage();
        data.getWeather(data.loc);
    },
    clearPage: ()=>{
        const bodyDiv = document.querySelector(".body");
        bodyDiv.remove();
        app.spawnBodyDiv()
    },
    spawnBodyDiv: () => {
        const body = document.querySelector("body")
        let bodyDiv = document.createElement("div");
        bodyDiv.classList.add("body");
        
        const template = document.getElementById("body-template");
        console.log(template);
        let div = template.content.cloneNode(true);
        bodyDiv.appendChild(div)
        
        body.appendChild(bodyDiv);
        // Add this to give the functions back to inputs
        makeInputPretty();
        document.getElementById("input-btn").addEventListener("click", app.getLocation);
    } 
}

app.render();