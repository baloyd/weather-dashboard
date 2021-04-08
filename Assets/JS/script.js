var API_KEY="af9615c5a33d02dcff997f71632442e3";


$("button").on("click",function(event) {
    event.preventDefault();
    var cityName=$("#cityNameInput").val();
    if(!cityName) {
        alert("Please enter the name of a city.");
    } else {
        document.getElementById("cityNameInput").innerText=cityName;

       
        var requestUrl= "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&appid="+API_KEY;

        fetch(requestUrl).then(function(response) {
            if(!response.ok) {
                alert("No information found for "+cityName);
            } 
            return response.json();
            
        }).then(function(data) {
            console.log(data);

                var latitude=data[0].lat;
                var longitude=data[0].lon;
                var forecastRequestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&appid="+API_KEY

                fetch(forecastRequestUrl).then(function(response){
                    if(!response.ok) {
                        alert("No forecast found for "+cityName);
                    }
                    return response.json()
                }).then(function(data){
                    console.log(data);

                    var dailyTemp = data.daily[0].temp.day
                    
                })
        })

    }

})

