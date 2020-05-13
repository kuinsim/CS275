//External Javascript file

//Function for computing Fibonacci
function fibonacci() 
{
    //Get string stored in text field
    var number = document.getElementById("number").value;
    //Convert string to an integer
    var num = parseInt(number);

    //Error handling when text cannot be converted to integer
    if (isNaN(num))
    {
        document.getElementById("result").innerHTML = "<br>Invalid Input<br>"
    }

    //Error handling when integer is negative
    else if (num < 0)
    {
        document.getElementById("result").innerHTML = "<br>Cannot compute Fib of a negative integer<br>"
    }

    //Continue otherwise
    else if (num == 0)
    {
        var fib = [0]

        document.getElementById("result").innerHTML = "<br>" + fib[num].toString() + "<br>"

        //Make and display table of result Fibonacci sequence
        fibonacciTable(fib)
    }

    else
    {
        var fib = [0, 1];

        for (var i=2; i<num+1; i++)
        {
            //Calculate Fibonacci and add to sequence
            fib.push(fib[i-2] + fib[i-1])
        }

        //Display result in the (previously) empty div
        document.getElementById("result").innerHTML = "<br>" + fib[num].toString() + "<br>"

        //Make and display table of result Fibonacci sequence
        fibonacciTable(fib)
    }
}

//Function for generating and displaying Fibonacci table
function fibonacciTable(fib_arr)
{
    //Create table headers
    var table_string = '<br><table class="table"><tr><th>n</th><th>fib(n)</th></tr>'

    for (var i=0; i<fib_arr.length; i++)
    {
        //Add rows to table
        table_string += "<tr><td>" + i.toString() + "</td><td>" + fib_arr[i].toString() + "</td></tr>"
    }

    table_string += "</table>"

    //Display table in the (previously) empty div
    document.getElementById("result_table").innerHTML = table_string
}