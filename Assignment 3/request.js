//External Javascript file

//Function for retrieving factorial or summation
function request() {
    //Use JQuery to retrieve user inputted seed and calculation
    var seed = $("#seed").val()
    var calculation = $("#calculation option:selected").text()

    //Contruct URL
    var URL = "http://localhost:8080/"

    //Append calculation to URL
    if (calculation == "Summation") {
        URL += "sum"
    }

    else {
        URL += "fact"
    }

    //JQuery AJAX request
    $.ajax({
        type: "GET",
        url: URL,
        data: {
            "n": seed
        },
        dataType: "html",
        //Output result on success
        success: function(msg) {
            $("#result").html(msg)
        },
        //Output error otherwise
        error: function(xhr, textStatus, errorThrown) {
            $("#result").html("<br>Error")
        }
    })
}