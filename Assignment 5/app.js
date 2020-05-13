//External Javascript file

//Function for retrieving and displaying Display a Table page
function displayATablePage() {
    //JQuery AJAX request
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/table",
        data: "{}",
        dataType: "html",
        success: function(msg) {
            $("#main").html(msg);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            $("#main").html("Error retrieving and displaying page.")
        }
    })
}

//Function for retrieving and displaying Student Transcript Search page
function studentTranscriptSearchPage() {
    //JQuery AJAX request
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/transcript",
        data: "{}",
        dataType: "html",
        success: function(msg) {
            $("#main").html(msg);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            $("#main").html("Error retrieving and displaying page.")
        }
    })
}

//Function for retrieving and displaying Add Student page
function addStudentPage() {
    //JQuery AJAX request
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/student",
        data: "{}",
        dataType: "html",
        success: function(msg) {
            $("#main").html(msg);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            $("#main").html("Error retrieving and displaying page.")
        }
    })
}

//Function for retrieving and displaying user selected table
function getTable() {
    var table = $("#table").get(0)
    var selected_table = table.options[table.selectedIndex].value

    //JQuery AJAX request
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/getTable",
        data: {"table": selected_table},
        dataType: "html",
        success: function(msg) {
            $("#display").html(msg);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            $("#display").html("Error retrieving and displaying table.")
        }
    })
}

//Function for retrieving and displaying user selected transcript
function getTranscript() {
    var student = $("#student").get(0)
    var selected_student = student.options[student.selectedIndex].value
    var term = $("#term").get(0)
    var selected_term = term.options[term.selectedIndex].value

    //JQuery AJAX request
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/getTranscript",
        data: {
            "student": selected_student,
            "term": selected_term
        },
        dataType: "html",
        success: function(msg) {
            $("#display").html(msg);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            $("#display").html("Error retrieving and displaying transcript.")
        }
    })
}

//Function for adding student to MySQL database
function addStudent() {
    var first_name = $("#first_name").val()
    var last_name = $("#last_name").val()
    var date_of_birth = $("#date_of_birth").val()
    var major_of_study = $("#major_of_study").val()

    //JQuery AJAX request
    $.ajax({
		type: "POST",
		url: "http://localhost:8080/addStudent",
		data: {
            "first_name": first_name,
            "last_name": last_name,
            "date_of_birth": date_of_birth,
            "major_of_study": major_of_study
        },
		success: function(msg){
			$('#display').html(msg);
		},
		error: function(xhr, ajaxOptions, thrownError){
			$("#display").html("Error adding student.")
		}
	});
}