var API_KEY="af9615c5a33d02dcff997f71632442e3";
var currentDate = moment().format("M/D/YYYY")

$("button").on("click",function(event) {
    event.preventDefault();
    var cityName=$("#cityNameInput").val();
    if(!cityName) {
        alert("Please enter the name of a city.");
    } else {
        var cityList = $("<li>");
        cityList.addClass("list-group-item")
        cityList.text(cityName);
        cityList.appendTo("ul");
       
        var requestUrl= "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&units=imperial&appid="+API_KEY;

        fetch(requestUrl).then(function(response) {
            if(!response.ok) {
                alert("No information found for "+cityName);
            } 
            return response.json();
            
        }).then(function(data) {
            console.log(data);

                var latitude=data[0].lat;
                var longitude=data[0].lon;
                var forecastRequestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&units=imperial&appid="+API_KEY

                fetch(forecastRequestUrl).then(function(response){
                    if(!response.ok) {
                        alert("No forecast found for "+cityName);
                    }
                    return response.json()
                }).then(function(data){
                    console.log(data);

                    var dailyTemp = data.daily[0].temp.day
                    var dailyHumid = data.daily[0].humidity
                    var dailyWind = data.daily[0].wind_speed
                    var dailyIndex = data.daily[0].uvi
                    var weatherIcon = data.daily[0].weather[0].icon
                    var iconUrl = "http://openweathermap.org/img/w/"+weatherIcon+".png";
                    var iconImage = $("<img>");
                    iconImage.attr("src",iconUrl)
                    
                    $("#cityHolder").text(cityName+" ("+currentDate+")")
                    $("#tempHolder").text("Temperature: "+dailyTemp+"°F")
                    $("#humHolder").text("Humidity: "+dailyHumid+"%")
                    $("#windHolder").text("Wind Speed: "+dailyWind+"MPH")
                    $("#uvHolder").text("UV Index: "+dailyIndex)

                    for(var i=3;i<data.daily.length;i++) {
                        var dailyCast=data.daily[i];

                        var castDiv=$("<div>");
                        castDiv.addClass("forecastCard");

                        listDay=$("<div>")
                        listDay.text(moment().add(i,"days").format("M/D/YYYY"))
                        listDay.appendTo(castDiv)

                         listIcon=$("<img>")
                         listIcon.attr("src",dailyCast.weather[0].icon)
                         listIcon.appendTo(castDiv)

                        listTemp=$("<div>")
                        listTemp.text("Temp: "+dailyCast.temp.day+"°F")
                        listTemp.appendTo(castDiv)

                        listHumid=$("<div>")
                        listHumid.text("Humidity: "+dailyCast.humidity+"%")
                        listHumid.appendTo(castDiv)

                        castDiv.appendTo(".forecast")
                       
                       
                    
                }})
        })

    }

})

