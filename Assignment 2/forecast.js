//External Javascript file

//Function for retrieving forecast from Open Weather Map web service
function requestWeather() {
    //Use JQuery to retrieve user's API key and ZIP code 
    var API_key = $('#user_key').val()
    var ZIP_code = $('#user_zip').val()

    //Error handling for empty text inputs
    if (API_key.length == 0 & ZIP_code.length == 0) {
        $('#forecast_container').html("<br>Please enter an API Key and ZIP code.")
    }

    else if (API_key.length == 0) {
        $('#forecast_container').html("<br>Please enter an API Key.")
    }

    else if (ZIP_code.length == 0) {
        $('#forecast_container').html("<br>Please enter a ZIP code.")
    }

    //Continue if user fills in both text inputs
    else {
        //Construct URL with user submitted API key and ZIP code. Change default units to imperial units.
        var URL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + ZIP_code + "&appid=" + API_key + "&units=imperial"

        //JQuery AJAX request
        $.ajax({
            type: "GET",
            url: URL,
            dataType: "jsonp",
            //Create table and parse forecast JSON
            success: function(msg) {
                var data = msg
                var output = '<br>Displaying most recent 5-day/3-hour forecasts for ' + ZIP_code + '.<br><br><table data-role="table" class="ui-responsive"><thead><tr><th>Date and Time</th><th>Weather Description</th><th>Temperature</th></tr></thead><tbody>'

                if (data.cod==200) {
                    for(i=0; i<data.list.length; i++) {
                        output += "<tr><td>" + data.list[i].dt_txt + "</td><td>" + data.list[i].weather[0].description + "</td><td>" + data.list[i].main.temp  + " F</td></tr>"
                    }
                    
                    output += "</tbody></table>"
                    $('#forecast_container').html(output)
                }

                else {
                    $('#forecast_container').html("<br>Error retrieving forecast.")
                }
            },
            //Error message if request is unsuccessful
            error: function(jgXHR, textStatus, errorThrown) {
                $('#forecast_container').html("<br>Error retrieving forecast.")
            }
        })
    }
}