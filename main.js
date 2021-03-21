 
let city = 'Helsinki'

function setFehrenheit(temp,feels){
    document.querySelector('#temparature p').innerText = `${temp}°`
    document.querySelectorAll('.symbol')[1].classList.add('active')
    document.querySelectorAll('.symbol')[0].classList.remove('active')
    document.querySelector('#temparature h3').innerText = `Feels likes ${feels}°F`
}

function setCelsius(temp,feels){
    document.querySelector('#temparature p').innerText = `${temp}°`
    document.querySelectorAll('.symbol')[0].classList.add('active')
    document.querySelectorAll('.symbol')[1].classList.remove('active')
    document.querySelector('#temparature h3').innerText = `Feels likes ${feels}°C`
}
function onchangee (e){
    city = e.target.value
    excecuteScript()
    }

    let userInput = document.createElement("INPUT");
    userInput.setAttribute("type", "text");
    userInput.setAttribute('placeholder', 'Type city')
    userInput.addEventListener("keyup", onchangee)    
    document.getElementById('input').appendChild(userInput)
    
        
    

        async function excecuteScript (){
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d05a452a95d2aa8b42bdfafe1642c31b`
            let data = await (await fetch(url)).json()
            console.log(data)
            if(data.cod == 400 || data.cod == 404) return
            const {main, description,icon} = data.weather[0]
            const {temp, feels_like} =  data.main
            const {country} = data.sys
            const windspeed = data.wind.speed
            const tempCelsius = Math.floor(temp - 273.15) 
            const tempFehrenheit =  Math.floor((temp - 273.15)*9/5 + 32) 
            const feelsCelsius = Math.floor(feels_like - 273.15) 
            const feelsFehrenheit =  Math.floor((feels_like - 273.15)*9/5 + 32) 
    
            const iconUrl = `http://openweathermap.org/img/w/${icon}.png`
    
            document.getElementById('container').innerHTML = `
                <div id = 'city'> 
                    <p>${country}, ${city}</p>
                </div>
                <div id ="temparature">
                    <div> 
                        <img src= "http://openweathermap.org/img/w/${icon}.png" alt="weather icon">
                        <h2> ${description} </h2>
                    </div>
                    <div> 
                        <p>${tempCelsius}° </p> 
                        <span class = 'symbol active' onClick = setCelsius(${tempCelsius},${feelsCelsius})>°C</span> 
                        | 
                        <span class = 'symbol'  onClick = setFehrenheit(${tempFehrenheit},${feelsFehrenheit})>°F</span> 
                        <h3> Feels likes ${feelsCelsius}°C</h3>
                        <p> Wind: ${windspeed}km/hr </p>
                    </div>
                </div>
            `
        }
    excecuteScript()

window.onload = function() { 
    excecuteScript ()
}
