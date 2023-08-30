

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
    let currentTime = data[1];
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