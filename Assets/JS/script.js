//global variables
var API_KEY="af9615c5a33d02dcff997f71632442e3";
var currentDate = moment().format("M/D/YYYY")

//click event that grabs user input and creates a list of user search history.
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
        $("#forecast").empty()
        
       //request url to open weather api with the concatenated city inputted by the user.
        var requestUrl= "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&units=imperial&appid="+API_KEY;
       
        //fetches information from the weather api. If there iis a response, then the data will be available in the console.
        fetch(requestUrl).then(function(response) {
            if(!response.ok) {
                alert("No information found for "+cityName);
            } 
            return response.json();
            
        }).then(function(data) {
            console.log(data);
                
            //request url that uses the latitude and longitude to retrieve a 7-day forecast
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
                
                    //variables that use the info from the object to then place the information in the current weather column.
                    var dailyTemp = data.daily[0].temp.day
                    var dailyHumid = data.daily[0].humidity
                    var dailyWind = data.daily[0].wind_speed
                    var dailyIndex = data.daily[0].uvi
                    var weatherIcon = data.daily[0].weather[0].icon
                    var iconImage = $("<img>");
                    iconImage.attr("src","http://openweathermap.org/img/w/"+weatherIcon+".png")
                    
                    
                    $("#cityHolder").text(cityName+" ("+currentDate+")")
                    iconImage.appendTo("#cityHolder")
                    $("#tempHolder").text("Temperature: "+dailyTemp+"°F")
                    $("#humHolder").text("Humidity: "+dailyHumid+"%")
                    $("#windHolder").text("Wind Speed: "+dailyWind+"MPH")
                    $("#uvHolder").text("UV Index: "+dailyIndex)
                    
                   
                    //formula to loop through the array to grab the necessary information to create a 5-day forecast and then append it to the forecast column
                    for(var i=1;i<6;i++) {
                        var dailyCast=data.daily[i];
                       
                        var castDiv=$("<div>");
                        castDiv.addClass("forecastCard");

                        listDay=$("<div>")
                        listDay.text(moment().add(i,"days").format("M/D/YYYY"))
                        listDay.appendTo(castDiv)

                         listIcon=$("<img>")
                         listIcon.attr("src","http://openweathermap.org/img/w/"+dailyCast.weather[0].icon+".png")
                         listIcon.appendTo(castDiv)

                        listTemp=$("<div>")
                        listTemp.text("Temp: "+dailyCast.temp.day+"°F")
                        listTemp.appendTo(castDiv)

                        listHumid=$("<div>")
                        listHumid.text("Humidity: "+dailyCast.humidity+"%")
                        listHumid.appendTo(castDiv)
                         
                        castDiv.appendTo("#forecast")
                }})})}})

