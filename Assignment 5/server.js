//Node.js server file

//Create instances of fs, express, body-parser, and mysql modules
var fs = require("fs")
var password = fs.readFileSync("./password.txt", "utf8")
var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mysql = require("mysql")
//Populate connection information
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: password,
    database: "hw5"
})

app.use(express.static("."))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//Try to connect to MySQL database
con.connect(function (err) {
    if (err) {
        console.log("Error connecting to database" + err)
    }
    else {
        console.log("Database successfully connected")
    }
})

//Process request for Display a Table page
app.get("/table", function (req,res) {
    //Create and send HTML string for the page
    var page_html = '<h3>Display a Table</h3>' + 
                    '<p>Select a table and click the "Display" button to display the table.</p><br>Table:<br>' +
                    '<select id="table">' +
                        '<option value="student">Student</option>' +
                        '<option value="course">Course</option>' +
                        '<option value="grades">Grades</option>' +
                    '</select><br><br>' +
                    '<input type="button" onclick="getTable()" value="Display"><br><br>' +
                    '<div id="display"></div><br>'
    res.send(page_html)
})

//Process request for Student Transcript Search page
app.get("/transcript", function (req,res) {
    //Retrieve student information from MySQL database
    con.query("SELECT student_id, first_name, last_name FROM student ORDER BY student_id;", function (err,rows,fields) {
        if (err) {
            console.log("Error during query processing")
            res.send("<p>Error during query processing</p>")
        }
        else {
            //Create and send HTML string for the page
            var page_html = '<h3>Student Transcript Search</h3>' +
                            '<p>Select a student and a term/year, then click the "Search" button to display his or her transcript.</p><br>Student:<br>' +
                            '<select id="student">'

            //Iterate through rows to populate student dropdown
            for (i=0; i<rows.length; i++) {
                page_html += '<option value="' + rows[i].student_id + '">' + rows[i].first_name + ' ' + rows[i].last_name + '</option>'
            }

            page_html += '</select><br><br>'

            con.query("SELECT DISTINCT(term_year) FROM grades;", function (err,rows,fields) {
                if (err) {
                    console.log("Error during query processing")
                    res.send("<p>Error during query processing</p>")
                }
                else {
                    //Create another dropdown for term/year
                    page_html += 'Term/Year:<br><select id="term">'

                    //Iterate through rows to populate term/year dropdown
                    for (i=0; i<rows.length; i++) {
                        page_html += '<option value="' + rows[i].term_year + '">' + rows[i].term_year + '</option>'
                    }

                    page_html += '</select><br><br>' +
                                 '<input type="button" onclick="getTranscript()" value="Search"><br><br>' +
                                 '<div id="display"></div><br>'
        
                    res.send(page_html)
                }
            })
        }           
    })
})

//Process request for Add Student page
app.get("/student", function (req,res) {
    var page_html = '<h3>Add Student</h3>' +
                    '<p>Input the first name, last name, date of birth, and major of study of a student into the text fields below, then click the "Add" button to add him or her to the database.</p><br>' +
                    '<form id="student_form">' +
                        'First Name:<br>' +
                        '<input type="text" id="first_name"><br><br>' +
                        'Last Name:<br>' +
                        '<input type="text" id="last_name"><br><br>' +
                        'Date of Birth (YYYY-MM-DD):<br>' +
                        '<input type="date" id="date_of_birth"><br><br>' +
                        'Major of Study:<br>' +
                        '<input type="text" id="major_of_study"><br><br>' +
                    '</form>' +
                    '<input type="button" onclick="addStudent()" value="Add"><br><br>' +
                    '<div id="display"></div><br>'
    
    res.send(page_html)
})

//Process request for table
app.get('/getTable', function (req,res) {
	//Retrieve table user requested
    var table = req.query.table
    
	con.query("SELECT * FROM hw5." + table, function(err,rows,fields) {
		if (err) {
			console.log("Error during query processing")
			res.send("Error during query processing")
		}
		else{
			//Create HTML string for displaying table
			var table_html = '<table><tr>'
            
            //Iterate through fields and populate columns for later
            var columns = []
            
			for (i=0; i<fields.length; i++) {
				columns.push(fields[i].name)
				table_html += '<th>' + fields[i].name + '</th>'
            }
            
			table_html += '</tr>'

            //Iterate through nested for loops to populate table
			for (j=0; j<rows.length; j++) {
                table_html += '<tr>'
                
				for (k=0; k<fields.length; k++) {
					table_html += '<td>' + rows[j][columns[k]] + '</td>'
                }
                
				table_html += '</tr>'
			}
			table_html += '</table>'
			
			res.send(table_html)
		}
	});
});

//Process request for student transcript
app.get("/getTranscript", function (req,res) {
	//Retrieve student and term user requested
	var student = req.query.student;
	var term = req.query.term;
	
    con.query("SELECT student.student_id, first_name, last_name, term_year, course.course_id, course_description, grade FROM course, grades, student WHERE student.student_id = grades.student_id AND course.course_id = grades.course_id AND student.student_id = " + student + ' AND term_year = "' + term + '";',
        function(err,rows,fields){
		if(err){
			console.log('Error during query processing');
			res.send('Error during query processing');
		}
		else{
			//Create HTML string for displaying transcript
			transcript_html = '<table><tr><th>Student ID</th><th>First Name</th><th>Last Name</th><th>Term/Year</th><th>Course ID</th><th>Description</th><th>Grade</th>';
            
            //Iterate through fields and populate columns for later
            var columns = []

            for (i=0; i<fields.length; i++) {
                columns.push(fields[i].name)
            }

            transcript_html += '</tr>'
            
			//Iterate through nested for loops to populate transcript
			for (j=0; j<rows.length; j++) {
                transcript_html += '<tr>'
                
				for (k=0; k<fields.length; k++) {
					transcript_html += '<td>' + rows[j][columns[k]] + '</td>'
                }
                
				transcript_html += '</tr>'
            }
            
			transcript_html += '</table>'
		
			res.send(transcript_html);
		}
	});
});

//Process request to add student
app.post("/addStudent", function (req,res) {
	//Retrieve information for student to be added and use escape characters to prevent SQL injections
	var first_name = con.escape(req.body.first_name);
	var last_name = con.escape(req.body.last_name);
	var date_of_birth = con.escape(req.body.date_of_birth);
	var major_of_study = con.escape(req.body.major_of_study);
	
    con.query("SELECT first_name, last_name, date_of_birth, major_of_study FROM student WHERE first_name = " + first_name + " AND last_name = " + last_name + " AND date_of_birth = " + date_of_birth + ";", 
        function(err,rows,fields){
		if(err){
			console.log('Error during query processing');
			res.send("Error during query processing");
        }
        
        //Check if student already exists in database
		else if (rows.length > 0) {
			res.send("Student already exists");
        }
        
        //Add student if he/she does not exist in database
		else{
            con.query("INSERT INTO student(first_name, last_name, date_of_birth, major_of_study) VALUES (" + first_name + "," + last_name + "," + date_of_birth + "," + major_of_study + ");",
                function(err,rows,fields){
				if(err){
					console.log('Error during query processing');
					res.send("Error during query processing");
				}
				else{
					res.send("Student successfully added");
				}
			});
		}
	});
});

//Redirect to main html page
app.get('/home', function (req,res) {
    res.redirect("./sk3665_HW5.html")
})

//Server listen to port 8080
app.listen(8080, function() {
    console.log("Server started...")
})