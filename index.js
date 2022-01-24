const apikey = "3d8aa45f7271f6bcb67cba7a6b0896d7";

document.addEventListener("DOMContentLoaded",function(){

    let form = document.getElementById("form");

    form.addEventListener("submit",function(event) {

        event.preventDefault();

        let citta = document.getElementById("nomeCitta").value;
        let stateCode = document.getElementById("stateCode").value;

        caricaDati(citta,stateCode).then( 

            (success) => {

                document.getElementById("umidita").innerHTML = "<i class='fas fa-wind'></i>" + "Vento : " + success.wind.speed + " km/h";
                document.getElementById("pressione").innerHTML = "<i class='far fa-snowflake'></i>" + "Pressione: " + success.main.pressure + " bar";
                document.getElementById("tempMax").innerHTML = "<i class='fas fa-temperature-high'></i>" +  "Temp massima: " + success.main.temp_max + "°";
                document.getElementById("tempMin").innerHTML = "<i class='fas fa-temperature-low'></i>" + "Temp Minima: " + success.main.temp_min + "°";

                let iconUrl = `http://openweathermap.org/img/w/${success.weather[0].icon}.png`;

                let img = `<img src="${iconUrl}"> `;

                document.getElementById("weather3").innerHTML = img;


            }, 
            
            (error) => {

                let card = `
                <p> <strong> ${error.message} </strong> </p>
                
                `

                document.getElementById("boxWeather").innerHTML = "Operazione fallita, si è verificato il seguente errore: " +  card;

            }

         )//fine then


    })// fine funzione submit

    function caricaDati(nomeCitta,stateCode){

        return new Promise( (resolve,reject) => {

            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){

            if(xhr.readyState == 4)
            if(xhr.status == 200){

                resolve(JSON.parse(xhr.responseText))

                console.log(JSON.parse(xhr.responseText))

            } else {

                reject(JSON.parse(xhr.responseText))

            }
            
        }//fine onreadystatechange

        xhr.open('GET',`http://api.openweathermap.org/data/2.5/weather?q=${nomeCitta},${stateCode}&appid=${apikey}&units=metric`)
        xhr.send()

        }) //fine promise
    } 

})//fine funzione domContentLoaded